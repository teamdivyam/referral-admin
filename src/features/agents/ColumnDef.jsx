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
    columnHelper.accessor("name", {
        header: (column) => {
            return (
                <>
                    <div>
                        <span>Name</span>
                    </div>
                    {column.column.getCanFilter() ? (
                        <div>{/* <Filter column={column.column} /> */}</div>
                    ) : null}
                </>
            );
        },
        cell: (info) => <div>{info.getValue()}</div>,
    }),
    columnHelper.accessor("phoneNumber", {
        header: () => <div className="text-right">Phone</div>,
        cell: (info) => <div className="text-right">{info.getValue()}</div>,
    }),
    columnHelper.accessor("totalReferrals", {
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
                    <span>Total Referrals</span>
                    <ChevronsUpDown size={16} />
                </div>
            </>
        ),
        cell: (info) => <div className="text-right">{info.getValue()}</div>,
    }),
    columnHelper.accessor("totalOrders", {
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
                    <span>Total Orders</span>
                    <ChevronsUpDown size={16} />
                </div>
            </>
        ),
        cell: (info) => <div className="text-right">{info.getValue()}</div>,
    }),
    columnHelper.accessor("wallet.totalEarningAmount", {
        header: () => <div className="text-right">Total Commission</div>,
        cell: (info) => <div className="text-right">{info.getValue()}</div>,
    }),
    columnHelper.accessor("wallet.pendingBalance", {
        header: () => <div className="text-right">Pending Commission</div>,
        cell: (info) => <div className="text-right">{info.getValue()}</div>,
    }),
    columnHelper.accessor("wallet.pendingWithdrawalAmount", {
        header: () => <div className="text-right">Pending Withdrawal</div>,
        cell: (info) => <div className="text-right">{info.getValue()}</div>,
    }),
    columnHelper.accessor("actions", {
        cell: ({ row }) => {
            const agent = row.original;

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
                                <SummaryDrawer id={agent._id} />
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onSelect={(e) => {
                                    e.preventDefault();
                                }}
                            >
                                <ViewDetailDrawer id={agent._id} />
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onSelect={(e) => {
                                    e.preventDefault();
                                }}
                            >
                                <AssignReferralCodeDialog
                                    agentId={agent._id}
                                    name={agent.name}
                                />
                            </DropdownMenuItem>
                            {agent.accountStatus === "activate" ? (
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
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            );
        },
    }),
];
