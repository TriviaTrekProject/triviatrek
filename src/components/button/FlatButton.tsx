import "./FlatButton.css";

const FlatButton = ({text, onClick}:{text: string, onClick: () => void}) => {

    return (
        <div className={"flex grow-1"}>
            <button className="fancy flex basis-full justify-center" onClick={onClick}>
                <span className="top-key"></span>
                <span className={"button-text"}>{text}</span>
                <span className="bottom-key-1"></span>
                <span className="bottom-key-2"></span>
            </button>
        </div>
    )
}

export default FlatButton;