import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useReducer } from "react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
    MoreHorizontal,
    X,
    Calendar as CalendarIcon,
    IndianRupee,
} from "lucide-react";
import LoadingCircle from "../components/loading-circle";
import { useDebounce } from "../hooks/useDebounce";
import { Calendar } from "@/components/ui/calendar";
// import FilterDialogReferral from "./FilterDialogReferral";
import { Badge } from "@/components/ui/badge";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import AdminService from "../services/admin.service";
import ViewDetail from "../features/users/ViewDetailDrawer";

const fetchReferralUsers = async ({
    page,
    pageSize,
    search,
    searchFor,
    sortBy,
    sortDir,
}) => {
    try {
        const response = await AdminService.referralUsers({
            page,
            pageSize,
            search,
            searchFor,
            sortBy,
            sortDir,
        });

        return response.data;
    } catch (error) {
        console.log(error);
    }
};

const reducerFn = (state, action) => {
    switch (action.type) {
        case "nextPage":
            return { ...state, page: state.page + 1 };
        case "previousPage":
            return { ...state, page: state.page - 1 };
        case "defaultPage":
            return { ...state, page: 1 };
        case "search":
            return { ...state, search: action.value };
        case "clearFilter":
            return {
                ...state,
                search: undefined,
            };
        default:
            return state;
    }
};

const initialState = {
    page: 1,
    pageSize: 10,
    search: undefined,
    searchFor: undefined,
    sortBy: undefined,
    sortDir: "asc",
};

