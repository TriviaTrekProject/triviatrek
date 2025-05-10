import { useEffect } from "react";


const useHandleUnmount = (onUnload:() => void) => {

    window.addEventListener('beforeunload', onUnload);


    useEffect(() => {

        // Au démontage du composant, quitter la room et fermer la connexion
        return () => {
            onUnload();
            window.removeEventListener('beforeunload', onUnload);

        };
    }, [onUnload]);


    return () => {

    }
}

export default useHandleUnmount;