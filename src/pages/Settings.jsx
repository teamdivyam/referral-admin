import { useState } from "react";
import {
    User,
    Users,
    Settings as SettingsIcon,
    ChevronRight,
} from "lucide-react";
import MyProfile from "../features/settings/MyProfile";
import AccountSettings from "../features/settings/AccountSettings";
import Referral from "../features/settings/Referral";

export default function Settings() {
    const [currentMenu, setCurrentMenu] = useState(0);

    const settingMenu = [
        {
            title: "My Profile",
            comp: <MyProfile />,
            icon: <User className="h-5 w-5" />,
        },
        {
            title: "Referral Program",
            comp: <Referral />,
            icon: <Users className="h-5 w-5" />,
        },
        {
            title: "Account Settings",
            comp: <AccountSettings />,
            icon: <SettingsIcon className="h-5 w-5" />,
        },
    ];

    return (
        <div className="px-2 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
                {/* Navigation Panel */}
                <div className="lg:col-span-3">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Setting Menu
                            </h2>
                        </div>
                        <nav className="space-y-1 p-2">
                            {settingMenu.map((menu, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentMenu(index)}
                                    className={`w-full flex items-center p-3 rounded-lg transition-all ${
                                        currentMenu === index
                                            ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50"
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span
                                            className={`${
                                                currentMenu === index
                                                    ? "text-blue-600 dark:text-blue-400"
                                                    : "text-gray-500 dark:text-gray-400"
                                            }`}
                                        >
                                            {menu.icon}
                                        </span>
                                        <span className="font-medium">
                                            {menu.title}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Content Area */}
                <div className="lg:col-span-9">
                    <div className=" dark:bg-gray-800 rounded-lg dark:border-gray-700 overflow-hidden">
                        <div className="space-y-6">
                            {settingMenu[currentMenu].comp}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
