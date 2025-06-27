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
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

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

const updateReferralSchedule = async ({schedule, scheduleTime}) => {
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
            <h2 className="text-2xl text-cs-foreground-primary font-medium">
                Referral Settings
            </h2>

            <div className="flex mt-8 flex-col gap-3.5">
                {referralSettings.map((elem, index) => (
                    <div className="flex flex-col gap-2.5 xl:flex-row xl:justify-between xl:items-center">
                        <Label>{elem.label}</Label>
                        <div className="flex gap-2.5">
                            {isLoading ? (
                                <LoadingCircle />
                            ) : (
                                <Input
                                    type="number"
                                    value={state[elem.name]}
                                    disabled={!editIndex[index]}
                                    className={`${
                                        editIndex[index] &&
                                        "border-cs-icon-primary"
                                    } bg-blue-100`}
                                    onChange={(e) =>
                                        dispatch({
                                            type: elem.name,
                                            value: e.target.value,
                                        })
                                    }
                                />
                            )}
                            <Button
                                onClick={() => handleEditButton(index)}
                                className={`${
                                    editIndex[index] ? "hidden" : ""
                                } bg-red-400 hover:bg-red-500`}
                            >
                                Edit
                            </Button>
                            <Button
                                onClick={() => {
                                    mutation.mutate({
                                        name: elem.name,
                                        value: state[elem.name],
                                    });
                                }}
                                className={`${
                                    !editIndex[index] ? "hidden" : ""
                                } bg-green-400 hover:bg-green-500`}
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                ))}
                <div className="flex mt-2.5 justify-between items-center px-2.5 py-2.5 rounded-md bg-blue-100">
                    <Label>Referral Processing Script</Label>
                    <div className="flex flex-col xl:gap-2.5 items-end">
                        {isLoadingCron ? (
                            <LoadingCircle />
                        ) : (
                            <Switch
                                checked={runScript}
                                onCheckedChange={() => {
                                    mutationCron.mutate(
                                        runScript ? "stop" : "start"
                                    );
                                }}
                                className={cn(
                                    "data-[state=checked]:bg-cs-icon-primary data-[state=unchecked]:bg-slate-500 cursor-pointer"
                                )}
                            />
                        )}
                        <span className="text-xs">
                            Last Execution:{" "}
                            {(!isLoadingCron && cronData?.lastExecution) ||
                                "null"}
                        </span>
                    </div>
                </div>
                <div className="flex mt-2.5 justify-between items-center px-2.5 py-2.5 rounded-md bg-blue-100">
                    <Label>Scheduled Referral Script</Label>
                    <div className="flex flex-col xl:gap-2.5 items-end">
                        {isLoadingCron ? (
                            <LoadingCircle />
                        ) : (
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
                                    <SelectTrigger className="w-[120px] bg-cs-background-secondary">
                                        <SelectValue placeholder="Set Time" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {Array.from({
                                                length:
                                                    schedule[
                                                        state?.referralScript
                                                            ?.scheduleTime
                                                    ]?.max || 0,
                                            }).map((_, index) => (
                                                <SelectItem
                                                    value={index.toString()}
                                                >
                                                    {index}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>

                                <Select
                                    value={state.referralScript.scheduleTime}
                                    onValueChange={(value) =>
                                        dispatch({
                                            type: "scheduleDuration",
                                            value: value,
                                        })
                                    }
                                    disabled={!editSchedule}
                                >
                                    <SelectTrigger className="w-[140px] bg-cs-background-secondary">
                                        <SelectValue placeholder="Set Duration" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {Object.keys(schedule).map(
                                                (elem, index) => (
                                                    <SelectItem
                                                        key={index}
                                                        value={elem.toString()}
                                                    >
                                                        {elem}
                                                    </SelectItem>
                                                )
                                            )}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>

                                <Button
                                    onClick={() => setEditSchedule(true)}
                                    className={`${
                                        editSchedule ? "hidden" : ""
                                    } bg-red-400 hover:bg-red-500`}
                                >
                                    Edit
                                </Button>
                                <Button
                                    onClick={() => {
                                        console.log(
                                            "schedule:",
                                            state.referralScript.schedule
                                        );
                                        console.log(
                                            "scheduleTime:",
                                            state.referralScript.scheduleTime
                                        );
                                        mutationSchedule.mutate({
                                            schedule:
                                                state.referralScript.schedule,
                                            scheduleTime:
                                                state.referralScript
                                                    .scheduleTime,
                                        });
                                        setEditSchedule(false);
                                    }}
                                    className={`${
                                        !editSchedule ? "hidden" : ""
                                    } bg-green-400 hover:bg-green-500`}
                                >
                                    Save
                                </Button>
                            </div>
                        )}
                        <span className="text-xs">
                            Current Schedule:{" "}
                            {isLoadingCron
                                ? "null"
                                : `Every ${state.referralScript.schedule} ${state.referralScript.scheduleTime}`}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
