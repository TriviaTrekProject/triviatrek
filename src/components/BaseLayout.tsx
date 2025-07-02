import { Outlet } from "react-router-dom";

export default function BaseLayout() {


    return (<div className={ "flex flex-col w-screen p-4 min-h-screen bg-primary-dark justify-center items-center"}>

        <div className={`flex h-full z-50 justify-center items-center w-full p-12`}>
            {/* ici header / nav */}
            <Outlet />
            {/* ici footer */}
        </div>
        </div>
    );
}
