import { HStack, Pressable, Button as ButtonNativeBase, Heading, VStack, Text, Box } from "native-base";
import { THEME } from "@theme/index";

import { Tag, ArrowRight } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesApp } from "@routes/app.routes";

export function HomeSell() {
    const navigation = useNavigation<AppNavigatorRoutesApp>();

    function handleGoMyAds() {
        navigation.navigate("myAds");
    }

    return (
        <ButtonNativeBase
            pl={0}
            mt={2}
            height={70}
            width="full"
            bg="blueGray.200"
            _pressed={{
                bg: "gray.400"
            }}
            onPress={handleGoMyAds}
        >
            <HStack alignItems="center">
                <Box mr={4} >
                    <Tag color={THEME.colors.blue.light} />
                </Box>

                <VStack>
                    <Heading fontSize="lg" fontFamily="heading">
                        4
                    </Heading>
                    <Text fontSize="xs" fontFamily="body">
                        anúncios ativos
                    </Text>
                </VStack>

                <Text ml={12} fontSize="xs" fontFamily="heading" color="blue.dark">
                    Meus anúncios
                </Text>
                <Box ml={2}>
                    <ArrowRight size={18} color={THEME.colors.blue.dark} />
                </Box>
            </HStack>
        </ButtonNativeBase>
    );
}
