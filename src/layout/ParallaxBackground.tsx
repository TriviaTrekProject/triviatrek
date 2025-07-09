import {  motion } from "motion/react";
import {useTransform} from "framer-motion";
import {MotionValue} from "motion";
import SkyBg from "../components/common/background/SkyBg.tsx";
import ShoreBg from "../components/common/background/ShoreBg.tsx";
import RockBg from "../components/common/background/RockBg.tsx";
import ShipBg from "../components/common/background/ShipBg.tsx";
import SeaBg from "../components/common/background/SeaBg.tsx";
import Bird1Bg from "../components/common/background/Bird1Bg.tsx";
import Bird2Bg from "../components/common/background/Bird2Bg.tsx";



function useParallaxValue(
    value: MotionValue<number>,
    distance: number
) {
    // transforme [-1,1] en [-distance, distance]
    return useTransform(value, [-1, 1], [-distance, distance]);
}



const ParallaxBackground = ({pointerX, pointerY}:{pointerX: MotionValue<number>, pointerY: MotionValue<number>}) => {

    // somme normalisée de X et Y
    const pointerSum = useTransform(
        [pointerX, pointerY],
        ([x, y]: number[]) => x + y
    );


    const x = useParallaxValue(pointerSum, Math.random()*200);
    const xForeground2 = useParallaxValue(pointerSum, Math.random()*50);

    const xBackground = useParallaxValue(pointerSum, Math.random()*-30);

    const MotionSkyBg = motion.create(SkyBg);
    const MotionShoreBg = motion.create(ShoreBg);
    const MotionSeaBg = motion.create(SeaBg);
    const MotionRockBg = motion.create(RockBg);
    const MotionShipBg = motion.create(ShipBg);
    const MotionBird1Bg = motion.create(Bird1Bg);
    const MotionBird2Bg = motion.create(Bird2Bg);
    return (
        <div
            className="fixed w-full h-full overflow-hidden -z-1"

        >
            <MotionSkyBg className="absolute h-full w-auto" />
            <MotionRockBg style={{
                x: xBackground,
                willChange: "transform",

            }} className="absolute h-full w-auto" />

                <MotionSeaBg style={{
                    x:xBackground,
                    willChange: "transform",



                }} className="absolute h-full w-auto" />
                <MotionBird1Bg style={{
                    x:xForeground2,
                    willChange: "transform",



                }} className="absolute h-full w-auto [transform-box:fill-box] origin-[500px_280px] transform scale-x-[-1]

"

                />

                <MotionBird2Bg style={{
                    x: xBackground,
                    willChange: "transform",

                }} className="absolute h-full w-auto" />

                <MotionShipBg style={{
                    x,
                    willChange: "transform",

                }} className="absolute h-full w-auto [transform-box:fill-box] origin-[50%_50%]" />
            <MotionShoreBg className="absolute h-full w-auto" />
        </div>
    );
};


export default ParallaxBackground;
