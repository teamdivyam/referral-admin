import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { CircleX, Filter } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function FilterDialog({ searchInput, setSearchInput }) {
    const [filterToggle, setFilterToggle] = useState(false);

    return (
        <Popover open={filterToggle} onOpenChange={setFilterToggle}>
            <PopoverTrigger asChild>
                <Button variant="outline">
                    <Filter className="text-cs-icon-primary" />
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
                        <div className="grid grid-cols-5 items-center gap-4">
                            <Label htmlFor="width">Search</Label>
                            <Input
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                className="col-span-3 h-8"
                                placeholder="name, email etc"
                            />
                            <Button
                                variant="outline"
                                className="bg-cs-background-secondary"
                                onClick={() => setSearchInput("")}
                            >
                                <CircleX className="text-cs-icon-primary" />
                            </Button>
                        </div>
                        <div className="grid grid-cols-5 items-center gap-4">
                            <Label htmlFor="maxWidth">Status</Label>
                            <Select
                                value="all"
                                onValueChange={(value) => {
                                    console.log(value);
                                }}
                                className="bg-red-800"
                            >
                                <SelectTrigger className="col-span-3 w-full bg-cs-background-secondary">
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
                            <Button
                                variant="outline"
                                className="bg-cs-background-secondary"
                                onClick={() => clearFilterSearchValue()}
                            >
                                <CircleX className="text-cs-icon-primary" />
                            </Button>
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
