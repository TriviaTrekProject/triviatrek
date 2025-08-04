import { useEffect, useState } from 'react';

export const usePreloadBackground = () => {
    const [isPreloaded, setIsPreloaded] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const preloadComponents = async () => {
            const components = [
                () => import('../components/common/background/SkyBg'),
                () => import('../components/common/background/SeaBg'),
                () => import('../components/common/background/ShoreBg'),
                () => import('../components/common/background/RockBg'),
                () => import('../components/common/background/ShipBg'),
                () => import('../components/common/background/Bird1Bg'),
                () => import('../components/common/background/Bird2Bg'),
            ];

            let loaded = 0;
            for (const loadComponent of components) {
                try {
                    await loadComponent();
                    loaded++;
                    setProgress((loaded / components.length) * 100);
                } catch (error) {
                    console.warn('Erreur préchargement composant:', error);
                }
            }
            
            setIsPreloaded(true);
        };

        // Précharger après un délai pour ne pas bloquer le rendu initial
        const timer = setTimeout(preloadComponents, 50);
        return () => clearTimeout(timer);
    }, []);

    return { isPreloaded, progress };
};
