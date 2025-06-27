import React from "react";

export default function MyProfile() {
    return (
        <div>
            <h2 className="text-2xl text-cs-foreground-primary font-medium">
                My Profile
            </h2>
            <div className="flex mt-6.5 gap-3.5 items-center">
                <img src="https://placehold.co/400" alt="" className="rounded-full xl:size-20"/>
                <div className="flex flex-col gap-0.5">
                  <span className="text-lg font-medium">Adesh Singh</span>
                  <span className="text-sm text-cs-foreground-secondary font-medium">Admin</span>
                </div>
            </div>
        </div>
    );
}
