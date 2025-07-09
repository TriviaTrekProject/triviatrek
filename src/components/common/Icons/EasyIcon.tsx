const EasyIcon = ({className}: {className?: string}) => {

    return (<svg className={className} width="100" height="20" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="easyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#A5D6A7"/>
                <stop offset="100%" stop-color="#66BB6A"/>
            </linearGradient>
        </defs>
        <rect x="0" y="5" width="20" height="10" rx="3" ry="3" fill="url(#easyGradient)"/>
        <rect x="25" y="5" width="20" height="10" rx="3" ry="3" fill="#eee"/>
        <rect x="50" y="5" width="20" height="10" rx="3" ry="3" fill="#eee"/>
    </svg>)
}

export default EasyIcon;