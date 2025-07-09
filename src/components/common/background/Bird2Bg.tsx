import {RefObject} from "react";

const Bird2Bg = ({ref, className}: {ref:RefObject<SVGSVGElement>, className: string}) => {

    return (
        <svg ref={ref} className={className + " bird2"} xmlns="http://www.w3.org/2000/svg" version="1.2" viewBox="0 0 2428 970">
            <defs>
                <clipPath clipPathUnits="userSpaceOnUse" id="bird2-cp1">
                    <path d="m2425.88 969.85h-2425.88v-970.35h2425.88z"/>
                </clipPath>
            </defs>
            <style>{`.bird2{.a{fill:#9993bd}}`}</style>
            <g clip-path="url(#bird2-cp1)">
                <path className="a" d="m1492.7 345.5l14.4 16.1h5.2l10.2-10.9-10.5 6.3z"/>
                <path className="a" d="m1381 354.6l7 8h3.2l12.6-11.2-16.7 8.1z"/>
                <path className="a" d="m1470.3 323.3l12.3 6.4 5.3-14.2-8.8 11.2z"/>
                <path className="a" d="m1512.3 361.6h9.8v-2.8l-11.7 1.4z"/>
                <path className="a" d="m1377.2 407.4l-14.4 16.1h-5.2l-10.2-10.9 11.3 5.9z"/>
                <path className="a" d="m1357.6 423.5h-9.8v-2.8l11.7 1.4z"/>
                <path className="a" d="m1480.8 328.8l2 3.1 2.4-1.5-3.2-1.6z"/>
                <path className="a" d="m1337.5 362.2l-13.7 7.1-6-15.8 9.8 12.4z"/>
                <path className="a" d="m1325.7 368.3l-2.2 3.5-2.7-1.8 3.6-1.7z"/>
                <path className="a" d="m1388.3 361.6l1.9 2.8h2.2l-1.2-1.8z"/>
                <path className="a" d="m1417.8 347.7l21.4-2.7-3.9 2.7-10.7 10-2.2-8.1h-5.9z"/>
            </g>
        </svg>)
}
export default Bird2Bg;


