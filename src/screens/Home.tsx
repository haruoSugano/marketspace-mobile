import { Box, HStack, Input as NativeBaseInput, Text, FlatList, VStack, Modal, Heading, Pressable, Switch, Checkbox } from "native-base";
import { TouchableOpacity, ImageSourcePropType } from "react-native";

import { MagnifyingGlass, Sliders } from "phosphor-react-native";

import testeImage from "@assets/Image.png";
import defaultUserPhotoImg from "@assets/userPhotoDefault.png";

import { HomeHeader } from "@components/HomeHeader";
import { HomeSell } from "@components/HomeSell";
import { UserPhoto } from "@components/UserPhoto";
import { Item } from "@components/Item";
import { useState } from "react";
import { Condition } from "@components/Condition";
import { SmallButton } from "@components/SmallButton";

type props = {
    name: string;
    uri: ImageSourcePropType;
    price: number;
    source: ImageSourcePropType;
    is_new: boolean;
}

export function Home() {
    const [showModal, setShowModal] = useState(false);
    const [isNewModal, setIsNewModal] = useState(false);
    const [isUsedModal, setIsUsedModal] = useState(false);
    const [paymentSelected, setPaymentSelected] = useState(["Boleto", "Depósito Bancário"]);
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
                        <TouchableOpacity onPress={() => setShowModal(true)}>
                            <Sliders size={22} />
                        </TouchableOpacity>
                    </HStack>
                }
            />
            <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="full">
                <Modal.Content height="70%" marginTop="auto" borderTopRadius={30}>
                    <Modal.Body ml={2} mr={2} mt={5}>
                        <Heading fontFamily="heading">
                            Filtrar anúncios
                        </Heading>
                        <Modal.CloseButton />
                        <VStack mt={5}>
                            <Text fontFamily="heading">
                                Condição
                            </Text>
                            <HStack mt={2}>
                                <TouchableOpacity onPress={() => setIsNewModal(true)} style={{ marginRight: 5 }}>
                                    <Box
                                        width={isNewModal ? 24 : 16}
                                        height={8}
                                        bg={isNewModal ? "blue.light" : "gray.500"}
                                        alignItems="center"
                                        borderRadius={16}
                                        p={1}
                                    >
                                        {
                                            isNewModal ?
                                                <Condition
                                                    condition="NOVO"
                                                    onPress={() => setIsNewModal(false)}
                                                />
                                                :
                                                <Text
                                                    fontFamily="heading"
                                                    fontSize="sm"
                                                    color={isNewModal ? "white" : "gray.300"}>
                                                    NOVO
                                                </Text>
                                        }
                                    </Box>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => setIsUsedModal(true)}>
                                    <Box
                                        width={isUsedModal ? 24 : 16}
                                        height={8}
                                        bg={isUsedModal ? "blue.light" : "gray.500"}
                                        alignItems="center"
                                        borderRadius={16}
                                        p={1}
                                    >
                                        {
                                            isUsedModal ?
                                                <Condition
                                                    condition="USADO"
                                                    onPress={() => setIsUsedModal(false)}
                                                />
                                                :
                                                <Text
                                                    fontFamily="heading"
                                                    fontSize="sm"
                                                    color={isUsedModal ? "white" : "gray.300"}
                                                >
                                                    USADO
                                                </Text>
                                        }
                                    </Box>
                                </TouchableOpacity>
                            </HStack>
                            <VStack alignItems="flex-start" mt={4}>
                                <Text fontFamily="heading">
                                    Aceita troca?
                                </Text>
                                <Switch size="lg" colorScheme="primary" />
                            </VStack>
                            <VStack>
                                <Text fontFamily="heading" mt={3}>
                                    Meios de pagamentos aceitos
                                </Text>
                                <Box mt={2}>
                                    <Checkbox.Group
                                        defaultValue={paymentSelected}
                                        onChange={value => setPaymentSelected(value || [])}
                                    >
                                        <Checkbox value="Boleto" my={1}>
                                            Boleto
                                        </Checkbox>
                                        <Checkbox value="Pix" my={1}>
                                            Pix
                                        </Checkbox>
                                        <Checkbox value="Dinheiro" my={1}>
                                            Dinheiro
                                        </Checkbox>
                                        <Checkbox value="Cartão de Crédito" my={1}>
                                            Cartão de Crédito
                                        </Checkbox>
                                        <Checkbox value="Depósito Bancário" my={1}>
                                            Depósito Bancário
                                        </Checkbox>
                                    </Checkbox.Group>
                                </Box>
                            </VStack>
                            <HStack mt={4} justifyContent="space-between">
                                <SmallButton
                                    title="Resetar filtros"
                                    bgColor="gray.500"
                                    textColor="gray.100"
                                />

                                <SmallButton
                                    title="Aplicar filtros"
                                    bgColor="gray.100"
                                    textColor="white"
                                />
                            </HStack>
                        </VStack>
                    </Modal.Body>
                </Modal.Content>
            </Modal>
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
