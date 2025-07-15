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
import AdminService from "../../services/admin.service";
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
import Status from "../common/Status";
import LoadingCircle from "../../components/loading-circle";
import { useDebounce } from "../../hooks/useDebounce";
import { Calendar } from "@/components/ui/calendar";
import ViewDetailPendingReferral from "./ViewDetailPendingReferral";
import FilterDialogReferral from "./FilterDialogReferral";
import { Badge } from "@/components/ui/badge";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

const fetchPendingReferrals = async ({
    page,
    search,
    fromDate,
    toDate,
    searchIn,
    id,
    searchIdIn,
}) => {
    try {
        const response = await AdminService.getReferrals({
            referralStatus: "pending",
            page,
            search,
            fromDate,
            toDate,
            searchIn,
            id,
            searchIdIn,
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
        case "setFromDate":
            return { ...state, fromDate: action.value };
        case "setToDate":
            return { ...state, toDate: action.value };
        case "setSearchIn":
            return { ...state, searchIn: action.value };
        case "setId":
            return { ...state, id: action.value };
        case "setSearchIdIn":
            return { ...state, searchIdIn: action.value };
        case "clearDate":
            return { ...state, fromDate: undefined, toDate: undefined };
        case "clearId":
            return { ...state, id: "" };
        case "clearFilter":
            return {
                ...state,
                fromDate: undefined,
                toDate: undefined,
                search: "",
                id: "",
            };
        default:
            return state;
    }
};

const initialState = {
    page: 1,
    fromDate: undefined,
    toDate: undefined,
    search: "",
    searchIn: "referrer",
    id: "",
    searchIdIn: "referId",
};

export default function PendingReferral() {
    const [state, dispatch] = useReducer(reducerFn, initialState);
    const debounceSearch = useDebounce(state.search, 500);
    const debounceSearchId = useDebounce(state.id, 500);

    const { data, isLoading } = useQuery({
        queryKey: [
            "pending-referrals",
            debounceSearch,
            debounceSearchId,
            state.page,
            state.fromDate,
            state.toDate,
            state.searchIn,
            state.searchIdIn,
        ],
        queryFn: () =>
            fetchPendingReferrals({
                page: state.page,
                search: debounceSearch,
                fromDate: state.fromDate,
                toDate: state.toDate,
                searchIn: state.searchIn,
                id: debounceSearchId,
                searchIdIn: state.searchIdIn,                
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
                                        {state.fromDate ? (
                                            format(
                                                state.fromDate,
                                                "MMM dd, yyyy"
                                            )
                                        ) : (
                                            <span>From date</span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                >
                                    <Calendar
                                        mode="single"
                                        selected={state.fromDate}
                                        onSelect={(d) => {
                                            dispatch({
                                                type: "setFromDate",
                                                value: d,
                                            });
                                            if (
                                                state.toDate &&
                                                d > state.toDate
                                            ) {
                                                dispatch({
                                                    type: "setToDate",
                                                    value: d,
                                                });
                                            }
                                        }}
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
                                        disabled={!state.fromDate}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {state.toDate ? (
                                            format(state.toDate, "MMM dd, yyyy")
                                        ) : (
                                            <span>To date</span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                >
                                    <Calendar
                                        mode="single"
                                        selected={state.toDate}
                                        onSelect={(d) => {
                                            dispatch({
                                                type: "setToDate",
                                                value: d,
                                            });
                                            if (d < state.fromDate) {
                                                dispatch({
                                                    type: "setFromDate",
                                                    value: d,
                                                });
                                            }
                                        }}
                                        initialFocus
                                        fromDate={state.fromDate}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="flex gap-2">
                            <FilterDialogReferral
                                state={state}
                                dispatch={dispatch}
                            />

                            <Button
                                variant="ghost"
                                onClick={() =>
                                    dispatch({ type: "clearFilter" })
                                }
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
                                ID
                            </TableHead>
                            <TableHead className="py-3.5 text-cs-foreground-primary font-base sticky top-0 z-1 bg-cs-background-secondary">
                                Referrer
                            </TableHead>
                            <TableHead className="py-3.5 text-cs-foreground-primary font-base sticky top-0 z-1 bg-cs-background-secondary">
                                Referred
                            </TableHead>
                            <TableHead className="py-3.5 text-cs-foreground-primary font-base sticky top-0 z-1 bg-cs-background-secondary">
                                Refer Date
                            </TableHead>
                            <TableHead className="py-3.5 text-cs-foreground-primary font-base sticky top-0 z-1 bg-cs-background-secondary">
                                Order ID
                            </TableHead>
                            <TableHead className="py-3.5 text-cs-foreground-primary font-base sticky top-0 z-1 bg-cs-background-secondary">
                                Commission Amount
                            </TableHead>
                            <TableHead className="py-3.5 text-cs-foreground-primary font-base sticky top-0 z-1 bg-cs-background-secondary">
                                Status
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
                            data?.referrals.map((referral) => (
                                <TableRow key={referral.ref_id}>
                                    <TableCell className="pl-4 text-cs-foreground-primary">
                                        {referral.ref_id}
                                    </TableCell>
                                    <TableCell className="text-cs-foreground-primary">
                                        {referral.referrer.fullName ||
                                            referral.referrer.email ||
                                            referral.referrer.mobileNum}
                                    </TableCell>
                                    <TableCell className="text-cs-foreground-primary">
                                        {referral.referee.fullName ||
                                            referral.referee.email ||
                                            referral.referee.mobileNum}
                                    </TableCell>
                                    <TableCell className="text-cs-foreground-primary">
                                        {format(
                                            referral.createdAt,
                                            "dd/MM/yyyy"
                                        )}
                                    </TableCell>
                                    <TableCell className="text-cs-foreground-primary">
                                        {referral.order
                                            .slice(referral.order.length - 4)
                                            .toUpperCase()}
                                    </TableCell>
                                    <TableCell className="text-cs-foreground-primary">
                                        <div className="flex items-center">
                                            <IndianRupee
                                                size={12}
                                                className="mt-[1px]"
                                            />
                                            <span>
                                                {referral.amount.toFixed(2)}
                                            </span>
                                        </div>
                                    </TableCell>

                                    <TableCell className="text-cs-foreground-primary">
                                        <Status statusType={referral.status} />
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
                                                <DropdownMenuContent align="end" className="bg-cs-background-primary">
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
                                                        <ViewDetailPendingReferral
                                                            pendingReferral={
                                                                referral
                                                            }
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