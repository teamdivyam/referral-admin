import { Shield, Mail, Phone, Calendar, User, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function MyProfile() {
    return (
        <div className="space-y-6">
            {/* Profile Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="relative">
                    <img
                        src="https://placehold.co/400"
                        alt="Admin profile"
                        className="rounded-full w-24 h-24 border-4 border-blue-100 dark:border-blue-900/30"
                    />
                    <Badge className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-600 dark:bg-blue-800 text-white">
                        <Shield className="h-3 w-3 mr-1" />
                        Admin
                    </Badge>
                </div>
                
                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Adesh Singh</h2>
                            <p className="text-gray-600 dark:text-gray-300">Head Administrator</p>
                        </div>
                        <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4 mr-2" />
                            Edit Profile
                        </Button>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 text-sm">
                            <Mail className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                            <span className="text-gray-700 dark:text-gray-300">adesh@company.com</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <Phone className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                            <span className="text-gray-700 dark:text-gray-300">+91 98765 43210</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                            <span className="text-gray-700 dark:text-gray-300">Joined: Jan 15, 2022</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <User className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                            <span className="text-gray-700 dark:text-gray-300">Admin ID: ADM-1001</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Admin Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Total Users</h3>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">1,248</p>
                    <p className="text-sm text-green-600 dark:text-green-400 mt-1">+12% from last month</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Active Sessions</h3>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">42</p>
                    <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">5 new today</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">System Health</h3>
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full">
                            <div className="h-2 w-3/4 bg-green-500 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">94%</span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">All systems operational</p>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
                <div className="space-y-4">
                    {[
                        { action: "Updated user permissions", time: "10 minutes ago" },
                        { action: "Approved 5 withdrawal requests", time: "2 hours ago" },
                        { action: "Created new admin report", time: "Yesterday" },
                        { action: "Reset password for user@example.com", time: "2 days ago" }
                    ].map((item, index) => (
                        <div key={index} className="flex items-start gap-3 pb-4 border-b border-gray-100 dark:border-gray-700 last:border-0 last:pb-0">
                            <div className="mt-1 h-2 w-2 rounded-full bg-blue-500"></div>
                            <div>
                                <p className="text-gray-800 dark:text-gray-200">{item.action}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{item.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}