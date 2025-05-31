import { createColumnHelper } from "@tanstack/react-table";
import { ChevronsUpDown, MoreHorizontal } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import SummaryDrawer from "./Summary";
import ViewDetailDrawer from "./ViewDetailDrawer";
import DeactivateAccountAlert from "./DeactivateAccountDialog";
import ActivateAccountAlert from "./ActivateAccountAlert";
import AssignReferralCodeDialog from "./AssignReferralCodeDialog";

const columnHelper = createColumnHelper();

export const columns = [
    columnHelper.accessor("fullName", {
        header: () => {
            return (
                <div>
                    <span>Name</span>
                </div>
            );
        },
        cell: (info) => <div>{info.getValue()}</div>,
    }),
    columnHelper.accessor("mobileNum", {
        header: () => <div className="text-right">Phone</div>,
        cell: (info) => <div className="text-right">{info.getValue()}</div>,
    }),
    columnHelper.accessor("totalRefer", {
        header: (column) => (
            <>
                <div 
                    {...{
                        className: column.column.getCanSort()
                            ? "flex justify-end items-center gap-1 cursor-pointer select-none"
                            : "",
                        onClick: column.column.getToggleSortingHandler(),
                    }}
                >
                    <span>Total Refers</span>
                    <ChevronsUpDown size={16} />
                </div>
            </>
        ),
        cell: (info) => <div className="text-right">{info.getValue()}</div>,
    }),
    columnHelper.accessor("totalReferCompleted", {
        header: (column) => (
            <>
                <div
                    {...{
                        className: column.column.getCanSort()
                            ? "flex justify-end items-center gap-1 cursor-pointer select-none"
                            : "",
                        onClick: column.column.getToggleSortingHandler(),
                    }}
                >
                    <span>Refer Completed</span>
                    <ChevronsUpDown size={16} />
                </div>
            </>
        ),
        cell: (info) => <div className="text-right">{info.getValue()}</div>,
    }),
    columnHelper.accessor("refer.referralId.wallet.totalEarning", {
        header: () => <div className="text-right">Total Earn</div>,
        cell: (info) => <div className="text-right">{info.getValue()}</div>,
    }),
    columnHelper.accessor("refer.referralId.wallet.balance", {
        header: () => <div className="text-right">Balance</div>,
        cell: (info) => <div className="text-right">{info.getValue()}</div>,
    }),
    columnHelper.accessor("refer.referralId.wallet.pendingBalance", {
        header: () => <div className="text-right">Pending Balance</div>,
        cell: (info) => <div className="text-right">{info.getValue()}</div>,
    }),
    columnHelper.accessor("actions", {
        cell: ({ row }) => {
            const referralUser = row.original;

            return (
                <div className="flex justify-end">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onSelect={(e) => {
                                    e.preventDefault();
                                }}
                            >
                                <SummaryDrawer id={referralUser.refer.referralId._id} />
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onSelect={(e) => {
                                    e.preventDefault();
                                }}
                            >
                                <ViewDetailDrawer id={referralUser.refer.referralId._id} />
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onSelect={(e) => {
                                    e.preventDefault();
                                }}
                            >
                                {/* <AssignReferralCodeDialog
                                    id={referralUser.refer.referralId._id}
                                    name={agent.name}
                                /> */}
                            </DropdownMenuItem>
                            {/* {agent.accountStatus === "activate" ? (
                                <DropdownMenuItem
                                    className="text-red-600"
                                    onSelect={(e) => {
                                        e.preventDefault();
                                    }}
                                >
                                    <DeactivateAccountAlert
                                        agentId={agent._id}
                                    />
                                </DropdownMenuItem>
                            ) : (
                                <DropdownMenuItem
                                    className="text-red-600"
                                    onSelect={(e) => {
                                        e.preventDefault();
                                    }}
                                >
                                    <ActivateAccountAlert agentId={agent._id} />
                                </DropdownMenuItem>
                            )} */}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            );
        },
    }),
];
