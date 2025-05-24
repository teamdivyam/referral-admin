import DataTable from "../features/agents/DataTable";
import AdminService from "../services/admin.service";
import FilterDialog from "../features/agents/FilterDialog";
import { useEffect, useState } from "react";
import { columns } from "@/features/agents/ColumnDef";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "../hooks/useDebounce";
import {
    getCoreRowModel,
    useReactTable,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
} from "@tanstack/react-table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const fetchAgentsData = async (pageIndex, pageSize, filterSearchValue) => {
    try {
        const response = await AdminService.agents({
            page: pageIndex + 1,
            limit: pageSize,
            search: filterSearchValue,
        });
        return response.data;
    } catch (error) {
        console.error("Error in fetching:", error.message);
    }
};

export default function Agents() {
    const [columnFilters, setColumnFilters] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const debouncedSearchTerm = useDebounce(searchInput, 500);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 50,
    });

    useEffect(() => {
        setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    }, [debouncedSearchTerm]);

    const {
        data: dataQuery,
        isLoading,
        error,
        isSuccess,
    } = useQuery({
        queryKey: ["agentsDataTable", pagination, debouncedSearchTerm],
        queryFn: () =>
            fetchAgentsData(
                pagination.pageIndex,
                pagination.pageSize,
                debouncedSearchTerm
            ),
        keepPreviousData: true,
    });

    const table = useReactTable({
        data: isSuccess ? dataQuery.agents : [],
        columns,
        filterFns: {},
        state: {
            columnFilters,
            pagination,
        },
        manualPagination: true,
        pageCount: isSuccess ? dataQuery.totalPages : 0,
        rowCount: isSuccess ? dataQuery.rowCount : 0,
        onColumnFiltersChange: setColumnFilters,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(), // client side filtering
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    if (error) return <div className="text-red-500">Error loading data</div>;

    return (
        <>
            <div className="flex flex-col justify-between gap-2 md:flex-row">
                <div className="text-xl font-semibold text-cs-foreground-primary">
                    {table.getRowCount()} Rows
                </div>
                <div className="flex flex-wrap gap-4 lg:gap-12">
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
                        searchInput={searchInput}
                        setSearchInput={setSearchInput}
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
