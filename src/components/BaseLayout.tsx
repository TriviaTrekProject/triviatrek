import { Outlet } from "react-router-dom";
import ParallaxBackground from "../layout/ParallaxBackground.tsx";
import useIsMobile from "../hook/useIsMobile.ts";

export default function BaseLayout({disableParallax}:{disableParallax?:boolean}) {

    const isMobile = useIsMobile()
    return (<div className={ "flex flex-col w-screen p-4 min-h-screen justify-center items-center"}>

        <div className={`flex h-full z-50 justify-center items-center w-full ${isMobile ? "p-2" : "p-12"}`}>
            <ParallaxBackground disableAnimation={disableParallax} />

            {/* ici header / nav */}
            <Outlet />
            {/* ici footer */}
        </div>
        </div>
    );
}
