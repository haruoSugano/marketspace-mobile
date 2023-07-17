import { Box, HStack, Input as NativeBaseInput, Image, ScrollView, Text, FlatList, VStack, Button as ButtonNativeBase, Stack, Container } from "native-base";
import { TouchableOpacity, ImageSourcePropType, SafeAreaView } from "react-native";

import { MagnifyingGlass, Sliders } from "phosphor-react-native";

import testeImage from "@assets/Image.png";
import defaultUserPhotoImg from "@assets/userPhotoDefault.png";

import { HomeHeader } from "@components/HomeHeader";
import { HomeSell } from "@components/HomeSell";
import { UserPhoto } from "@components/UserPhoto";
import { Item } from "@components/Item";
import { useState } from "react";

type props = {
    name: string;
    uri: ImageSourcePropType;
    price: number;
    source: ImageSourcePropType;
    is_new: boolean;
}

export function Home() {
    const [products, setProducts] = useState<props[]>([
        {
            name: "tenis vermelho",
            uri: defaultUserPhotoImg,
            price: 59.90,
            source: testeImage as ImageSourcePropType,
            is_new: true
        },
        {
            name: "tenis azul",
            uri: defaultUserPhotoImg,
            price: 120.90,
            source: testeImage as ImageSourcePropType,
            is_new: false
        },
        {
            name: "tenis amarelo",
            uri: defaultUserPhotoImg,
            price: 160.90,
            source: testeImage as ImageSourcePropType,
            is_new: true
        },
        {
            name: "tenis verde",
            uri: defaultUserPhotoImg,
            price: 350.90,
            source: testeImage as ImageSourcePropType,
            is_new: true
        },
        {
            name: "tenis roxo",
            uri: defaultUserPhotoImg,
            price: 1000.90,
            source: testeImage as ImageSourcePropType,
            is_new: true
        },
        {
            name: "tenis preto",
            uri: defaultUserPhotoImg,
            price: 2500.90,
            source: testeImage as ImageSourcePropType,
            is_new: true
        },
        {
            name: "tenis preto e ranco",
            uri: defaultUserPhotoImg,
            price: 1000.90,
            source: testeImage as ImageSourcePropType,
            is_new: true
        },
        {
            name: "tenis marinho",
            uri: defaultUserPhotoImg,
            price: 2500.90,
            source: testeImage as ImageSourcePropType,
            is_new: true
        },
        {
            name: "tenis preto e dfa",
            uri: defaultUserPhotoImg,
            price: 1000.90,
            source: testeImage as ImageSourcePropType,
            is_new: true
        },
        {
            name: "tenis adf",
            uri: defaultUserPhotoImg,
            price: 2500.90,
            source: testeImage as ImageSourcePropType,
            is_new: true
        },
    ]);

    return (
        <VStack pt={16} pb={5} px={6}>
            <HomeHeader />

            <Text fontFamily="body" fontSize="sm" color="gray.200">
                Seus produtos anunciados para venda
            </Text>

            <HomeSell />

            <Text mt={6}>
                Compre produtos variados
            </Text>
            <NativeBaseInput
                bg="white"
                mt={2}
                px={4}
                height={46}
                fontSize="md"
                fontFamily="body"
                borderWidth={0}
                borderRadius={6}
                placeholderTextColor="gray.400"
                placeholder="Buscar anúncio"
                InputRightElement={
                    <HStack alignItems="center" mr={2}>
                        <TouchableOpacity
                        >
                            <MagnifyingGlass size={22} />
                        </TouchableOpacity>
                        <Box width={0.4} height={18} bg="gray.500" mr={2} ml={2} />
                        <TouchableOpacity>
                            <Sliders size={22} />
                        </TouchableOpacity>
                    </HStack>
                }
            />
            <VStack mt={4}>
                <FlatList
                    contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}
                    data={products}
                    keyExtractor={item => item.name}
                    renderItem={({ item }) => (
                        <Item
                            uri={defaultUserPhotoImg}
                            name={item.name}
                            price={item.price}
                            is_new={item.is_new}
                            source={item.source}
                            alt="foto"
                        />
                    )}
                    maxHeight={400}
                    showsVerticalScrollIndicator={false}
                />
            </VStack>
        </VStack>
    );
}
