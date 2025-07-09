import {RefObject} from "react";

const Bird1Bg = ({ref, className}: {ref:RefObject<SVGSVGElement>, className: string}) => {

    return (
        <svg
            style={{
                transform: "rotate(180deg)",
                transformBox: "fill-box",
                transformOrigin: "522px,267px",
            }}
            ref={ref} className={className + " bird1"} xmlns="http://www.w3.org/2000/svg" version="1.2" viewBox="0 0 2428 970"><defs><clipPath clipPathUnits="userSpaceOnUse" id="bird-cp1"><path d="m2425.88 969.85h-2425.88v-970.35h2425.88z"/></clipPath></defs><style>{`.bird1{.a{fill:#4f5784}.b{fill:#8e81c5}}`}</style><g clip-path="url(#bird-cp1)"><path className="a" d="m522.4 267.4l35.9-36.5h46.2l-44.3 6.1-22.5 29.8-2.5 14.1-12.9-2.5-55.1 8-26.9 19 28.1-25.7z"/><path className="b" d="m604.5 301.7l7.9-9.8 25.2 4.9 20.9-7.9 10.3 6.4-10.1-2.7-17.5 6.9-2.3 3.7-3.7-3.9-20.8-3.2z"/><path className="a" d="m689.3 211l29 26 5.4 21.4-5.4-21.4 23.2-31.5-9.5 31.5-2.9 19.2-4.1 11.2-5.4-10.8-5.7-17.8z"/></g></svg>    )
}
export default Bird1Bg;


