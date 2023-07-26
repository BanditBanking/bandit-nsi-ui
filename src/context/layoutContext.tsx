import React from 'react';
import { noOp } from '../constants';
import { usePersistedState } from '../hooks/usePersistedState';

type LayoutValueType = {
    isLoginPopupActive: boolean;
    currentPage: 'home' | 'studies' | 'editor' | 'lab';
};

type LayoutModifierType = {
    setLoginPopupActive: (isLoginPopupActive: boolean) => void;
    setCurrentPage: (currentPage: 'home' | 'studies' | 'editor' | 'lab') => void;
};

type LayoutContextType = LayoutValueType & LayoutModifierType;

export const LayoutContext = React.createContext<LayoutContextType>({
    isLoginPopupActive: false,
    currentPage: 'home',
    setCurrentPage: noOp,
    setLoginPopupActive: noOp,
});

export type ProviderProps = {
    children: React.ReactNode;
    storageKey: string;
};

export const LayoutProvider = ({ children, storageKey }: ProviderProps) => {
    const [storedValues, setStoredValues] = usePersistedState<LayoutValueType>(
        `${storageKey}-layout`,
        {
            isLoginPopupActive: false,
            currentPage: 'home'
        },
        { version: 0 },
    );

    const layoutContextValue = React.useMemo<LayoutContextType>(() => {
        return {
            currentPage: storedValues.currentPage,
            isLoginPopupActive: storedValues.isLoginPopupActive,
            setCurrentPage: (currentPage) => setStoredValues((v) => ({ ...v, currentPage })),
            setLoginPopupActive: (isLoginPopupActive) => setStoredValues((v) => ({ ...v, isLoginPopupActive })),
        };
    }, [setStoredValues, storedValues.currentPage, storedValues.isLoginPopupActive]);

    return <LayoutContext.Provider value={layoutContextValue}>{children} </LayoutContext.Provider>;
};

export const useLayoutContext = () => {
    return React.useContext(LayoutContext);
};