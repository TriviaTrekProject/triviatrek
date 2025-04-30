interface ChatRoomProps {
    username?: string
}

const ChatRoom = ({username}: ChatRoomProps) => {


    return (
        <div>{username}</div>
    )
}

export default ChatRoom