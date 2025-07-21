import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { CircleX, Filter } from "lucide-react";
import { useState } from "react";

export default function UserFilterDialog({ state, dispatch }) {
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
                    <div className="flex gap-1.5">
                        <Input
                            value={state.search || ""}
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
                            placeholder="Name, email or phone"
                        />
                        <Button
                            variant="outline"
                            className="bg-cs-background-secondary"
                            onClick={() =>
                                dispatch({ type: "search", value: undefined })
                            }
                        >
                            <CircleX className="text-cs-icon-primary" />
                        </Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