export default function User() {
    const [state, dispatch] = useReducer(reducerFn, initialState);
    const debounceSearch = useDebounce(state.search, 500);

    const { data, isLoading } = useQuery({
        queryKey: [
            "pending-referrals",
            debounceSearch,
            state.page,
            state.searchFor,
            state.sortBy,
            state.sortDir,
        ],
        queryFn: () =>
            fetchReferralUsers({
                page: state.page,
                search: debounceSearch,
                searchFor: state.searchFor,
                sortBy: state.sortBy,
                sortDir: state.sortDir,
            }),
    });

    return (
        <>
            <div className="mt-4 overflow-auto grid">
                <div className="bg-cs-background-secondary px-4 py-3 border rounded-t-lg  gap-3 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Referral Records
                        </h3>
                        <Badge variant="outline" className="px-3 py-1">
                            <span className="font-medium">
                                {data?.rows || 0}
                            </span>{" "}
                            records found
                        </Badge>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-[150px] justify-start text-left font-normal"
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {/* {state.fromDate ? (
                                            format(
                                                state.fromDate,
                                                "MMM dd, yyyy"
                                            )
                                        ) : (
                                            <span>From date</span>
                                        )} */}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                >
                                    <Calendar
                                        mode="single"
                                        selected={state.fromDate}
                                        // onSelect={(d) => {
                                        //     dispatch({
                                        //         type: "setFromDate",
                                        //         value: d,
                                        //     });
                                        //     if (
                                        //         state.toDate &&
                                        //         d > state.toDate
                                        //     ) {
                                        //         dispatch({
                                        //             type: "setToDate",
                                        //             value: d,
                                        //         });
                                        //     }
                                        // }}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>

                            <span className="text-gray-500 mx-1">to</span>

                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-[150px] justify-start text-left font-normal"
                                        // disabled={!state.fromDate}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {/* {state.toDate ? (
                                            format(state.toDate, "MMM dd, yyyy")
                                        ) : (
                                            <span>To date</span>
                                        )} */}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                >
                                    <Calendar
                                        mode="single"
                                        selected={state.toDate}
                                        // onSelect={(d) => {
                                        //     dispatch({
                                        //         type: "setToDate",
                                        //         value: d,
                                        //     });
                                        //     if (d < state.fromDate) {
                                        //         dispatch({
                                        //             type: "setFromDate",
                                        //             value: d,
                                        //         });
                                        //     }
                                        // }}
                                        initialFocus
                                        // fromDate={state.fromDate}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="flex gap-2">
                            {/* <FilterDialogReferral
                                state={state}
                                dispatch={dispatch}
                            /> */}

                            <Button
                                variant="ghost"
                                // onClick={() =>
                                //     dispatch({ type: "clearFilter" })
                                // }
                                className="text-destructive hover:text-destructive/80"
                            >
                                <X className="h-4 w-4" />
                                <span className="sr-only">Clear filters</span>
                            </Button>
                        </div>
                    </div>
                </div>
                <Table className="bg-cs-background-secondary rounded-b-md border max-h-[540px] relative">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="pl-4 py-3.5 text-cs-foreground-primary font-base sticky top-0 z-1 bg-cs-background-secondary">
                                Name
                            </TableHead>
                            <TableHead className="py-3.5 text-cs-foreground-primary font-base sticky top-0 z-1 bg-cs-background-secondary">
                                Phone
                            </TableHead>
                            <TableHead className="py-3.5 text-cs-foreground-primary font-base sticky top-0 z-1 bg-cs-background-secondary">
                                Refer
                            </TableHead>
                            <TableHead className="py-3.5 text-cs-foreground-primary font-base sticky top-0 z-1 bg-cs-background-secondary">
                                Earning
                            </TableHead>
                            <TableHead className="py-3.5 text-cs-foreground-primary font-base sticky top-0 z-1 bg-cs-background-secondary">
                                Pending Withdrawal
                            </TableHead>
                            <TableHead className="py-3.5 text-cs-foreground-primary font-base sticky top-0 z-1 bg-cs-background-secondary">
                                Balance
                            </TableHead>
                            <TableHead className="py-3.5 text-cs-foreground-primary font-base sticky top-0 z-1 bg-cs-background-secondary">
                                Pending Balance
                            </TableHead>
                            <TableHead className="text-right pr-4 py-3.5 text-cs-foreground-primary  font-base sticky top-0 z-1 bg-cs-background-secondary">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={9} className="w-full h-48">
                                    <div className="flex justify-center">
                                        <LoadingCircle />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.referralUsers?.map((user) => (
                                <TableRow key={user._id}>
                                    <TableCell className="pl-4 text-cs-foreground-primary">
                                        {user.user.fullName}
                                    </TableCell>
                                    <TableCell className="text-cs-foreground-primary">
                                        {user.user.mobileNum}
                                    </TableCell>
                                    <TableCell className="text-cs-foreground-primary">
                                        {user.referralStats.completed}
                                    </TableCell>
                                    <TableCell className="text-cs-foreground-primary">
                                        <div className="flex items-center">
                                            <IndianRupee
                                                size={12}
                                                className="mt-[1px]"
                                            />
                                            <span>
                                                {user.wallet.totalEarning.toFixed(
                                                    2
                                                )}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-cs-foreground-primary">
                                        <div className="flex items-center">
                                            <IndianRupee
                                                size={12}
                                                className="mt-[1px]"
                                            />
                                            <span>
                                                {user.wallet.pendingWithdrawal.toFixed(
                                                    2
                                                )}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-cs-foreground-primary">
                                        <div className="flex items-center">
                                            <IndianRupee
                                                size={12}
                                                className="mt-[1px]"
                                            />
                                            <span>
                                                {user.wallet.balance.toFixed(2)}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-cs-foreground-primary">
                                        <div className="flex items-center">
                                            <IndianRupee
                                                size={12}
                                                className="mt-[1px]"
                                            />
                                            <span>
                                                {user.wallet.pendingBalance.toFixed(
                                                    2
                                                )}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right pr-4">
                                        <div className="flex justify-end">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        className="h-8 w-8 p-0 cursor-pointer"
                                                    >
                                                        <span className="sr-only">
                                                            Open menu
                                                        </span>
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent
                                                    align="end"
                                                    className="bg-cs-background-primary"
                                                >
                                                    <DropdownMenuLabel className="text-sm text-cs-foreground-primary font-medium">
                                                        Menu
                                                    </DropdownMenuLabel>
                                                    <Separator />
                                                    <DropdownMenuItem
                                                        className="cursor-pointer"
                                                        onSelect={(e) => {
                                                            e.preventDefault();
                                                        }}
                                                    >
                                                        <ViewDetail
                                                            id={user._id}
                                                        />
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="mt-3.5 flex justify-end gap-2.5">
                <Button
                    variant="outline"
                    disabled={state.page === 1}
                    onClick={() => dispatch({ type: "previousPage" })}
                >
                    Prev
                </Button>
                <Button variant="outline" disabled={true}>
                    {state.page}
                </Button>
                <Button
                    variant="outline"
                    disabled={
                        data?.rows === 0 ||
                        state.page === Math.ceil(data?.rows / 50)
                    }
                    onClick={() => dispatch({ type: "nextPage" })}
                >
                    Next
                </Button>
            </div>
        </>
    );
}
