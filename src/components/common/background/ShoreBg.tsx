import {RefObject} from "react";

const ShoreBg = ({ref, className}: {ref:RefObject<SVGSVGElement>, className: string}) => {



    return (
        <svg ref={ref} className={className + " shore"} xmlns="http://www.w3.org/2000/svg" version="1.2" viewBox="0 0 2428 970">
            <defs>
                <clipPath clipPathUnits="userSpaceOnUse" id="shore-cp1">
                    <path d="m2425.88 969.85h-2425.88v-970.35h2425.88z"/>
                </clipPath>
                <linearGradient id="shore-P" gradientUnits="userSpaceOnUse"/>
                <radialGradient id="shore-g1" cx="0" cy="0" r="1" href="#shore-P"
                                gradientTransform="matrix(859.87,0,0,859.87,1213.257,942.416)">
                    <stop stop-color="#7d6aab"/>
                    <stop offset="1" stop-color="#644a82"/>
                </radialGradient>
                <linearGradient id="shore-g2" x2="1" href="#shore-P" gradientTransform="matrix(2428.357,0,0,54.873,-2.474,914.979)">
                    <stop stop-color="#d4dfff"/>
                    <stop offset="1" stop-color="#c4c0ed"/>
                </linearGradient>
                <linearGradient id="shore-g3" x2="1" href="#shore-P"
                                gradientTransform="matrix(0,-73.674,2431.727,0,1212.27,935.891)">
                    <stop offset=".01" stop-color="#ff4a00"/>
                    <stop offset="1"/>
                </linearGradient>
                <style type="text/css">{`.shore{.a{fill:url(#shore-g1)}.b{mix-blend-mode:multiply;fill:url(#shore-g2)}.c{opacity:.6;mix-blend-mode:screen;fill:url(#shore-g3)}.d{fill:#c25f85}.e{mix-blend-mode:multiply;fill:#c9a9c5}.f{fill:#f193b7}.g{fill:#f1b6b2}}`}</style>

            </defs>
            <g clip-path="url(#shore-cp1)">
                <path className="a"
                      d="m2429 927.9l-3.1 42h-2425.9l-1.9-42.5-0.6-12.4c62.5 3.3 113.6 6 160.6 8.5 115.2 5.9 206.2 9.7 382.3 13.3 93.6 2 185.5 1.4 274.3-0.3q0 0 0 0c190.2-3.5 365.8-12.3 511-13.1 102.8-0.6 193.8 3.2 289.9 5.7 103 2.6 211.9 3.7 347.5-3.8 123.6-6.9 233.3-6.8 315.2-4.7 90.7 2.3 147.3 7 150.5 7.3q0.2 0 0.2 0z"/>
                <path className="b"
                      d="m2425.9 935.9v34h-70.8c0 0-734.6-20.7-949.5-20.3-214.8 0.3-799.1-4-936.5-6.8-137.4-2.9-470-6.9-470-6.9l-1-8.5-0.6-12.4c215.7 11.3 294.8 16.8 542.9 21.8 294 6.1 572.3-12.2 785.3-13.4 213-1.2 375.2 16.5 637.4 1.9 260.5-14.6 456.6 10.1 462.8 10.6z"/>
                <path className="c"
                      d="m-1.3 878.5c0 0 281.7 38.1 557.9 49.4 276.3 11.2 652.1-11.6 803.4-7 151.3 4.6 460.7 14.5 598.3 9.3 137.6-5.3 467.6 5.7 467.6 5.7l3.3-18.8c0 0-121.3 2.7-230.8 1.1-111-1.6-233.4-10.6-291.7-1.7-58.2 8.9-224.4 14.2-256.2 8.8-31.8-5.5-119.8-12.1-208.3-10.4-88.6 1.6-118 4.3-145 2.5-26.9-1.8-187.3-8.5-318.3-5.6-131.1 2.9-342.7-3.5-507.4-9.1-164.6-5.6-474-40.5-474-40.5z"/>
                <path className="d"
                      d="m-2.5 915c0 0 240.2 10.9 332.8 17 104.6 6.9 200.2 8.1 280.2 3.5 80.1-4.6 355.7 1.2 417.2 1.7 61.5 0.5 169.1-14 169.1-14 0 0-477.8 14-720.6 0-256.8-14.8-478.7-8.2-478.7-8.2z"/>
                <path className="e"
                      d="m814.7 936.5c-2.3 0.3-135.3 12.3-303.4 13.1-167 0.7-347.6-25.3-353.2-26.1 115.2 5.9 206.2 9.7 382.3 13.3 93.6 2 185.5 1.4 274.3-0.3z"/>
                <path className="e"
                      d="m2297.7 933.9c0 0-330.3 25.8-499.4 15.7-84.8-5.1-144.4-13.5-182.7-20.5 103 2.6 218.2 12.3 353.8 4.8 123.6-6.9 214.5-5.1 296.4-3z"/>
                <path className="d"
                      d="m2425.9 935.9c0 0-58.4-20.9-156.1-22.4-45.2-0.7-142.2 3.7-193.6 6.2-51.4 2.4-111.9-0.2-131.6 2.2-19.7 2.5-25.1 3.8-25.1 3.8h-22.4-39.8l-165.9 4.1c0 0 141.4 7.1 347.8 1.9 206.5-5.3 386.7 4.2 386.7 4.2z"/>
                <path className="f"
                      d="m1725.6 931c0 0 100.5 0.8 160.4 0.6 59.9-0.3 160.5-0.1 160.5-0.1 0 0-69.7 8.3-132.3 7.3-62.6-1.1-188.6-7.8-188.6-7.8z"/>
                <path className="g"
                      d="m262.2 928c0 0 125.1 9.1 189.4 9.5 64.3 0.4 122.3-1.6 172.3-2.6 0 0-83.8-4.2-180.6-4-96.8 0.1-181.1-2.9-181.1-2.9z"/>
            </g>
        </svg>
    )
}
export default ShoreBg;


