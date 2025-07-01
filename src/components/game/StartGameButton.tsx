const StartGameButton = ({ onClick }: { onClick: (() => void) | undefined }) => (
    <div>
        <button
            className="bg-secondary-dark border-solid border-white font-bold hover:bg-secondary"
            type="button"
            onClick={onClick}
        >
            Lancer quiz
        </button>
    </div>
);
export default StartGameButton;