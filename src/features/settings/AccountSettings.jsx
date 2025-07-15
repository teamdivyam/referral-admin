import { Lock, Shield, User, Mail, Key, Bell, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function AccountSettings() {
    return (
        <div className="space-y-6">
            {/* Account Security Card */}
            <Card>
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
                                    className="bg-muted"
                                />
                                <Button variant="outline">Change</Button>
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
                        <div className="rounded-lg border p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Chrome • Windows</p>
                                    <p className="text-sm text-muted-foreground">
                                        New York, US • Last active 2 hours ago
                                    </p>
                                </div>
                                <Button variant="ghost" size="sm" className="text-red-500">
                                    Revoke
                                </Button>
                            </div>
                            <Separator className="my-3" />
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Safari • macOS</p>
                                    <p className="text-sm text-muted-foreground">
                                        San Francisco, US • Last active 1 week ago
                                    </p>
                                </div>
                                <Button variant="ghost" size="sm" className="text-red-500">
                                    Revoke
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Personal Information Card */}
            <Card>
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
                            <Input defaultValue="Adesh Singh" />
                        </div>
                        <div className="space-y-2">
                            <Label>Email</Label>
                            <Input defaultValue="admin@example.com" type="email" />
                        </div>
                        <div className="space-y-2">
                            <Label>Phone Number</Label>
                            <Input defaultValue="+1 (555) 123-4567" type="tel" />
                        </div>
                        <div className="space-y-2">
                            <Label>Admin ID</Label>
                            <Input defaultValue="ADM-1001" disabled />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button>Save Changes</Button>
                </CardFooter>
            </Card>

            {/* Notification Preferences Card */}
            <Card>
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
            <Card className="border-red-200 dark:border-red-900/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
                        <Shield className="h-5 w-5" />
                        <span>Admin Privileges</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="rounded-lg bg-red-50 dark:bg-red-900/10 p-4">
                        <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">
                            Transfer Admin Rights
                        </h4>
                        <p className="text-sm text-red-500 dark:text-red-400 mb-4">
                            This will remove your admin privileges and transfer them to another user.
                        </p>
                        <div className="flex gap-2">
                            <Input placeholder="Enter user email" className="max-w-xs" />
                            <Button variant="destructive">Transfer</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}