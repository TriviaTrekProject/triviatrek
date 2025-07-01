const StartGameButton = ({ onClick }: { onClick: (() => void) | undefined }) => (
    <div className={"w-full flex justify-center items-center"}>
        <button
            className="bg-secondary-dark border-solid border-white font-bold hover:bg-secondary-darker"
            type="button"
            onClick={onClick}
        >
            Lancer quiz
        </button>
    </div>
);
export default StartGameButton;