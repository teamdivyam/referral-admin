import { useState } from "react";
import MyProfile from "../features/settings/MyProfile";
import AccountSettings from "../features/settings/AccountSettings";
import Referral from "../features/settings/Referral";

export default function Settings() {
    const [currentMenu, setCurrentMenu] = useState(0);

    const settingMenu = [
        { title: "My Profile", comp: <MyProfile /> },
        { title: "Referral", comp: <Referral /> },
        { title: "Account Settings", comp: <AccountSettings /> },
    ];

    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4.5">
                <div className="col-span-1 lg:col-span-2 xl:col-span-1 bg-cs-background-secondary rounded-md  px-4.5 py-6 lg:min-h-screen shadow-sm">
                    <div className="flex lg:flex-col gap-3.5 text-sm">
                        {settingMenu.map((menu, index) => (
                            <div
                                key={index}
                                className={`${
                                    currentMenu === index
                                        ? "bg-blue-100 text-cs-icon-primary"
                                        : ""
                                } px-2.5 py-1.5 rounded-sm cursor-pointer`}
                                onClick={() => {
                                    setCurrentMenu(index);
                                }}
                            >
                                {menu.title}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-span-1 lg:col-span-3 xl:col-span-4 bg-cs-background-secondary rounded-md  px-4.5 py-6 min-h-screen  shadow-sm">
                    {settingMenu[currentMenu].comp}
                </div>
            </div>
        </div>
    );
}
