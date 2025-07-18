const MediumIcon = ({className}: {className?: string}) => {

    return (<svg className={className} viewBox="0 0 100 20" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
            <defs>
                <linearGradient id="mediumGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#FFD54F" />
                    <stop offset="100%" stop-color="#FFA000" />
                </linearGradient>
            </defs>
            <rect x="0" y="5" width="20" height="10" rx="3" ry="3" fill="url(#mediumGradient)" />
            <rect x="25" y="5" width="20" height="10" rx="3" ry="3" fill="url(#mediumGradient)" />
            <rect x="50" y="5" width="20" height="10" rx="3" ry="3" fill="#eee" />
        </svg>

    )
}

export default MediumIcon;