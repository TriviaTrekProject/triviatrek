import { Outlet } from "react-router-dom";
import ParallaxBackground from "../layout/ParallaxBackground.tsx";
import React from "react";
import {useMotionValue} from "motion/react";

export default function BaseLayout() {

    const pointerX = useMotionValue(0);
    const pointerY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const nx = (e.clientX / window.innerWidth - 0.5) * 2;
        const ny = (e.clientY / window.innerHeight - 0.5) * 2;
        pointerX.set(nx);
        pointerY.set(ny);
    };


    return (<div onMouseMove={handleMouseMove} className={ "flex flex-col w-screen p-4 min-h-screen justify-center items-center"}>

        <div className={`flex h-full z-50 justify-center items-center w-full p-12`}>
            <ParallaxBackground pointerX={pointerX} pointerY={pointerY} />

            {/* ici header / nav */}
            <Outlet />
            {/* ici footer */}
        </div>
        </div>
    );
}
