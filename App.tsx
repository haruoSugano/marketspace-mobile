import { NativeBaseProvider, StatusBar } from "native-base";
import { useFonts, Karla_400Regular, Karla_700Bold } from "@expo-google-fonts/karla";

import { THEME } from "@theme/index";
import { AuthRoutes } from "@routes/auth.routes";
import { Routes } from "@routes/index";
import { LogBox } from "react-native";

export default function App() {
  const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold });
  LogBox.ignoreLogs([
    "We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320",
    "In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app."
  ]);
  
  return (
    
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? <Routes /> : <Routes />}
    </NativeBaseProvider>
  );
}
