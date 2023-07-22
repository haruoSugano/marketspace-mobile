import { Platform } from "react-native";
import { useTheme } from "native-base";
import { createBottomTabNavigator, BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

import { House, Tag, SignOut } from "phosphor-react-native";

import { Home } from "@screens/Home";
import { MyAds } from "@screens/MyAds";
import { SignIn } from "@screens/SignIn";
import { DetailMyAds } from "@screens/DetailMyAds";

type AppRoutes = {
    home: undefined;
    myAds: undefined;
    signIn: undefined;
    detailMyAds: undefined;
}

export type AppNavigatorRoutesApp = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
    const { sizes, colors } = useTheme();

    const iconSize = sizes[6];

    return (
        <Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarActiveTintColor: colors.gray[100],
                tabBarInactiveTintColor: colors.gray[500],
                tabBarStyle: {
                    backgroundColor: colors.white,
                    borderTopWidth: 0,
                    height: Platform.OS === "android" ? "auto" : 96,
                    paddingBottom: sizes[10],
                    paddingTop: sizes[6]
                }
            }}
        >
            <Screen
                name="home"
                component={Home}
                options={{
                    tabBarIcon: ({ color }) => (
                        <House color={color} />
                    )
                }}
            />

            <Screen
                name="myAds"
                component={MyAds}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Tag color={color} />
                    )
                }}
            />

            <Screen
                name="signIn"
                component={SignIn}
                options={{
                    tabBarIcon: ({ color }) => (
                        <SignOut color={color} />
                    )
                }}
            />

            <Screen
                name="detailMyAds"
                component={DetailMyAds}
                options={{
                    tabBarStyle: { display: "none" },
                    tabBarButton: () => null
                }}
            />
        </Navigator>
    );
}
