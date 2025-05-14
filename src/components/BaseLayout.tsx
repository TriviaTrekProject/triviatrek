import { Outlet } from "react-router-dom";
import useIsMobile from "../hook/useIsMobile.ts";

export default function BaseLayout() {

    const isMobile = useIsMobile();

    return (<div className={ "flex flex-col w-screen p-4 min-h-screen bg-primary justify-center items-center"}>

        <div className={`flex h-full z-50 justify-center items-center ${isMobile ? 'w-full' : 'w-10/12'}`}>
            {/* ici header / nav */}
            <Outlet />
            {/* ici footer */}
        </div>
            <div className="flex h-full w-full absolute blur-3xl z-1">
                <div className="flex w-full h-full bg-gradient-to-br from-primary to-secondary rounded-2xl z-50"/>
            </div>

        </div>
    );
}
