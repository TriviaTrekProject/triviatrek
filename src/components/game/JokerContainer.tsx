import IceIcon from "../common/Icons/IceIcon.tsx";

const JokerContainer = ({handleSendJoker}: {handleSendJoker : () => void}) => {

    return(
    <div className={"border border-white/30 rounded-xl bg-white/5 backdrop-blur-sm shadow-lg"}>
        <button className={"p-4 flex flex-col gap-2 hover:bg-white/10"} onClick={handleSendJoker}>
            <IceIcon/>
            <div className={"font-bold font-[Nova_Square]"}>
                Bloc de glace
            </div>
        </button>
    </div>)

}

export default JokerContainer;