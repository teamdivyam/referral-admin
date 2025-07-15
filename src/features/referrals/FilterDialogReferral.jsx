import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

export default function FilterDialog({ state, dispatch }) {
    const [filterToggle, setFilterToggle] = useState(false);

    return (
        <Popover open={filterToggle} onOpenChange={setFilterToggle}>
            <PopoverTrigger asChild>
                <Button variant="outline">
                    <Filter className="text-cs-icon-primary" />
                    <span>Filter</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-96">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">
                            Global Filter
                        </h4>
                    </div>
                    <div className="grid gap-2">
                        <div className="grid grid-cols-6 items-center gap-1.5">
                            <Input
                                value={state.search}
                                onChange={(e) => {
                                    dispatch({
                                        type: "search",
                                        value: e.target.value,
                                    });
                                    if (state.page > 1) {
                                        dispatch({
                                            type: "defaultPage",
                                        });
                                    }
                                }}
                                className="col-span-3 h-8"
                                placeholder="name/email/phone"
                            />
                            <Select
                                value={state.searchIn}
                                onValueChange={(value) => {
                                    dispatch({ type: "setSearchIn", value });
                                }}
                            >
                                <SelectTrigger className="w-full bg-cs-background-secondary col-span-2">
                                    <SelectValue placeholder="Select rows" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="referrer">
                                        Referrer
                                    </SelectItem>
                                    <SelectItem value="referee">
                                        Referee
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <Button
                                variant="outline"
                                className="bg-cs-background-secondary"
                                onClick={() =>
                                    dispatch({ type: "search", value: "" })
                                }
                            >
                                <CircleX className="text-cs-icon-primary" />
                            </Button>
                        </div>
                        <div className="grid grid-cols-6 items-center gap-1.5">
                            <Input
                                value={state.id}
                                onChange={(e) =>
                                    dispatch({
                                        type: "setId",
                                        value: e.target.value,
                                    })
                                }
                                className="col-span-3 h-8"
                                placeholder="id"
                            />
                            <Select
                                value="referId"
                                onValueChange={(value) => {
                                    dispatch({ type: "setSearchIdIn", value });
                                }}
                            >
                                <SelectTrigger className="w-full bg-cs-background-secondary col-span-2">
                                    <SelectValue placeholder="Select rows" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="referId">
                                        Refer ID
                                    </SelectItem>
                                    <SelectItem value="orderId">
                                        Order ID
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <Button
                                variant="outline"
                                className="bg-cs-background-secondary"
                                onClick={() => dispatch({ type: "clearId" })}
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
