import { Box, Image, Pressable, Center, VStack, HStack } from "native-base";

import { PencilSimpleLine } from "phosphor-react-native";
import AvatarImg from "@assets/Avatar.svg";

export function Perfil() {
    return (
        <HStack mt={5}>
            <AvatarImg 
                width={120}
                height={120}
            />

            <Pressable
                bg="blue.light"
                width={50}
                height={50}
                rounded="full"
                overflow="hidden"
                _pressed={{
                    borderColor: "blue.dark",
                    borderWidth: 1
                }}
                mt={16}
                ml={-12}
            >
                <Center mt={3}>
                    <PencilSimpleLine
                        color="white"
                    />
                </Center>
            </Pressable>
        </HStack>
    );
}
