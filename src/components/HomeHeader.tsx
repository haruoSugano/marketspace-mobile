import { HStack, VStack, Text, Heading, Button as ButtonNative } from "native-base";
import { Plus } from "phosphor-react-native";
import { UserPhoto } from "./UserPhoto";

import defaultUserPhotoImg from "@assets/userPhotoDefault.png";

export function HomeHeader() {
    return (
        <HStack pt={16} pb={5} px={6} alignItems="center">
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

            <ButtonNative ml={8} bg="gray.100" width={135} height={45}>
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