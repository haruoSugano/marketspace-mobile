import { ReactNode, createContext, useState } from "react";

import { UserDTO } from "@dtos/UserDTO";

export type AuthContextDataProps = {
    user: UserDTO;
    signIn: (email: string, password: string) => void;
}

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [user, setUser] = useState({
        id: "1",
        name: "Helio Haruo",
        email: "haruo@gmail.com",
        tel: "123456",
        password: "123456",
        avatar: ""
    });

    function signIn(email: string, password: string) {
        setUser({
            id: "1",
            name: "Helio Haruo",
            email: email,
            tel: "123456",
            password: password,
            avatar: ""
        });
    }

    return (
        <AuthContext.Provider value={{ user, signIn }}>
            {children}
        </AuthContext.Provider>
    );
}
