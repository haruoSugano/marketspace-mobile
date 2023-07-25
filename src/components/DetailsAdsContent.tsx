import { HStack, VStack, Text, Box, FlatList } from "native-base";
import { UserPhoto } from "./UserPhoto";
import { ImageSourcePropType } from "react-native";

type Props = {
    uriUserPhoto: ImageSourcePropType;
    name: string;
    is_new: boolean;
    product: string;
    price: number;
    description: string;
    exchange: boolean;
}

export function DetailsAdsContent({ uriUserPhoto, name, is_new, product, price, description, exchange }: Props) {
    return (
        <VStack alignContent="center">
            <HStack>
                <UserPhoto
                    source={uriUserPhoto}
                    alt="User photo"
                    size={7}
                    mr={2}
                />

                <Text fontFamily="heading">
                    {name}
                </Text>
            </HStack>

            <Box
                width={12}
                height={5}
                bg="blue.light"
                alignItems="center"
                borderRadius={12}
                alignContent="flex-end"
                mt={4}
            >
                <Text fontFamily="heading" fontSize="sm" color="white">{is_new ? "NOVO" : "USADO"}</Text>
            </Box>

            <HStack mt={1} justifyContent="space-between">
                <Text fontFamily="heading" fontSize="lg">
                    {product}
                </Text>

                <Text fontFamily="heading" fontSize="lg" color="blue.light">
                    <Text fontFamily="heading" fontSize="sm">R$</Text>
                    {(price).toString()}
                </Text>
            </HStack>

            <Text mt={1}>
                {description}
            </Text>

            <HStack mt={2}>
                <Text mr={3} fontFamily="heading">
                    Aceita troca?
                </Text>
                <Text fontFamily="body">
                    {
                        exchange ? "Sim" : "Não"
                    }
                </Text>
            </HStack>
        </VStack>
    );
}
