import ChatComponent from './ChatComponent';
import ChatIcon from '../common/Icons/ChatIcon';
import ArrowRightIcon from '../common/Icons/ArrowRightIcon';
import {MessageDTO} from "../../model/MessageDTO.ts";
import useIsMobile from "../../hook/useIsMobile.ts";

interface ChatPanelProps {
  roomId?: string;
  messages?: MessageDTO[];
  username: string;
  isOpen: boolean;
  toggleOpen: () => void;
}

// Panel
const ChatPanel = ({
  roomId,
  messages,
  username,
  isOpen,
  toggleOpen
}:ChatPanelProps) => {

    const isMobile = useIsMobile();

    const positionClasses = isMobile
        ? "top-4 h-10 right-2"
        : "top-1/3 h-12";

    const sizeAndShape = isOpen
        ? "w-80 rounded-t-2xl"
        : (isMobile ? "w-20 rounded-2xl"   : "w-45 rounded-2xl");

    const commonClasses = [
        "fixed right-0 z-50",
        "bg-secondary-dark text-white hover:bg-secondary-darker",
        "overflow-hidden flex grow-1 justify-center items-center",
        "transition-[width] duration-300"
    ].join(" ");


    return (
  <>
    {/* Bouton pour ouvrir/fermer le chat */}
    <div
      className={`${positionClasses} ${sizeAndShape} ${commonClasses}`}
    >
      <button
        className="w-full h-full flex justify-center items-center"
        onClick={toggleOpen}
      >
        {isOpen
          ? <div className={"flex flex-row gap-2"}><ArrowRightIcon className="w-6 h-auto" />Fermer</div>
          : <div className={"flex flex-row gap-2"}><ChatIcon className="w-6 h-auto" />{!isMobile && "Messages"}</div>}
      </button>
    </div>

    {/* Panneau latéral Chat */}
    <div
      className={
        `fixed ${isMobile ? "top-[calc(var(--spacing)*4+var(--spacing)*10)]" : "top-[calc(33%+var(--spacing)*12)]"} right-0 z-40 h-auto scroll shadow-lg bg-white
         transform transition-transform duration-300 ease-in-out
         ${isOpen ? 'translate-x-0 rounded-b-2xl' : 'translate-x-full'}
         sm:w-80 pt-6`
      }
    >
      <ChatComponent
        roomId={roomId}
        messages={messages}
        username={username}
      />
    </div>
  </>
);}

export default ChatPanel;
