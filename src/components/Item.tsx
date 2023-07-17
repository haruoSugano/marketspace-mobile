import { Box, Image, HStack, Text, VStack, IImageProps } from "native-base";
import { UserPhoto } from "./UserPhoto";
import { ImageSourcePropType } from "react-native";

type Props = IImageProps & {
    uri: ImageSourcePropType
    price: number;
    name: string;
    is_new: boolean;
}

export function Item({ uri, price, name, is_new, ...rest }: Props) {
    return (
        <Box width="full">
            <Image
                w={163}
                borderRadius={6}
                {...rest}
            />
            <HStack position="absolute" alignItems="center" mt={1} ml={1}>
                <UserPhoto
                    source={uri}
                    alt="User photo"
                    size={7}
                    mr={16}
                />

                <Box
                    width={16}
                    height={6}
                    bg={is_new ? "blue.light" : "gray.300"}
                    alignItems="center"
                    borderRadius={10}
                    alignContent="flex-end"
                >
                    <Text fontFamily="heading" fontSize="sm" color="white">{is_new ? "NOVO" : "USADO"}</Text>
                </Box>
            </HStack>
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
