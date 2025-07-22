import {QuizGameDTO} from "../../model/QuizGameDTO.ts";
import QuizIcon from "../common/Icons/QuizIcon.tsx";
import EasyIcon from "../common/Icons/EasyIcon.tsx";
import MediumIcon from "../common/Icons/MediumIcon.tsx";
import HardIcon from "../common/Icons/HardIcon.tsx";
import JokerContainer from "./JokerContainer.tsx";
import useIsMobile from "../../hook/useIsMobile.ts";
import IceIcon from "../common/Icons/IceIcon.tsx";
import MovieIcon from "../common/Icons/category/MovieIcon.tsx";
import HistoireIcon from "../common/Icons/category/HistoireIcon.tsx";
import PlayerIcon from "../common/Icons/PlayerIcon.tsx";
import MusiqueIcon from "../common/Icons/category/MusiqueIcon.tsx";
import CultureIcon from "../common/Icons/category/CultureIcon.tsx";
import ScienceIcon from "../common/Icons/category/ScienceIcon.tsx";
import PopIcon from "../common/Icons/category/PopIcon.tsx";
import GeographieIcon from "../common/Icons/category/GeographieIcon.tsx";
import LitteratureIcon from "../common/Icons/category/LitteratureIcon.tsx";
import LogiqueIcon from "../common/Icons/category/LogiqueIcon.tsx";
import SportIcon from "../common/Icons/category/SportIcon.tsx";
import {useState} from "react";
import {AnimatePresence, motion} from "motion/react";
import JokerIcon from "../common/Icons/JokerIcon.tsx";
import ProgressPie from "../common/ProgressPie.tsx";
import PirateBg from "../common/background/PirateBg.tsx";


interface QuizGameComponentProps {
    idRoom: string | undefined,
    quizGame: QuizGameDTO | null,
    messageSystem?: string,
    username: string,
    currentParticipantId: string | null,
    handleSendJoker: () => void,
    usedJokerGlace: boolean,
}


