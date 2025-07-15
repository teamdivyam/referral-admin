import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useReducer, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import AdminService from "../../services/admin.service";
import LoadingCircle from "../../components/loading-circle";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Clock, RefreshCw, CircleDollarSign, CalendarDays, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const fetchReferralSettings = async () => {
    try {
        const response = await AdminService.getReferralSettings();

        return response.data.result;
    } catch (error) {
        console.error(error);
    }
};

const updateReferralSettings = async ({ name, value }) => {
    try {
        const response = await AdminService.updateReferralSettings(
            name,
            Number(value)
        );

        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const updateReferralSchedule = async ({ schedule, scheduleTime }) => {
    console.log(schedule, scheduleTime);
    try {
        const response = await AdminService.updateReferralSchedule(
            schedule,
            scheduleTime
        );

        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const getCronJobStatus = async () => {
    try {
        const response = await AdminService.getCronJobStatus();

        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const controlCronJob = async (state) => {
    try {
        const response = await AdminService.controlCronJob(state);

        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const reducerFuncValue = (state, action) => {
    switch (action.type) {
        case "initial":
            return { ...state, ...action.values };
        case "minWithdrawalAmount":
            return { ...state, minWithdrawalAmount: action.value };
        case "maxWithdrawalAmount":
            return { ...state, maxWithdrawalAmount: action.value };
        case "maxWithdrawalPerDay":
            return { ...state, maxWithdrawalPerDay: action.value };
        case "maxReferPerDay":
            return { ...state, maxReferPerDay: action.value };
        case "scheduleTime":
            return {
                ...state,
                referralScript: {
                    ...state.referralScript,
                    schedule: action.value,
                },
            };
        case "scheduleDuration":
            return {
                ...state,
                referralScript: {
                    ...state.referralScript,
                    scheduleTime: action.value,
                },
            };
        default:
            return state;
    }
};

const initialState = {
    minWithdrawalAmount: 0,
    maxWithdrawalAmount: 0,
    maxWithdrawalPerDay: 0,
    maxReferPerDay: 0,
    referralScript: {
        schedule: 0,
        scheduleTime: "minute",
    },
};

const referralSettings = [
    { label: "Min. Withdrawal Amount", name: "minWithdrawalAmount" },
    { label: "Max. Withdrawal Amount", name: "maxWithdrawalAmount" },
    { label: "Max. Withdrawal Per Day", name: "maxWithdrawalPerDay" },
    { label: "Max. Refer Per Day", name: "maxReferPerDay" },
];

const schedule = {
    second: { min: 0, max: 60 },
    minute: { min: 0, max: 60 },
    hour: { min: 0, max: 24 },
};

export default function Referral() {
    const [runScript, setRunScript] = useState(false);
    const [editIndex, setEditIndex] = useState([false, false, false, false]);
    const [editSchedule, setEditSchedule] = useState(false);
    const [state, dispatch] = useReducer(reducerFuncValue, initialState);
    const { data, isLoading, refetch } = useQuery({
        queryKey: ["referral-settings"],
        queryFn: fetchReferralSettings,
    });
    const {
        data: cronData,
        isLoading: isLoadingCron,
        refetch: refetchCron,
    } = useQuery({
        queryKey: ["cron-job-status"],
        queryFn: getCronJobStatus,
    });

    // Initialize referral setting data
    useEffect(() => {
        if (data) {
            dispatch({ type: "initial", values: data });
        }
    }, [data]);

    // Initialize referral script cron data
    useEffect(() => {
        setRunScript(cronData?.isRunning);
    }, [cronData]);

    // Hook for mutate referral setting data
    const mutation = useMutation({
        mutationFn: updateReferralSettings,
        onSuccess: (_) => {
            toast("Referral setting updated!");
            const tempEditIndex = [false, false, false, false];
            setEditIndex(tempEditIndex);
            refetch();
        },
        onError: (error) => {
            console.error("Error:", error);
        },
    });

    // Hook for mutate referral script cron job
    const mutationCron = useMutation({
        mutationFn: controlCronJob,
        onSuccess: (_) => {
            setRunScript(!runScript);
            refetchCron();
        },
        onError: (error) => {
            console.error("Error:", error);
        },
    });

    // Hook for mutate referral script cron job
    const mutationSchedule = useMutation({
        mutationFn: updateReferralSchedule,
        onSuccess: (_) => {
            toast("Referral setting updated!");
            refetch();
        },
        onError: (error) => {
            console.error("Error:", error);
        },
    });

    const handleEditButton = (index) => {
        if (!editIndex[index]) {
            const tempEditIndex = [false, false, false, false];
            const currentEditIndex = editIndex.findIndex((elem) => elem);

            if (currentEditIndex === -1) {
                tempEditIndex[index] = true;
                setEditIndex(tempEditIndex);
                return;
            }

            const prevValue = Object.values(data)[currentEditIndex];
            const currentValue = Object.values(state)[currentEditIndex];

            if (prevValue === currentValue) {
                tempEditIndex[index] = true;
                setEditIndex(tempEditIndex);
                return;
            }

            toast("Saved previous data first!");
        }
    };

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <CircleDollarSign className="h-5 w-5 text-blue-500" />
                        <span>Referral Program Settings</span>
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Referral Limits Section */}
                    <div className="space-y-4">
                        <h3 className="font-medium flex items-center gap-2">
                            <RefreshCw className="h-4 w-4" />
                            Referral Limits
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {referralSettings.map((elem, index) => (
                                <div key={index} className="space-y-2">
                                    <Label className="text-sm font-medium">
                                        {elem.label}
                                    </Label>
                                    <div className="flex gap-2">
                                        {isLoading ? (
                                            <LoadingCircle />
                                        ) : (
                                            <Input
                                                type="number"
                                                value={state[elem.name]}
                                                disabled={!editIndex[index]}
                                                className={`${
                                                    editIndex[index]
                                                        ? "ring-1 ring-blue-500"
                                                        : ""
                                                }`}
                                                onChange={(e) =>
                                                    dispatch({
                                                        type: elem.name,
                                                        value: e.target.value,
                                                    })
                                                }
                                            />
                                        )}
                                        <div className="flex gap-2">
                                            <Button
                                                variant={
                                                    editIndex[index]
                                                        ? "outline"
                                                        : "default"
                                                }
                                                size="sm"
                                                onClick={() =>
                                                    handleEditButton(index)
                                                }
                                                className={
                                                    editIndex[index]
                                                        ? "hidden"
                                                        : ""
                                                }
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="default"
                                                size="sm"
                                                onClick={() => {
                                                    mutation.mutate({
                                                        name: elem.name,
                                                        value: state[elem.name],
                                                    });
                                                }}
                                                className={
                                                    !editIndex[index]
                                                        ? "hidden"
                                                        : ""
                                                }
                                            >
                                                Save
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Script Control Section */}
                    <div className="space-y-4">
                        <h3 className="font-medium flex items-center gap-2">
                            <Zap className="h-4 w-4" />
                            Script Control
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Processing Script */}
                            <Card className="p-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <Label className="font-medium">
                                            Processing Script
                                        </Label>
                                        <p className="text-sm text-muted-foreground">
                                            {runScript ? "Active" : "Inactive"}
                                        </p>
                                    </div>
                                    {isLoadingCron ? (
                                        <LoadingCircle />
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <Badge
                                                variant={
                                                    runScript
                                                        ? "default"
                                                        : "outline"
                                                }
                                            >
                                                {runScript
                                                    ? "Running"
                                                    : "Stopped"}
                                            </Badge>
                                            <Switch
                                                checked={runScript}
                                                onCheckedChange={() => {
                                                    mutationCron.mutate(
                                                        runScript
                                                            ? "stop"
                                                            : "start"
                                                    );
                                                }}
                                                className={cn(
                                                    "data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-300"
                                                )}
                                            />
                                        </div>
                                    )}
                                </div>
                                <p className="text-xs text-muted-foreground mt-2">
                                    Last Execution:{" "}
                                    {(!isLoadingCron &&
                                        cronData?.lastExecution) ||
                                        "N/A"}
                                </p>
                            </Card>

                            {/* Scheduled Script */}
                            <Card className="p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <Label className="font-medium">
                                        Scheduled Script
                                    </Label>
                                    <Button
                                        variant={
                                            editSchedule ? "outline" : "default"
                                        }
                                        size="sm"
                                        onClick={() =>
                                            setEditSchedule(!editSchedule)
                                        }
                                    >
                                        {editSchedule ? "Cancel" : "Edit"}
                                    </Button>
                                </div>

                                {isLoadingCron ? (
                                    <LoadingCircle />
                                ) : (
                                    <div className="space-y-3">
                                        <div className="flex gap-2">
                                            <Select
                                                value={state.referralScript.schedule.toString()}
                                                onValueChange={(value) => {
                                                    dispatch({
                                                        type: "scheduleTime",
                                                        value: value,
                                                    });
                                                }}
                                                disabled={!editSchedule}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Interval" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {Array.from({
                                                            length:
                                                                schedule[
                                                                    state
                                                                        ?.referralScript
                                                                        ?.scheduleTime
                                                                ]?.max || 0,
                                                        }).map((_, index) => (
                                                            <SelectItem
                                                                key={index}
                                                                value={index.toString()}
                                                            >
                                                                {index}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>

                                            <Select
                                                value={
                                                    state.referralScript
                                                        .scheduleTime
                                                }
                                                onValueChange={(value) =>
                                                    dispatch({
                                                        type: "scheduleDuration",
                                                        value: value,
                                                    })
                                                }
                                                disabled={!editSchedule}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Unit" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {Object.keys(
                                                            schedule
                                                        ).map((elem, index) => (
                                                            <SelectItem
                                                                key={index}
                                                                value={elem.toString()}
                                                            >
                                                                {elem
                                                                    .charAt(0)
                                                                    .toUpperCase() +
                                                                    elem.slice(
                                                                        1
                                                                    )}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        {editSchedule && (
                                            <Button
                                                className="w-full"
                                                onClick={() => {
                                                    mutationSchedule.mutate({
                                                        schedule:
                                                            state.referralScript
                                                                .schedule,
                                                        scheduleTime:
                                                            state.referralScript
                                                                .scheduleTime,
                                                    });
                                                    setEditSchedule(false);
                                                }}
                                            >
                                                Update Schedule
                                            </Button>
                                        )}

                                        <p className="text-xs text-muted-foreground">
                                            Current: Every{" "}
                                            {state.referralScript.schedule}{" "}
                                            {state.referralScript.scheduleTime}
                                        </p>
                                    </div>
                                )}
                            </Card>
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="bg-muted/50 py-3 px-4">
                    <p className="text-xs text-muted-foreground">
                        <Clock className="inline h-3 w-3 mr-1" />
                        Changes may take a few minutes to propagate through the
                        system.
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
