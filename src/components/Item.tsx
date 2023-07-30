import { Box, Image, HStack, Text, VStack, IImageProps } from "native-base";
import { UserPhoto } from "./UserPhoto";
import { ImageSourcePropType, Platform } from "react-native";

type Props = IImageProps & {
    uri: ImageSourcePropType | null
    price: number;
    name: string;
    is_new: boolean;
    is_activated?: boolean;
}

export function Item({ uri = null, price, name, is_new, is_activated = true, ...rest }: Props) {
    return (
        <Box width="full" mt={2}>
            <Image
                w={Platform.OS === "android" ? 163 : 160}
                borderRadius={6}
                {...rest}
            />
            <HStack position="absolute" mt={1} ml={uri === null ? 24 : 1}>
                {
                    uri !== null ?
                        <UserPhoto
                            source={uri}
                            alt="User photo"
                            size={7}
                            mr={16}
                        /> : null
                }

                <Box
                    width={16}
                    height={6}
                    bg={is_new ? "blue.light" : "gray.300"}
                    alignItems="center"
                    borderRadius={10}
                >
                    <Text fontFamily="heading" fontSize="sm" color="white">{is_new ? "NOVO" : "USADO"}</Text>
                </Box>
            </HStack>

            {
                is_activated ?
                    null
                    :
                    <Text
                        position="absolute"
                        fontFamily="heading"
                        fontSize="xs"
                        color="white"
                        mt="48%"
                        ml={1}
                    >
                        ANÚNCIO DESATIVADO
                    </Text>
            }
            <VStack>
                <Text fontFamily="body" fontSize="md" color="gray.300">
                    {name}
                </Text>
                <HStack alignItems="baseline">
                    <Text fontFamily="heading" fontSize="sm" mr={1}>
                        R$
                    </Text>
                    <Text fontFamily="heading" fontSize="lg">
                        {price}
                    </Text>
                </HStack>
            </VStack>
        </Box>
    );
}
