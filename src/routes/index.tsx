import { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Box } from "native-base";

import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

import { AuthContext } from "@contexts/AuthContext";

import { useAuth } from "@hooks/useAuth";

export function Routes() {
    const { user } = useAuth();

    console.log("Usuario logado =>", user);

    return (
        <Box flex={1}>
            <NavigationContainer>
                <AuthRoutes />
            </NavigationContainer>
        </Box>
    );
}
