import {RefObject} from "react";

const Hill2Bg = ({ref, className}: {ref:RefObject<SVGSVGElement>, className: string}) => {

    return (
        <svg
            className={className}
            ref={ref}
            xmlns="http://www.w3.org/2000/svg"
            version="1.2"
            viewBox="0 0 2439 983"
        >
            <defs>
                <clipPath id="hill2Clip" clipPathUnits="userSpaceOnUse">
                    <path d="m2425.88 970.35h-2425.88v-970.35h2425.88z" />
                </clipPath>
                <linearGradient id="hill2P" gradientUnits="userSpaceOnUse" />
                <linearGradient
                    id="hill2Gradient"
                    x2="1"
                    href="#hill2P"
                    gradientTransform="matrix(0,627.052,-2438.863,0,1300.042,355.43)"
                >
                    <stop stopColor="#efedff" />
                    <stop offset="1" stopColor="#fff" />
                </linearGradient>
            </defs>
            <style>{`
        .hill2-a { fill: url(#hill2Gradient); }
        .hill2-b { mix-blend-mode: soft-light; fill: #fff; }
        .hill2-c { opacity: .5; mix-blend-mode: multiply; fill: #acd3f7; }
      `}</style>
            <g clipPath="url(#hill2Clip)">
                <path
                    className="hill2-a"
                    d="m0 977.6v-622.2c0 0 617 30.3 2434 508.2l4.9 118.9z"
                />
                <path
                    className="hill2-b"
                    d="m0 355.4c0 0 75.7 75.7 108.8 129.8l511.1 19.4c0 0-39.6-46.1-84.7-69.7 0 0-219.9-41.7-291.6-51.7-60.7-8.4-243.6-27.8-243.6-27.8z"
                />
                <path
                    className="hill2-b"
                    d="m628.4 453.6c0 0 143.2 51 215.7 132.3l273 3.5c0 0-88-48.7-192.9-71.5z"
                />
                <path
                    className="hill2-b"
                    d="m1117.1 589.4c0 0-40.8-29.2-154.1-62.6l36.2 8.4c0 0 187.6 33.1 243.4 58.3z"
                />
                <path
                    className="hill2-b"
                    d="m553.3 438.5c0 0 100.9 42.2 165.9 142.8l110.9 2.7c0 0-98.7-93-215.9-133.3z"
                />
                <path className="hill2-b" d="m108.8 485.2l241.1 13h7.1l262.9 6.4z" />
                <path
                    className="hill2-c"
                    d="m452.9 435.4c0 0 92.7 38.6 210.7 49.8 118.1 11.2 135.5 9.7 135.5 9.7 0 0-197.4-58.9-346.2-59.5z"
                />
            </g>
        </svg>

    )
}
export default Hill2Bg;