const QuizGameHeader = ({idRoom, quizGame, messageSystem, handleSendJoker, usedJokerGlace}: QuizGameComponentProps) => {

    const isMobile = useIsMobile()
    const [isJokerDrawerOpen, setIsJokerDrawerOpen] = useState(false);

    const MotionPirateBg = motion.create(PirateBg);


    const getCategoryIcon = (category: string) => {
        console.log(category);
        switch (category) {
            case "CINEMA_TELEVISION": return <MovieIcon className="w-6 h-6" />
            case "HISTOIRE": return <HistoireIcon className="w-6 h-6" />
            case "MUSIQUE": return <MusiqueIcon className="w-6 h-6" />
            case "POP_CULTURE": return <PopIcon className="w-6 h-6"/>
            case "CULTURE_GENERALE": return <CultureIcon className="w-6 h-6"/>
            case "SCIENCE": return <ScienceIcon className="w-6 h-6"/>
            case "GEOGRAPHIE": return <GeographieIcon className="w-6 h-6" />
            case "LITTERATURE": return <LitteratureIcon className="w-6 h-6" />
            case "LOGIQUE": return <LogiqueIcon className="w-6 h-6" />
            case "SPORT": return <SportIcon className="w-6 h-6" />
            default: return <PlayerIcon className={"w-6 h-6"} />

        }

    }

    if(isMobile) return (

        <>
            {idRoom && quizGame && !quizGame.finished && (<>

                    {/* Bouton d’ouverture du drawer */}
                    <motion.button
                        type="button"
                        className="fixed top-4 left-4 z-35 p-2 bg-white/20 backdrop-blur-sm rounded-full"
                        onClick={() => setIsJokerDrawerOpen(true)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <JokerIcon className="w-8 h-8 fill-secondary-darker" />
                    </motion.button>

                    {/* Drawer des jokers avec animation */}
                    <AnimatePresence>
                        {isJokerDrawerOpen && (
                            <motion.div
                                className="fixed inset-0 z-40 flex bg-black/30"
                                onClick={() => setIsJokerDrawerOpen(false)}
                            >

                                <motion.div
                                    className="flex relative justify-center items-center h-50 w-full rounded-r-2xl border-solid overflow-hidden border-white/30 rounded-xl backdrop-blur-sm shadow-lg"
                                    initial={{ x: -400 }}
                                    animate={{ x: 0 }}
                                    exit={{ x: -400 }}
                                    transition={{ type: "tween", duration: 0.3 }}
                                    onClick={e => e.stopPropagation()}
                                >
                                    <MotionPirateBg className={"absolute h-full w-auto overflow-hidden"} />

                                    <div className="flex flex-row gap-4 h-full justify-center items-center">

                                        <JokerContainer className={"flex h-full basis-1/3 justify-center items-center bg-secondary-dark backdrop-blur-lg aspect-square shadow-lg shadow-amber-700/50 border-white/30 !p-2 "} label={"Bloc de glace"} handleSendJoker={handleSendJoker}>
                                            <IceIcon />
                                        </JokerContainer>
                                        <JokerContainer className={"flex h-full basis-1/3 justify-center items-center bg-secondary-dark backdrop-blur-lg aspect-square shadow-lg shadow-amber-700/50 !p-2"} label={"Bloc de glace"} handleSendJoker={handleSendJoker}>
                                            <IceIcon />
                                        </JokerContainer>
                                        <JokerContainer className={"flex h-full basis-1/3 justify-center items-center bg-secondary-dark backdrop-blur-lg aspect-square shadow-lg shadow-amber-700/50 !p-2"} label={"Bloc de glace"} handleSendJoker={handleSendJoker}>
                                            <IceIcon />
                                        </JokerContainer>

                                    </div>
                                </motion.div>
                                <motion.div
                                    className="flex-1"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.5 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>



                    <div className={`flex flex-row justify-between items-center w-full gap-2 bg-primary/50 backdrop-blur-sm border border-white/20 rounded-2xl px-3 py-2`}>
                        {quizGame?.currentQuestion?.categoryId && <div className="font-bold text-sm text-white italic text-shadow-lg">{getCategoryIcon(quizGame.currentQuestion.categoryId)}</div>}
                        <div
                            className="flex flex-row justif-center items-center gap-2 font-bold text-4xl sm:text-5xl md:text-6xl lg:text-[64px] leading-tight font-[Nova_Square]">

                            <div className={`px-4 bg-clip-text  text-white text-shadow-lg text-xl flex flex-row justify-center items-center gap-3`}>
                                {quizGame?.waitingForNext
                                    ? <ProgressPie size={24} strokeWidth={4} duration={10000} trackColor="rgba(255,255,255,0.3)" progressColor={`var(--color-green-400)`}/>
                                    : <div className="h-full mx-1 w-4"/>}

                                <span>
                            Question {quizGame.questions.findIndex( question => question.id === quizGame?.currentQuestion?.id)+1 }</span>
                        </div></div>
                        {quizGame?.currentQuestion?.difficulty === "easy" && <EasyIcon className="w-12 h-auto flex justify-center items-center"/>}
                        {quizGame?.currentQuestion?.difficulty === "medium" && <MediumIcon className="w-12 h-auto flex justify-center items-center" />}
                        {quizGame?.currentQuestion?.difficulty === "hard" && <HardIcon className="w-12 h-auto flex justify-center items-center" />}

                    </div>



                    <div
                        className={`font-bold text-white font-[Nova_Square] text-shadow-lg text-xl`}>{quizGame?.currentQuestion?.question}</div>
                    {messageSystem && (<div
                        className={`absolute border border-white/30 rounded-xl bg-white backdrop-blur-sm shadow-lg p-5 text-2xl left-1/2 top-25 font-bold text-secondary-dark font-[Nova_Square]`}>{messageSystem}</div>)}
                    {usedJokerGlace && (<div className={`absolute border border-white/30 rounded-xl bg-white backdrop-blur-sm shadow-lg p-5 text-2xl m-auto top-8 z-50 font-bold text-secondary-dark font-[Nova_Square]`}>Vous avez gelé vos adversaires !</div>)}
                </>
            )}
            {idRoom && quizGame && quizGame.finished && (<>
                    <div className="font-bold text-[64px] text-shadow-black text-shadow-2xl text-white font-[Nova_Square]">Partie
                        terminée !
                    </div>
                    <div
                        className="font-bold text-3xl text-shadow-black text-shadow-2xl text-white">  {quizGame.scores.length > 0
                        ? quizGame.scores
                            .reduce((best, current) => current.score > best.score ? current : best)
                            .player
                        : "Personne"} a gagné !
                    </div>
                </>
            )
            }
        </>
    )


    return(
<>
        {idRoom && quizGame && !quizGame.finished && (<>


                    <div className={`flex flex-auto flex-row flex-wrap gap-2`}>
                    <JokerContainer label={"Bloc de glace"} handleSendJoker={handleSendJoker}>
                        <IceIcon />
                    </JokerContainer>
                    </div>

                <div className={`flex flex-row justify-center items-center gap-4 bg-primary/50 backdrop-blur-sm border border-white/20 rounded-2xl ${isMobile ? "p-3" : "p-4"}`}>
                    <div className={`font-bold ${isMobile ? "text-sm" : "text-xl"} text-white italic text-shadow-lg`}>{quizGame?.currentQuestion?.category}</div>
                    {quizGame?.currentQuestion?.difficulty === "easy" && <EasyIcon className="w-16 h-auto flex justify-center items-center"  />}
                    {quizGame?.currentQuestion?.difficulty === "medium" && <MediumIcon className="w-16 h-auto flex justify-center items-center"  />}
                    {quizGame?.currentQuestion?.difficulty === "hard" && <HardIcon className="w-16 h-auto flex justify-center items-center" />}
                </div>

                <div
                    className="flex flex-row justif-center items-center gap-2 font-bold text-4xl sm:text-5xl md:text-6xl lg:text-[64px] leading-tight font-[Nova_Square]"><QuizIcon className={`${isMobile ? "w-[40px] h-[40px]" : "w-[60px] h-[60px]"}`} /><span className={`px-4 bg-clip-text  text-white text-shadow-lg ${isMobile ? "text-2xl" : "text-5xl"}`}>Question {quizGame.questions.findIndex( question => question.id === quizGame?.currentQuestion?.id)+1 }</span></div>

                <div
                    className={`font-bold ${isMobile ? "text-2xl" : "text-3xl"}  text-white font-[Nova_Square] text-shadow-lg`}>{quizGame?.currentQuestion?.question}</div>
                {messageSystem && (<div
                    className={`absolute border border-white/30 rounded-xl bg-white backdrop-blur-sm shadow-lg p-5 text-2xl left-15 top-25 font-bold text-secondary-dark font-[Nova_Square]`}>{messageSystem}</div>)}
                {usedJokerGlace && (<div className={`absolute border border-white/30 rounded-xl bg-white backdrop-blur-sm shadow-lg p-5 text-2xl left-15 top-25 font-bold text-secondary-dark font-[Nova_Square]`}>Vous avez gelé vos adversaires !</div>)}
            </>
        )}
    {idRoom && quizGame && quizGame.finished && (<>
            <div className="font-bold text-[64px] text-shadow-black text-shadow-2xl text-white font-[Nova_Square]">Partie
                terminée !
            </div>
            <div
                className="font-bold text-3xl text-shadow-black text-shadow-2xl text-white">  {quizGame.scores.length > 0
                ? quizGame.scores
                    .reduce((best, current) => current.score > best.score ? current : best)
                    .player
                : "Personne"} a gagné !
            </div>
        </>
    )
    }
</>
)
}

export default QuizGameHeader;