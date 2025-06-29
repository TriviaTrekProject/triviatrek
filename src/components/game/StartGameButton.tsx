const StartGameButton = ({ onClick }: { onClick: (() => void) | undefined }) => (
    <div>
        <button
            className="bg-tertiary font-bold hover:bg-secondary"
            type="button"
            onClick={onClick}
        >
            Lancer quiz
        </button>
    </div>
);
export default StartGameButton;