
import MovieIcon from "../components/common/Icons/category/MovieIcon.tsx";
import HistoireIcon from "../components/common/Icons/category/HistoireIcon.tsx";
import MusiqueIcon from "../components/common/Icons/category/MusiqueIcon.tsx";
import PopIcon from "../components/common/Icons/category/PopIcon.tsx";
import CultureIcon from "../components/common/Icons/category/CultureIcon.tsx";
import ScienceIcon from "../components/common/Icons/category/ScienceIcon.tsx";
import GeographieIcon from "../components/common/Icons/category/GeographieIcon.tsx";
import LitteratureIcon from "../components/common/Icons/category/LitteratureIcon.tsx";
import LogiqueIcon from "../components/common/Icons/category/LogiqueIcon.tsx";
import SportIcon from "../components/common/Icons/category/SportIcon.tsx";
import PlayerIcon from "../components/common/Icons/PlayerIcon.tsx";

export const getCategoryIcon = (category: string, className: string = "w-6 h-6") => {
    switch (category) {
        case "CINEMA_TELEVISION": return <MovieIcon className={className} />
        case "HISTOIRE": return <HistoireIcon className={className} />
        case "MUSIQUE": return <MusiqueIcon className={className} />
        case "POP_CULTURE": return <PopIcon className={className} />
        case "CULTURE_GENERALE": return <CultureIcon className={className} />
        case "SCIENCE": return <ScienceIcon className={className} />
        case "GEOGRAPHIE": return <GeographieIcon className={className} />
        case "LITTERATURE": return <LitteratureIcon className={className} />
        case "LOGIQUE": return <LogiqueIcon className={className} />
        case "SPORT": return <SportIcon className={className} />
        default: return <PlayerIcon className={className} />
    }
};
