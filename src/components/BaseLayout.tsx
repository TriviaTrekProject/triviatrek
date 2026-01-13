import { Outlet } from "react-router-dom";
import OptimizedParallaxBackground from "../layout/ParallaxBackground.tsx";
import {usePerformanceMode} from "../hook/usePerformanceMode.ts";

export default function BaseLayout({disableParallax}:{disableParallax?:boolean}) {
    const { quality, isMobile } = usePerformanceMode();

    return (<div className={ "flex flex-col w-screen p-4 h-dvh justify-center items-center"}>

        <div className={`flex z-50 justify-center items-center w-full ${isMobile ? "p-2 h-dvh" : "p-12 h-full"}`}>
            <OptimizedParallaxBackground
                disableAnimation={disableParallax || (isMobile && quality === 'low')}
                quality={quality}
            />

            <Outlet />
        </div>
        </div>
    );
}
