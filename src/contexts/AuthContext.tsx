import { ReactNode, createContext, useEffect, useState } from "react";
import { useToast } from "native-base";

import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { storageUserGet, storageUserRemove, storageUserSave } from "@storage/storageUser";

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

    async function signIn(email: string, password: string) {
        try {
            const { data } = await api.post("/sessions", {
                email,
                password
            });

            if (data.user) {
                setUser(data.user);
                storageUserSave(data.user);
            }
        } catch (error) {
            const isAppError = error instanceof AppError;

            const title = isAppError ? error.message : "Não foi possível realizar o login. Tente novamente mais tarde."

            toast.show({
                title,
                placement: "top",
                bgColor: "red.500"
            })
        }
    }

    async function loadUserData() {
        try {
            const userLogged = await storageUserGet();

            if (userLogged) {
                setUser(userLogged);
            }
        } catch (error) {
            throw error;
        } finally {
            setIsLoadingUserStorageData(false);
        }
    }

    async function signOut() {
        try {
            setIsLoadingUserStorageData(true);
            
            setUser({} as UserDTO);

            await storageUserRemove();
        } catch (error) {
            throw error;
        } finally {
            setIsLoadingUserStorageData(false);
        }
    }

    useEffect(() => {
        loadUserData();
    }, []);

    return (
        <AuthContext.Provider value={{ user, signIn, signOut, isLoadingUserStorageData }}>
            {children}
        </AuthContext.Provider>
    );
}
