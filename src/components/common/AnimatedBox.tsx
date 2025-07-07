import { useRef } from 'react';
import gsap from 'gsap';
import {useGSAP} from "@gsap/react";

const AnimatedBox: React.FC = () => {
    const boxRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (boxRef.current) {
            // À la monture du composant, anime la boîte sur l’axe X,
            // fait une rotation à 360°, et toute l’animation dure 2 secondes.
            gsap.to(boxRef.current, {
                x: 200,
                rotation: 360,
                duration: 2,
                ease: 'power2.out',
            });
        }
    }, []);

    return (
        <div
            ref={boxRef}
            style={{
                width: 100,
                height: 100,
                backgroundColor: 'crimson',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
            }}
        >
            Hello
        </div>
    );
};

export default AnimatedBox;