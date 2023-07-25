import { HStack, VStack, Text, Heading, Button as ButtonNative } from "native-base";
import { Plus } from "phosphor-react-native";
import { UserPhoto } from "./UserPhoto";

import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesApp } from "@routes/app.routes";

import defaultUserPhotoImg from "@assets/userPhotoDefault.png";

export function HomeHeader() {
    const navigation = useNavigation<AppNavigatorRoutesApp>();

    function handleNavigateCreateMyAds() {
        navigation.navigate("createMyAds");
    }
    
    return (
        <HStack alignItems="center" mb={8}>
            <UserPhoto
                source={defaultUserPhotoImg}
                alt="User photo"
                size={12}
                mr={4}
            />

            <VStack>
                <Text color="gray.200" fontSize="lg">
                    Boas vindas,
                </Text>

                <Heading color="gray.100" fontSize="lg" fontFamily="heading">
                    Helio!
                </Heading>
            </VStack>

            <ButtonNative
                ml={8}
                bg="gray.100"
                width={135}
                height={45}
                _pressed={{
                    bg: "gray.400"
                }}
                onPress={handleNavigateCreateMyAds}
            >
                <HStack alignItems="center">
                    <Plus color="white" size={18} />
                    <Text color="white" ml={1} fontFamily="heading">
                        Criar anúncio
                    </Text>
                </HStack>
            </ButtonNative>
        </HStack>
    );
}
