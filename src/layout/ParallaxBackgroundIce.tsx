import {motion} from "motion/react";
import Hill1Bg from "../components/common/background/Hill1Bg.tsx";
import Hill2Bg from "../components/common/background/Hill2Bg.tsx";
import SnowBg from "../components/common/background/SnowBg.tsx";
import React from "react";
import IceMountainBg from "../components/common/background/IceMountainBg.tsx";
import useIsMobile from "../hook/useIsMobile.ts";

const MotionHill1Bg = motion.create(Hill1Bg);
const MotionHill2Bg = motion.create(Hill2Bg);
const MotionSnowBg = motion.create(SnowBg);
// const MotionGivreBg = motion.create(GivreBg);
const MotionIceMoutainBg= motion.create(IceMountainBg);

const ParallaxBackgroundIce = () => {

    const isMobile = useIsMobile();

    return(
        <div className={"top-0 w-full h-full absolute z-40 pointer-events-auto w-auto overflow-hidden flex"}>

            <div className={"bg-radial-[at_50%_50%] from-transparent to-sky-200 to-95% w-full h-full absolute z-50 pointer-events-auto "}/>


            <MotionIceMoutainBg                 initial={{ y: -1000 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 250,   // rigidité du ressort
                                                    damping: 15,      // amortissement
                                                    bounce: 0.5       // rebond (0 = sans rebond, 1 = très rebondissant)
                                                }}
                                                className={`absolute ${isMobile ? "w-auto h-dvh" : "h-auto w-dvw" }`}/>

            <MotionHill1Bg
                initial={{ x:1400 }}
                animate={{ x:800 }}
                transition={{
                    duration: 7,
                    delay:1

                }}
                className="absolute right-0 -bottom-70 w-auto h-dvg"/>



            <MotionHill2Bg
                initial={{ x:-1500 }}
                animate={{ x:-500 }}
                transition={{
                    duration: 7,
                    delay:1
                }}

                className="absolute -left-20 -bottom-85 w-auto h-dvh"/>

            <MotionSnowBg
                initial={{ y: -1000, opacity: 0.3 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                    delay: 0,
                    duration: 8
                }}

                className="absolute -left-20 top-0 w-auto h-dvh"/>






        </div>

    )
}
export default React.memo(ParallaxBackgroundIce);
