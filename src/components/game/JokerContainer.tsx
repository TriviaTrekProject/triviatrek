import {ReactNode, useState} from "react";
import useIsMobile from "../../hook/useIsMobile.ts";

const JokerContainer = ({handleSendJoker, children, label, className}: {handleSendJoker : () => void, children : ReactNode, label?:string, className?:string}) => {

    const [isDisabled, setIsDisabled] = useState(false);
    const isMobile = useIsMobile();
    return(
    <div className={`border border-white/30 rounded-xl backdrop-blur-sm shadow-lg ${isDisabled ? 'bg-stone-500/40 pointer-events-none' : 'bg-white/5 hover:bg-white/10'}`}>
        <button disabled={isDisabled} className={`p-4 flex flex-col gap-2 ${className}`} onClick={()=> {
            handleSendJoker();
            setIsDisabled(true)
        }}>
            {children}
            {label &&  <div className={`font-bold font-[Nova_Square] ${isMobile ? "text-xs" : ""}`}>
                {label}
            </div>}
        </button>
    </div>)

}

export default JokerContainer;