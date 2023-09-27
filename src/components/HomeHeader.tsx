import { HStack, VStack, Text, Heading, Button as ButtonNative } from "native-base";
import { useNavigation } from "@react-navigation/native";

import { Plus } from "phosphor-react-native";
import { AppNavigatorRoutesApp } from "@routes/app.routes";
import { api } from "@services/api";

import { UserPhoto } from "./UserPhoto";
import defaultUserPhotoImg from "@assets/userPhotoDefault.png";

type Props = {
    avatarUrl?: string;
    name: string;
}

export function HomeHeader({ name, avatarUrl }: Props) {
    const navigation = useNavigation<AppNavigatorRoutesApp>();

    function handleNavigateCreateMyAds() {
        navigation.navigate("createMyAds");
    }

    return (
        <HStack alignItems="center" mb={4}>
            <UserPhoto
                source={avatarUrl ? {uri: `${api.defaults.baseURL}/images/${avatarUrl}`} : defaultUserPhotoImg}
                alt="User photo"
                size={12}
                mr={4}
            />

            <VStack>
                <Text color="gray.200" fontSize="lg">
                    Boas vindas,
                </Text>

                <Heading color="gray.100" fontSize="lg" fontFamily="heading">
                    {name}!
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
