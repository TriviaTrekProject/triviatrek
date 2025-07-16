import {ReactNode, useState} from "react";

const JokerContainer = ({handleSendJoker, children}: {handleSendJoker : () => void, children : ReactNode}) => {

    const [isDisabled, setIsDisabled] = useState(false);
    return(
    <div className={`border border-white/30 rounded-xl backdrop-blur-sm shadow-lg ${isDisabled ? 'bg-stone-500/40 pointer-events-none' : 'bg-white/5 hover:bg-white/10'}`}>
        <button disabled={isDisabled} className={"p-4 flex flex-col gap-2"} onClick={()=> {
            handleSendJoker();
            setIsDisabled(true)
        }}>
            {children}
            <div className={"font-bold font-[Nova_Square]"}>
                Bloc de glace
            </div>
        </button>
    </div>)

}

export default JokerContainer;