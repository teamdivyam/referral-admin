import { Lock, Shield, User, Mail, Key, Bell, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useMutation, useQuery } from "@tanstack/react-query";
import AdminService from "../../services/admin.service";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import ChangePasswordDialog from "./ChangePasswordDialog";

const fetchAdminSessions = async () => {
    try {
        const response = await AdminService.getSessions();

        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const fetchRevokeSession = async ({ sessionId }) => {
    try {
        const response = await AdminService.revokeSessions({ sessionId });

        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export default function AccountSettings() {
    const {
        data: sessionData,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["admin-sessions"],
        queryFn: fetchAdminSessions,
    });

    const revokeMutate = useMutation({
        mutationFn: fetchRevokeSession,
        onSuccess: (data) => {
            toast(data.message);
            if (data.success) {
                refetch();
            }
        },
    });

    return (
        <div className="space-y-6">
            {/* Account Security Card */}
            <Card className="bg-cs-background-secondary">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-blue-500" />
                        <span>Account Security</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Password */}
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2">
                                <Lock className="h-4 w-4" />
                                Password
                            </Label>
                            <div className="flex gap-2">
                                <Input
                                    type="password"
                                    value="••••••••"
                                    disabled
                                    className="bg-cs-background-primary dark:bg-cs-background-primary"
                                />
                                <ChangePasswordDialog />
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Last changed 3 months ago
                            </p>
                        </div>

                        {/* Two-Factor Auth */}
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2">
                                <Key className="h-4 w-4" />
                                Two-Factor Authentication
                            </Label>
                            <div className="flex items-center justify-between">
                                <Badge variant="outline">Not Enabled</Badge>
                                <Button variant="default" size="sm">
                                    Enable 2FA
                                </Button>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Add an extra layer of security
                            </p>
                        </div>
                    </div>

                    {/* Active Sessions */}
                    <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                            <Globe className="h-4 w-4" />
                            Active Sessions
                        </Label>
                        <div className="rounded-lg border p-4 bg-cs-background-primary">
                            {!isLoading &&
                                sessionData.sessions.map((session, i) => (
                                    <div>
                                        <div className="flex items-center justify-between bg-cs-background-primary">
                                            <div>
                                                <p className="font-medium">
                                                    {session.device.browser} •{" "}
                                                    {session.device.os}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    Last Activity •{" "}
                                                    {formatDistanceToNow(
                                                        session.lastActivity
                                                    )}
                                                </p>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-red-500"
                                                onClick={() => {
                                                    revokeMutate.mutate({ sessionId: session._id})
                                                }}
                                            >
                                                Revoke
                                            </Button>
                                        </div>
                                        <Separator className="my-3" />
                                    </div>
                                ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Personal Information Card */}
            <Card className="bg-cs-background-secondary">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5 text-blue-500" />
                        <span>Personal Information</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Full Name</Label>
                            <Input
                                defaultValue="Adesh Singh"
                                className="bg-cs-background-primary dark:bg-cs-background-primary"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Email</Label>
                            <Input
                                defaultValue="admin@example.com"
                                type="email"
                                className="bg-cs-background-primary dark:bg-cs-background-primary"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Phone Number</Label>
                            <Input
                                defaultValue="+1 (555) 123-4567"
                                type="tel"
                                className="bg-cs-background-primary dark:bg-cs-background-primary"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Admin ID</Label>
                            <Input
                                defaultValue="ADM-1001"
                                disabled
                                className="bg-cs-background-primary dark:bg-cs-background-primary"
                            />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button>Save Changes</Button>
                </CardFooter>
            </Card>

            {/* Notification Preferences Card */}
            <Card className="bg-cs-background-secondary">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Bell className="h-5 w-5 text-blue-500" />
                        <span>Notification Preferences</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <Label>Email Notifications</Label>
                            <p className="text-sm text-muted-foreground">
                                Receive important account notifications
                            </p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                        <div>
                            <Label>Security Alerts</Label>
                            <p className="text-sm text-muted-foreground">
                                Get notified about suspicious activity
                            </p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                        <div>
                            <Label>System Updates</Label>
                            <p className="text-sm text-muted-foreground">
                                Receive platform updates and announcements
                            </p>
                        </div>
                        <Switch />
                    </div>
                </CardContent>
            </Card>

            {/* Danger Zone Card */}
            <Card className="bg-cs-background-secondary border-red-200 dark:border-red-900">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
                        <Shield className="h-5 w-5" />
                        <span>Admin Privileges</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="rounded-lg bg-red-50 dark:bg-red-900/40 p-4">
                        <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">
                            Transfer Admin Rights
                        </h4>
                        <p className="text-sm text-red-500 dark:text-red-400 mb-4">
                            This will remove your admin privileges and transfer
                            them to another user.
                        </p>
                        <div className="flex gap-2">
                            <Input
                                placeholder="Enter user email"
                                className="bg-cs-background-secondary max-w-xs dark:bg-cs-background-secondary"
                            />
                            <Button variant="destructive">Transfer</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
