import { NavigationContainer } from "@react-navigation/native";
import { Box } from "native-base";
import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

export function Routes() {
    return (
        <Box flex={1}>
            <NavigationContainer>
                <AuthRoutes />
            </NavigationContainer>
        </Box>
    );
}
