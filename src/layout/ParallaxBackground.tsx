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
    const pointerSum = useTransform<[number, number], number>(
        [pointerX, pointerY],
        ([x, y]) => x + y
    );


    const x = useParallaxValue(pointerSum, Math.random()*400);





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

            <MotionSkyBg className="absolute min-w-max h-auto" />
            <MotionRockBg className="absolute min-w-max h-auto" />

                <MotionSeaBg className="absolute min-w-max h-auto" />
                <MotionBird1Bg className="absolute min-w-max h-auto" />
                <MotionBird2Bg className="absolute min-w-max h-auto" />

                <MotionShipBg style={{
                    x,
                    willChange: "transform",
                }} className="absolute min-w-max h-auto" />
            <MotionShoreBg className="absolute min-w-max h-auto" />
        </div>
    );
};


export default ParallaxBackground;
