import { Outlet } from "react-router-dom";

export default function BaseLayout() {
    return (<div className={ "flex flex-col w-full min-h-screen bg-secondary"}>

        <div className={"flex h-full w-full z-50"}>
            {/* ici header / nav si besoin */}
            <Outlet />
            {/* ici footer si besoin */}
        </div>
            <div className="flex h-full w-full absolute blur-3xl z-1">
                <div className="flex bg-gradient-to-br w-full h-full from-orange-600 to-orange-200 z-50"/>
            </div>

        </div>
    );
}
