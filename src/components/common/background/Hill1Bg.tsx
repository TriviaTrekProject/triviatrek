import {RefObject} from "react";

const Hill1Bg = ({ref, className}: {ref:RefObject<SVGSVGElement>, className: string}) => {

    return (
        <svg className={className} ref={ref} xmlns="http://www.w3.org/2000/svg" version="1.2" viewBox="0 0 2469 995">
            <defs>
                <clipPath clipPathUnits="userSpaceOnUse" id="hill1-cp1">
                    <path d="m2468.88 970.35h-2425.88v-970.35h2425.88z"/>
                </clipPath>
            </defs>
            <style type="text/css">{`.hill1-a{fill:#f3f6f8}.hill1-b{opacity:.8;mix-blend-mode:multiply;fill:#ebfbff}`}</style>
            <g clipPath="url(#hill1-cp1)">
                <path className="hill1-a"
                      d="m2468.9 658.8c0 0-216.4-223.1-650.5-223.4-482.6-0.4-1810.9 294.8-1810.9 294.8l-7.3 264.4 2468.7-9.7z"/>
                <path className="hill1-b"
                      d="m1276 553.7c0 0 170.5-72.3 268.7-100.1 0 0 297.2-35.7 491.6 0 0 0-132.4 39.2-231.7 133.8z"/>
                <path className="hill1-b"
                      d="m1831.3 617c0 0 127.2-120.5 241.9-153.8 0 0 122.2 29 191 63.6 0 0-77.7 49.1-138.4 116z"/>
            </g>
        </svg>
    )
}
export default Hill1Bg;


