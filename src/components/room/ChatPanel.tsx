import ChatComponent from './ChatComponent';
import ChatIcon from '../common/Icons/ChatIcon';
import ArrowRightIcon from '../common/Icons/ArrowRightIcon';
import {MessageDTO} from "../../model/MessageDTO.ts";

interface ChatPanelProps {
  roomId?: string;
  messages?: MessageDTO[];
  username: string;
  isOpen: boolean;
  toggleOpen: () => void;
}

const ChatPanel = ({
  roomId,
  messages,
  username,
  isOpen,
  toggleOpen
}:ChatPanelProps) => (
  <>
    {/* Bouton pour ouvrir/fermer le chat */}
    <div
      className={`fixed top-1/3 right-0 z-50 h-12 bg-secondary-dark text-white hover:bg-secondary-darker overflow-hidden flex grow-1
        ${isOpen ? 'w-80 rounded-t-2xl' : 'w-45 rounded-2xl'}
        transition-[width] duration-300 flex justify-center items-center`}
    >
      <button
        className="w-full h-full flex justify-center items-center"
        onClick={toggleOpen}
      >
        {isOpen
          ? <div className={"flex flex-row gap-2"}><ArrowRightIcon className="w-6 h-auto" />Fermer</div>
          : <div className={"flex flex-row gap-2"}><ChatIcon className="w-6 h-auto" />Messages</div>}
      </button>
    </div>

    {/* Panneau latéral Chat */}
    <div
      className={
        `fixed top-[calc(33%+48px)] right-0 z-40 h-auto scroll shadow-lg bg-white
         transform transition-transform duration-300 ease-in-out
         ${isOpen ? 'translate-x-0 rounded-b-2xl' : 'translate-x-full'}
         w-full sm:w-80 pt-6`
      }
    >
      <ChatComponent
        roomId={roomId}
        messages={messages}
        username={username}
      />
    </div>
  </>
);

export default ChatPanel;
