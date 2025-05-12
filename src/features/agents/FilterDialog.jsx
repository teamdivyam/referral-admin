import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Filter } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function FilterDialog({ open, onOpenChange, filterSearchValue, handleFilterSearchValueChange }) {
    return (
        <Popover open={open} onOpenChange={onOpenChange}>
            <PopoverTrigger asChild>
                <Button variant="outline">
                    <Filter />
                    <span>Filter</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">
                            Global Filter
                        </h4>
                    </div>
                    <div className="grid gap-2">
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="width">Search</Label>
                            <Input
                                value={filterSearchValue}
                                onChange={handleFilterSearchValueChange}
                                className="col-span-2 h-8"
                                placeholder="name, email etc"
                            />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="maxWidth">Status</Label>
                            <Select
                                value="all"
                                onValueChange={(value) => {
                                    console.log(value);
                                }}
                            >
                                <SelectTrigger className="w-[180px] bg-cs-background-secondary">
                                    <SelectValue placeholder="Select rows" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All</SelectItem>
                                    <SelectItem value="activate">
                                        Activate
                                    </SelectItem>
                                    <SelectItem value="deactivate">
                                        Deactivate
                                    </SelectItem>
                                    <SelectItem value="block">block</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
