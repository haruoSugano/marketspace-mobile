import { Pressable, Center, HStack, IPressableProps, Image } from "native-base";

import { PencilSimpleLine } from "phosphor-react-native";
import AvatarImg from "@assets/Avatar.svg";
import { ImageSourcePropType } from "react-native";


type Props = IPressableProps & {
    photo?: ImageSourcePropType;
};

const size = 120;

export function Perfil({ photo, ...rest }: Props) {
    return (
        <HStack mt={5}>
            {
                photo ?
                    <Image
                        w={size}
                        h={size}
                        rounded="full"
                        borderWidth={2}
                        borderColor="gray.400"
                        source={photo}
                                alt="Foto do usuário"
                    />

                    :

                    <AvatarImg
                        width={size}
                        height={size}
                    />
            }

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
                {...rest}
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
