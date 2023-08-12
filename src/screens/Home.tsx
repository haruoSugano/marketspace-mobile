import { useState } from "react";
import { Box, HStack, Input as NativeBaseInput, Text, FlatList, VStack, Modal, Heading, Pressable, Switch, Checkbox } from "native-base";
import { TouchableOpacity, ImageSourcePropType, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import { MagnifyingGlass, Sliders } from "phosphor-react-native";

import testeImage from "@assets/Image.png";
import defaultUserPhotoImg from "@assets/userPhotoDefault.png";

import { HomeHeader } from "@components/HomeHeader";
import { HomeSell } from "@components/HomeSell";
import { Item } from "@components/Item";
import { Condition } from "@components/Condition";
import { SmallButton } from "@components/SmallButton";
import { AppNavigatorRoutesApp } from "@routes/app.routes";
import { Trade } from "@components/Trade";
import { Controller, useForm } from "react-hook-form";
import { PaymentMethods } from "@components/Payments";

type props = {
    name: string;
    uri: ImageSourcePropType;
    price: number;
    source: ImageSourcePropType;
    is_new: boolean;
    is_activated: boolean;
}

type FormDataProps = {
    name: string;
    accept_trade: boolean;
    payment_methods: string[];
}

export function Home() {
    const [showModal, setShowModal] = useState(false);
    const [isNewModal, setIsNewModal] = useState(false);
    const [isUsedModal, setIsUsedModal] = useState(false);
    const [paymentSelected, setPaymentSelected] = useState<string[]>([]);
    const navigation = useNavigation<AppNavigatorRoutesApp>();
    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({});
    const [products, setProducts] = useState<props[]>([
        {
            name: "tenis vermelho",
            uri: defaultUserPhotoImg,
            price: 59.90,
            source: testeImage as ImageSourcePropType,
            is_new: true,
            is_activated: false,
        },
        {
            name: "tenis azul",
            uri: defaultUserPhotoImg,
            price: 120.90,
            source: testeImage as ImageSourcePropType,
            is_new: false,
            is_activated: false,
        },
        {
            name: "tenis amarelo",
            uri: defaultUserPhotoImg,
            price: 160.90,
            source: testeImage as ImageSourcePropType,
            is_new: true,
            is_activated: false,
        },
        {
            name: "tenis verde",
            uri: defaultUserPhotoImg,
            price: 350.90,
            source: testeImage as ImageSourcePropType,
            is_new: true,
            is_activated: false,
        },
        {
            name: "tenis roxo",
            uri: defaultUserPhotoImg,
            price: 1000.90,
            source: testeImage as ImageSourcePropType,
            is_new: true,
            is_activated: false,
        },
        {
            name: "tenis preto",
            uri: defaultUserPhotoImg,
            price: 2500.90,
            source: testeImage as ImageSourcePropType,
            is_new: true,
            is_activated: false,
        },
        {
            name: "tenis preto e ranco",
            uri: defaultUserPhotoImg,
            price: 1000.90,
            source: testeImage as ImageSourcePropType,
            is_new: true,
            is_activated: true,
        },
        {
            name: "tenis marinho",
            uri: defaultUserPhotoImg,
            price: 2500.90,
            source: testeImage as ImageSourcePropType,
            is_new: true,
            is_activated: true,
        },
        {
            name: "tenis preto e dfa",
            uri: defaultUserPhotoImg,
            price: 1000.90,
            source: testeImage as ImageSourcePropType,
            is_new: true,
            is_activated: false,
        },
        {
            name: "tenis adf",
            uri: defaultUserPhotoImg,
            price: 2500.90,
            source: testeImage as ImageSourcePropType,
            is_new: true,
            is_activated: true,
        },
    ]);

    function handleNavigateDetailMyAds() {
        navigation.navigate("detailsAds");
    }

    function handlePaymentSelected(selectedPayment: string[]) {
        setPaymentSelected(selectedPayment);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <VStack pt={6} pb={4} px={6}>
                <HomeHeader />

                <Text fontFamily="body" fontSize="sm" color="gray.200">
                    Seus produtos anunciados para venda
                </Text>

                <HomeSell />

                <Text mt={4}>
                    Compre produtos variados
                </Text>

                <Controller
                    control={control}
                    name="name"
                    render={({ field: { onChange, value } }) => (
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
                    )}
                />

                <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="full">
                    <Modal.Content height={Platform.OS === "android" ? "70%" : "85%"} marginTop="auto" borderTopRadius={30}>
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

                                <Box mt={5}>
                                    <Controller
                                        control={control}
                                        name="accept_trade"
                                        render={({ field: { onChange, value } }) => (
                                            <Trade
                                                trackColor={{ false: 'gray.500', true: '#81b0ff' }}
                                                thumbColor={value ? 'gray.500' : 'white'}
                                                onValueChange={onChange}
                                                value={value}
                                            />
                                        )}
                                    />

                                    <Controller
                                        control={control}
                                        name="payment_methods"
                                        render={({ field: { onChange, value } }) => (
                                            <PaymentMethods
                                                defaultValue={paymentSelected}
                                                onChange={(values) => onChange(values)}
                                            />
                                        )}
                                    />
                                </Box>

                                <HStack mt={8} justifyContent="space-between">
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
                        columnWrapperStyle={{ justifyContent: "space-between" }}
                        data={products}
                        keyExtractor={item => item.name}
                        renderItem={({ item }) => (
                            <Box>
                                <TouchableOpacity onPress={handleNavigateDetailMyAds}>
                                    <Item
                                        uri={defaultUserPhotoImg}
                                        name={item.name}
                                        price={item.price}
                                        is_new={item.is_new}
                                        source={item.source}
                                        alt="foto"
                                    />
                                </TouchableOpacity>
                            </Box>
                        )}
                        maxHeight={Platform.OS === "android" ? 420 : 270}
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                    />
                </VStack>
            </VStack>
        </SafeAreaView>
    );
}
