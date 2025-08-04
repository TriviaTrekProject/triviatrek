import { useState, useEffect } from 'react';

type QualityMode = 'low' | 'medium' | 'high';

// Types pour les APIs expérimentales
interface NetworkInformation extends EventTarget {
    effectiveType?: '2g' | '3g' | '4g' | 'slow-2g';
    saveData?: boolean;
    addEventListener(type: 'change', listener: () => void): void;
    removeEventListener(type: 'change', listener: () => void): void;
}

interface PerformanceWithMemory extends Performance {
    memory?: {
        usedJSHeapSize: number;
        totalJSHeapSize: number;
        jsHeapSizeLimit: number;
    };
}

// Helper pour vérifier si navigator a connection
const hasNetworkInfo = (nav: Navigator): nav is Navigator & { connection: NetworkInformation } => {
    return 'connection' in nav && nav.connection !== undefined;
};

export const usePerformanceMode = () => {
    const [quality, setQuality] = useState<QualityMode>('high');
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkPerformance = () => {
            const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            const perfWithMemory = performance as PerformanceWithMemory;
            
            let isSlowConnection = false;
            
            // Vérification sécurisée de la connexion
            if (hasNetworkInfo(navigator)) {
                const effectiveType = navigator.connection.effectiveType;
                isSlowConnection = effectiveType === '2g' || effectiveType === 'slow-2g';
            }
            
            setIsMobile(isMobileDevice);

            // Détection automatique de la qualité
            const highMemoryUsage = perfWithMemory.memory && 
                                  perfWithMemory.memory.usedJSHeapSize > 50 * 1024 * 1024;

            if (isSlowConnection || highMemoryUsage) {
                setQuality('low');
            } else if (isMobileDevice) {
                setQuality('medium');
            } else {
                setQuality('high');
            }
        };

        checkPerformance();
        
        // Écouter les changements de connexion
        if (hasNetworkInfo(navigator)) {
            const handleConnectionChange = () => checkPerformance();
            navigator.connection.addEventListener('change', handleConnectionChange);
            
            return () => {
                if (hasNetworkInfo(navigator)) {
                    navigator.connection.removeEventListener('change', handleConnectionChange);
                }
            };
        }
    }, []);

    const toggleQuality = () => {
        const modes: QualityMode[] = ['low', 'medium', 'high'];
        const currentIndex = modes.indexOf(quality);
        const nextIndex = (currentIndex + 1) % modes.length;
        setQuality(modes[nextIndex]);
    };

    return { quality, isMobile, setQuality, toggleQuality };
};