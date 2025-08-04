import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Form from '@radix-ui/react-form';
import * as Toast from '@radix-ui/react-toast';

interface GuestRoomProps {
    setUsername: (username: string) => void;
}

const Login = ({ setUsername }: GuestRoomProps) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [error, setError] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toastOpen, setToastOpen] = useState(false);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        const formData = new FormData(e.currentTarget);
        const raw = (formData.get("username") as string)?.trim() || "";
        
        if (raw.length === 0 || raw.length > 20) {
            setError("Le nom doit faire entre 1 et 20 caractères.");
            setToastOpen(true);
            setIsSubmitting(false);
            return;
        }

        const safeUsername = raw.replace(/[^a-zA-Z0-9_-]/g, "");
        if (safeUsername !== raw) {
            setError("Seuls les lettres, chiffres, tirets et underscores sont autorisés.");
            setToastOpen(true);
            setIsSubmitting(false);
            return;
        }

        try {
            setUsername(safeUsername);
            const roomId = id ?? Math.random().toString(36).substring(2, 12);
            navigate(`/game/${roomId}`, { state: { username: safeUsername } });
        } catch (err) {
            setError("Une erreur est survenue. Veuillez réessayer.");
            setToastOpen(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Toast.Provider swipeDirection="right">
            <div className="flex items-center gap-8 p-2 justify-center h-full flex-1/2 self-center w-full">
                <Form.Root onSubmit={onSubmit} className="bg-white p-6 rounded-lg w-80 max-w-full mx-4 flex flex-col justify-center items-center shadow-lg">
                    <div className="w-40 h-40 flex mb-4">
                        <img 
                            src="/LogoTriviatrek.webp"
                            alt="Logo Triviatrek" 
                            className="w-full h-full object-contain"
                        />
                    </div>

                    <h1 className="text-sm mb-6 font-bold text-primary text-center">
                        Jouer en invité
                    </h1>

                    <Form.Field name="username" className="w-full mb-4">
                        <div className="flex items-baseline justify-between mb-2">
                            <Form.Label className="text-sm font-medium text-gray-700">
                                Nom d'utilisateur
                            </Form.Label>
                            <Form.Message 
                                match="valueMissing"
                                className="text-sm text-red-600"
                            >
                                Veuillez entrer un nom
                            </Form.Message>
                            <Form.Message 
                                match="tooShort"
                                className="text-sm text-red-600"
                            >
                                Le nom doit faire au moins 1 caractère
                            </Form.Message>
                        </div>
                        <Form.Control asChild>
                            <input
                                type="text"
                                placeholder="Entrez votre nom"
                                required
                                minLength={1}
                                maxLength={20}
                                disabled={isSubmitting}
                                className="border border-gray-300 p-3 w-full text-black rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                                aria-describedby={error ? "error-message" : undefined}
                            />
                        </Form.Control>
                    </Form.Field>

                    {error && (
                        <div 
                            id="error-message" 
                            className="text-sm text-red-600 mb-4 text-center"
                            role="alert"
                        >
                            {error}
                        </div>
                    )}

                    <Form.Submit asChild>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-secondary-dark font-bold text-primary py-3 px-6 rounded-md w-full hover:bg-secondary-darker focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {isSubmitting ? "Connexion..." : "Commencer"}
                        </button>
                    </Form.Submit>
                </Form.Root>
            </div>

            <Toast.Root 
                className="bg-red-50 border border-red-200 rounded-md p-4 shadow-lg"
                open={toastOpen} 
                onOpenChange={setToastOpen}
            >
                <Toast.Title className="font-medium text-red-800">
                    Erreur
                </Toast.Title>
                <Toast.Description className="text-red-600">
                    {error}
                </Toast.Description>
                <Toast.Close 
                    className="absolute top-2 right-2 text-red-400 hover:text-red-600"
                    aria-label="Fermer"
                >
                    ×
                </Toast.Close>
            </Toast.Root>

            <Toast.Viewport className="fixed bottom-0 right-0 flex flex-col p-6 gap-2 w-96 max-w-[100vw] m-0 list-none z-50" />
        </Toast.Provider>
    );
};

export default Login;