import { ReactNode, createContext, useEffect, useState } from "react";
import { useToast } from "native-base";

import { UserDTO } from "@dtos/UserDTO";

import { api } from "@services/api";

import { AppError } from "@utils/AppError";

import { storageUserGet, storageUserRemove, storageUserSave } from "@storage/storageUser";
import { storageAuthTokenGet, storageAuthTokenRemove, storageAuthTokenSave } from "@storage/storageAuthToken";

export type AuthContextDataProps = {
    user: UserDTO;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    isLoadingUserStorageData: boolean;
}

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const toast = useToast();
    const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true);
    const [user, setUser] = useState<UserDTO>({} as UserDTO);

    async function userAndTokenUpdate(userData: UserDTO, token: string) {
        api.defaults.headers.common["Authorization"] = "Bearer " + token;
        setUser(userData);
    }

    async function userAndTokenSave(userData: UserDTO, token: string, refresh_token: string) {
        try {
            setIsLoadingUserStorageData(true);

            await storageUserSave(userData);
            await storageAuthTokenSave({ token, refresh_token })
        } catch (error) {
            throw error;
        } finally {
            setIsLoadingUserStorageData(false);
        }
    }

    async function signIn(email: string, password: string) {
        try {
            const { data } = await api.post("/sessions", {
                email,
                password
            });

            if (data.user && data.token && data.refresh_token) {
                await userAndTokenSave(data.user, data.token, data.refresh_token);

                userAndTokenUpdate(data.user, data.token);
            }
        } catch (error) {
            const isAppError = error instanceof AppError;

            const title = isAppError ? error.message : "Não foi possível realizar o login. Tente novamente mais tarde.";

            toast.show({
                title,
                placement: "top",
                bgColor: "red.500"
            })
        }
    }

    async function signOut() {
        try {
            setIsLoadingUserStorageData(true);
            
            setUser({} as UserDTO);

            await storageAuthTokenRemove();
            await storageUserRemove();
        } catch (error) {
            throw error;
        } finally {
            setIsLoadingUserStorageData(false);
        }
    }

    async function loadUserData() {
        try {
            setIsLoadingUserStorageData(true);

            const userLogged = await storageUserGet();
            const { token } = await storageAuthTokenGet();

            if (token && userLogged) {
                userAndTokenUpdate(userLogged, token);
            }
        } catch (error) {
            throw error;
        } finally {
            setIsLoadingUserStorageData(false);
        }
    }

    useEffect(() => {
        loadUserData();
    }, []);

    useEffect(() => {
        const subscribe = api.registerInterceptTokenManager(signOut);

        return () => {
            subscribe();
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, signIn, signOut, isLoadingUserStorageData }}>
            {children}
        </AuthContext.Provider>
    );
}
