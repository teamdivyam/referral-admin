import { useEffect, useMemo, useReducer, useState } from "react";
import DataTable from "../features/agents/DataTable";
import { useAxiosGet } from "../hooks/useAxios";
import AdminService from "../services/admin.service";
import {
    getCoreRowModel,
    useReactTable,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
} from "@tanstack/react-table";
import { columns } from "@/features/agents/ColumnDef";
import debounce from "debounce";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import FilterDialog from "../features/agents/FilterDialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Agents() {
    const [filterDialogOpen, setFilterDialogOpen] = useState(false);
    const [filterSearchValue, setFilterSearchValue] = useState("");
    const [columnFilters, setColumnFilters] = useState([]);

    const { data, fetchLoading, fetchError } = useAxiosGet({
        adminService: AdminService.agents,
    });

    const table = useReactTable({
        data: data?.agents ?? [],
        columns,
        filterFns: {},
        state: {
            columnFilters,
        },
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(), // client side filtering
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        debugTable: true,
        debugHeaders: true,
        debugColumns: false,
    });

    const handleDebounceFn = (value) => {
        console.log("Debounced value:", value);
    };

    const debounceFn = useMemo(() => debounce(handleDebounceFn, 400, {immediate: true}), []);

    const handleFilterSearchValueChange = (event) => {
        setFilterSearchValue(event.target.value);
        debounceFn(event.target.value);
    };

    if (fetchLoading) {
        return <h1>Loading...</h1>;
    } else if (fetchError) {
        return <h1>Error in fetching...</h1>;
    } else {

        return (
            <>
                <div className="flex justify-between">
                    <div className="text-3xl font-semibold text-cs-foreground-primary">
                        Agents
                    </div>
                    <div className="flex gap-12">
                        <div className="flex items-center gap-2.5">
                            <span>Page No</span>
                            <Input
                                type="number"
                                min="1"
                                max={table.getPageCount()}
                                defaultValue={
                                    table.getState().pagination.pageIndex + 1
                                }
                                onChange={(e) => {
                                    const page = e.target.value
                                        ? Number(e.target.value) - 1
                                        : 0;
                                    table.setPageIndex(page);
                                }}
                                className="w-12 bg-cs-background-secondary [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                        </div>
                        <Select
                            value={table.getState().pagination.pageSize}
                            onValueChange={(value) => {
                                table.setPageSize(Number(value));
                            }}
                        >
                            <SelectTrigger className="w-[180px] bg-cs-background-secondary">
                                <SelectValue placeholder="Select rows" />
                            </SelectTrigger>
                            <SelectContent>
                                {[10, 20, 30, 40, 50].map((pageSize) => (
                                    <SelectItem key={pageSize} value={pageSize}>
                                        Show {pageSize}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <div className="px-3 rounded-md text-sm border shadow-xs bg-cs-background-secondary flex items-center gap-1">
                            <div>Page</div>
                            <strong>
                                {table.getState().pagination.pageIndex + 1} of{" "}
                                {table.getPageCount()}
                            </strong>
                        </div>
                        <FilterDialog
                            open={filterDialogOpen}
                            onOpenChange={setFilterDialogOpen}
                            filterSearchValue={filterSearchValue}
                            handleFilterSearchValueChange={
                                handleFilterSearchValueChange
                            }
                        />
                    </div>
                </div>
                <DataTable table={table} />
                <div className="mt-6 flex justify-end">
                    <div className="flex gap-3">
                        <Button
                            variant="outline"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <ChevronLeft />
                        </Button>
                        <Button variant="outline" disabled>
                            {table.getState().pagination.pageIndex + 1}
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            <ChevronRight />
                        </Button>
                    </div>
                </div>
            </>
        );
    }
}
