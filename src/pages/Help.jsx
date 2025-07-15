import {
    BookOpen,
    Shield,
    Users,
    Wallet,
    Settings,
    AlertTriangle,
    MessageSquare,
    LifeBuoy,
    Mail,
    Clock,
    FileText,
    ChevronRight,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

export default function Help() {
    const quickLinks = [
        { title: "User Management Guide", icon: <Users className="h-5 w-5" /> },
        {
            title: "Withdrawal Approval Process",
            icon: <Wallet className="h-5 w-5" />,
        },
        {
            title: "System Configuration",
            icon: <Settings className="h-5 w-5" />,
        },
        {
            title: "Troubleshooting Common Issues",
            icon: <AlertTriangle className="h-5 w-5" />,
        },
    ];

    const adminRules = [
        "Always verify user identity before approving withdrawals",
        "Never share your admin credentials with anyone",
        "Maintain regular backups of critical data",
        "Document all manual overrides in the system log",
        "Escalate suspicious activity to security immediately",
        "Review referral bonuses weekly for accuracy",
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                        <LifeBuoy className="h-8 w-8 text-blue-500" />
                        Admin Help Center
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Essential resources and guidelines for platform
                        administration
                    </p>
                </div>
                <Button>
                    <Mail className="h-4 w-4 mr-2" />
                    Contact Support
                </Button>
            </div>

            {/* Quick Access Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickLinks.map((link, index) => (
                    <Card
                        key={index}
                        className="hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center gap-4 p-4">
                            <div className="p-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                                {link.icon}
                            </div>
                            <div>
                                <h3 className="font-medium">{link.title}</h3>
                                <Link to="#" className="mt-2.5 flex items-center text-sm">
                                    <span>View guide</span>{" "}
                                    <ChevronRight size={17} className="mt-0.5 ml-1" />
                                </Link>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Admin Handbook Section */}
            <Card>
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <BookOpen className="h-6 w-6 text-blue-500" />
                        <h2 className="text-2xl font-bold">
                            Administrator Handbook
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Rules Section */}
                        <div className="lg:col-span-2">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <Shield className="h-5 w-5" />
                                Essential Admin Rules
                            </h3>
                            <ul className="space-y-3">
                                {adminRules.map((rule, index) => (
                                    <li
                                        key={index}
                                        className="flex items-start gap-3"
                                    >
                                        <div className="flex-shrink-0 h-5 w-5 text-blue-500 mt-0.5">
                                            <FileText className="h-5 w-5" />
                                        </div>
                                        <p className="text-muted-foreground">
                                            {rule}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Support Section */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                    <Clock className="h-5 w-5" />
                                    Support Availability
                                </h3>
                                <div className="space-y-2 text-muted-foreground">
                                    <p>Monday-Friday: 9AM - 6PM EST</p>
                                    <p>Saturday: 10AM - 4PM EST</p>
                                    <p>Emergency: 24/7 via priority channel</p>
                                </div>
                            </div>

                            <Separator />

                            <div>
                                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                    <MessageSquare className="h-5 w-5" />
                                    Quick Assistance
                                </h3>
                                <div className="space-y-3">
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start"
                                    >
                                        Live Chat
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start"
                                    >
                                        Request Callback
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start"
                                    >
                                        Create Ticket
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Documentation Section */}
            <Card>
                <div className="p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h2 className="text-xl font-bold flex items-center gap-3 mb-2">
                                <FileText className="h-6 w-6 text-blue-500" />
                                System Documentation
                            </h2>
                            <p className="text-muted-foreground">
                                Complete technical documentation and API
                                references
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline">PDF Manual</Button>
                            <Button>View Online Docs</Button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
