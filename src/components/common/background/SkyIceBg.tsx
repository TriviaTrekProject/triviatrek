import {RefObject} from "react";

const SkyIceBg = ({ref, className}: {ref:RefObject<SVGSVGElement>, className: string}) => {

    return (
        <svg ref={ref} className={className} xmlns="http://www.w3.org/2000/svg" version="1.2" viewBox="0 0 2511 978" width="2511" height="978">
            <defs>
                <clipPath clipPathUnits="userSpaceOnUse" id="skyice-cp1">
                    <path d="m2510.88 970.35h-2425.88v-970.35h2425.88z"/>
                </clipPath>
                <linearGradient id="skyice-P" gradientUnits="userSpaceOnUse"/>
                <linearGradient id="skyice-g1" x2="1" href="#skyice-P"
                                gradientTransform="matrix(0,-977.631,2425.882,0,1100.949,977.631)">
                    <stop stopColor="#d3ffe2"/>
                    <stop offset=".99" stop-color="#6375d0"/>
                </linearGradient>
            </defs>
            <style>{`.skyice-a{fill:url(#skyice-g1)}.skyice-b{opacity:.4;mix-blend-mode:screen;fill:#fffbff}`}</style>
            <g clipPath="url(#skyice-cp1)">
                <path className="skyice-a" d="m2510.9 977.6h-2425.9v-977.6h2425.9z"/>
                <path className="skyice-b" d="m0.9 441.5c0 0 1613.6-118.4 2162.6-103.6l-145.4 17.5h492.8v113l-1847.7 7.1z"/>
            </g>
        </svg>


    )
}
export default SkyIceBg;


