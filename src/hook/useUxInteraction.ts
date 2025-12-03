import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks/typedReduxHooks';
import { setLoading, setChatOpen, setError, clearError } from '../slices/UxInteractionSlice.ts';

export const useUxInteraction = () => {
    const dispatch = useAppDispatch();
    const { isLoading, isChatOpen, error } = useAppSelector((state) => state.ui);

    const setLoadingState = useCallback((loading: boolean) => {
        dispatch(setLoading(loading));
    }, [dispatch]);

    const toggleChat = useCallback(() => {
        dispatch(setChatOpen(!isChatOpen));
    }, [dispatch, isChatOpen]);

    const setChatOpenState = useCallback((open: boolean) => {
        dispatch(setChatOpen(open));
    }, [dispatch]);

    const setErrorState = useCallback((errorMessage: string | null) => {
        dispatch(setError(errorMessage));
    }, [dispatch]);

    const clearErrorState = useCallback(() => {
        dispatch(clearError());
    }, [dispatch]);

    return {
        // États
        isLoading,
        isChatOpen,
        error,
        // Actions
        setLoading: setLoadingState,
        toggleChat,
        setChatOpen: setChatOpenState,
        setError: setErrorState,
        clearError: clearErrorState,
    };
};
