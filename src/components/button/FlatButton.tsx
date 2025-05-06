import "./FlatButton.css";

const FlatButton = ({text, onClick}:{text: string, onClick: () => void}) => {

    return (
        <div>
            <button className="fancy" onClick={onClick}>
                <span className="top-key"></span>
                <span className={"button-text"}>{text}</span>
                <span className="bottom-key-1"></span>
                <span className="bottom-key-2"></span>
            </button>
        </div>
    )
}

export default FlatButton;