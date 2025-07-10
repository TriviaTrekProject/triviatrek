const HardIcon = ({className}: {className?: string}) => {

    return (<svg className={className} width="70" height="20" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="hardGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#EF5350" />
                    <stop offset="100%" stop-color="#C62828" />
                </linearGradient>
            </defs>
            <rect x="0" y="5" width="20" height="10" rx="3" ry="3" fill="url(#hardGradient)" />
            <rect x="25" y="5" width="20" height="10" rx="3" ry="3" fill="url(#hardGradient)" />
            <rect x="50" y="5" width="20" height="10" rx="3" ry="3" fill="url(#hardGradient)" />
        </svg>

    )
}

export default HardIcon;