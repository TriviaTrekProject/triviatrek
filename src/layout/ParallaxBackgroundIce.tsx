import {motion} from "motion/react";
import Hill1Bg from "../components/common/background/Hill1Bg.tsx";
import Hill2Bg from "../components/common/background/Hill2Bg.tsx";
import Hill3Bg from "../components/common/background/Hill3Bg.tsx";
import SkyIceBg from "../components/common/background/SkyIceBg.tsx";
import SnowBg from "../components/common/background/SnowBg.tsx";
import IceIcon from "../components/common/Icons/IceIcon.tsx";
import React from "react";

const MotionHill1Bg = motion.create(Hill1Bg);
const MotionHill2Bg = motion.create(Hill2Bg);
const MotionHill3Bg = motion.create(Hill3Bg);
const MotionSkyIceBg = motion.create(SkyIceBg);
const MotionSnowBg = motion.create(SnowBg);

const ParallaxBackgroundIce = () => {


    return(
        <div className={"top-0 w-full h-full absolute z-40 bg-cyan-500/80 pointer-events-auto w-auto left-0 overflow-hidden flex "}>

            <div className={"absolute w-full h-full justify-center items-center z-50 font-[Nova_Square] tracking-wider text-7xl font-bold text-shadow-lg text-blue-500 flex flex-row gap-4"}> <div className={"bg-[#ffffffb3] flex flex-row justify-center items-center rounded-2xl"}><IceIcon className={"h-24 w-auto"}/><div> Gelé ! </div><IceIcon className={"h-24 w-auto"}/></div></div>
            <MotionSkyIceBg
                initial={{ y: 500, opacity: 0.5 }}
                animate={{ y: 0, opacity: 1 }}
                className="absolute -left-25 w-auto h-full"/>


            <MotionHill1Bg
                initial={{ x:400 }}
                animate={{ x:100 }}
                transition={{
                    duration: 7,
                    delay: 1,

                }}
                className="absolute right-0 -bottom-20 w-auto h-full"/>

            <MotionHill2Bg
                initial={{ x:-500 }}
                animate={{ x:0 }}
                transition={{
                    duration: 7
                }}

                className="absolute -left-20 -bottom-20 w-auto h-full"/>

            <MotionHill3Bg
                initial={{ x:250 }}
                animate={{ x:100 }}
                transition={{
                    duration: 5,
                    delay: 1,

                }}                className="absolute right-0 -bottom-20 w-auto h-full"/>
            <MotionSnowBg
                initial={{ y: -1000, opacity: 0.3 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                    delay: 1,
                    duration: 8
                }}

                className="absolute -left-20 top-0 w-auto h-full"/>





        </div>

    )
}
export default React.memo(ParallaxBackgroundIce);
