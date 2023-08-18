import { Platform } from "react-native";
import { useTheme } from "native-base";
import { createBottomTabNavigator, BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

import { House, Tag, SignOut } from "phosphor-react-native";

import { Home } from "@screens/Home";
import { MyAds } from "@screens/MyAds";
import { SignIn } from "@screens/SignIn";
import { DetailsAds } from "@screens/DetailsAds";
import { CreateMyAds } from "@screens/CreateMyAds";
import { DetailsMyAds } from "@screens/DetailsMyAds";
import { EditAds } from "@screens/EditAds";
import { AdsPreview } from "@screens/AdsPreview";
import { useAuth } from "@hooks/useAuth";

type AppRoutes = {
    home: undefined;
    myAds: undefined;
    signIn: undefined;
    detailsAds: undefined;
    createMyAds: undefined;
    detailsMyAds: undefined;
    editAds: undefined;
    adsPreview: undefined;
}

export type AppNavigatorRoutesApp = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
    const { sizes, colors } = useTheme();
    const { signOut } = useAuth();

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
                    height: Platform.OS === "android" ? "auto" : 50,
                    paddingBottom: sizes[6],
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
                listeners={{
                    tabPress: signOut
                }}
            />


            <Screen
                name="detailsAds"
                component={DetailsAds}
                options={{
                    tabBarStyle: { display: "none" },
                    tabBarButton: () => null
                }}
            />

            <Screen
                name="createMyAds"
                component={CreateMyAds}
                options={{
                    tabBarStyle: { display: "none" },
                    tabBarButton: () => null
                }}
            />

            <Screen
                name="detailsMyAds"
                component={DetailsMyAds}
                options={{
                    tabBarStyle: { display: "none" },
                    tabBarButton: () => null
                }}
            />

            <Screen
                name="editAds"
                component={EditAds}
                options={{
                    tabBarStyle: { display: "none" },
                    tabBarButton: () => null
                }}
            />

            <Screen
                name="adsPreview"
                component={AdsPreview}
                options={{
                    tabBarStyle: { display: "none" },
                    tabBarButton: () => null
                }}
            />
        </Navigator>
    );
}
