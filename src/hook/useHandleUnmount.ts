import {useEffect, useRef} from "react";


/**
 * Exécute la callback fournie :
 *  • lorsque le composant est démonté (navigation interne React Router)
 *  • lorsque l’onglet est fermé, actualisé ou que l’utilisateur change de page
 */
export default function useHandleUnmount(cb: () => void) {
    // On stocke la callback dans une ref afin que les gestionnaires
    // d’évènements disposent toujours de la version la plus récente.
    const cbRef = useRef(cb);
    cbRef.current = cb;

    useEffect(() => {
        const handler = () => cbRef.current();

        /* --- Évènements liés à la fermeture / actualisation --- */
        window.addEventListener("beforeunload", handler); // tous navigateurs
        window.addEventListener("pagehide", handler);     // Safari mobile


        /* --- Nettoyage quand le composant est démonté --- */
        return () => {
            handler(); // navigation interne dans le SPA
            window.removeEventListener("beforeunload", handler);
            window.removeEventListener("pagehide", handler);
        };
    }, []);
}
