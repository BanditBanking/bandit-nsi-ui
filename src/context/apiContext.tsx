import React from 'react';
import { noOp } from '../constants';
import { usePersistedState } from '../hooks/usePersistedState';

type ApiValueType = {
    apiKey?: string;
    userRole?: "User" | "DataScientist" | "ChiefDataScientist" | "Admin";
    isConnected: boolean;
    username?: string;
};

type ApiModifierType = {
    setApiKey: (apiKey: string) => void;
    setUserRole: (userRole: "User" | "DataScientist" | "ChiefDataScientist") => void;
    setIsConnected: (isConnected: boolean) => void;
    setUsername: (username: string) => void;
};

type ApiContextType = ApiValueType & ApiModifierType;

export const ApiContext = React.createContext<ApiContextType>({
    apiKey: undefined,
    userRole: undefined,
    isConnected: false,
    username: undefined,
    setApiKey: noOp,
    setUserRole: noOp,
    setIsConnected: noOp,
    setUsername: noOp,
});

export type ProviderProps = {
    children: React.ReactNode;
    storageKey: string;
};

export const ApiProvider = ({ children, storageKey }: ProviderProps) => {
    const [storedValues, setStoredValues] = usePersistedState<ApiValueType>(
        `${storageKey}-api`,
        {
            apiKey: undefined,
            userRole: undefined,
            isConnected: false,
            username: undefined,
        },
        { version: 0 },
    );

    const apiContextValue = React.useMemo<ApiContextType>(() => {
        return {
            apiKey: storedValues.apiKey,
            userRole: storedValues.userRole,
            isConnected: storedValues.isConnected,
            username: storedValues.username,
            setApiKey: (apiKey) => setStoredValues((v) => ({ ...v, apiKey })),
            setUserRole: (userRole) => setStoredValues((v) => ({ ...v, userRole })),
            setIsConnected: (isConnected) => setStoredValues((v) => ({ ...v, isConnected })),
            setUsername: (username) => setStoredValues((v) => ({ ...v, username })),
        };
    }, [setStoredValues, storedValues.apiKey, storedValues.userRole, storedValues.isConnected, storedValues.username]);

    return <ApiContext.Provider value={apiContextValue}>{children} </ApiContext.Provider>;
};

export const useApiContext = () => {
    return React.useContext(ApiContext);
};