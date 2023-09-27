import { useEffect, useState } from "react";
import { Box, HStack, Input as NativeBaseInput, Text, FlatList, VStack, Modal, Heading, useToast } from "native-base";
import { TouchableOpacity, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Controller, useForm } from "react-hook-form";
import { MagnifyingGlass, Sliders } from "phosphor-react-native";


import defaultUserPhotoImg from "@assets/userPhotoDefault.png";

import { HomeHeader } from "@components/HomeHeader";
import { HomeSell } from "@components/HomeSell";
import { Item } from "@components/Item";
import { Condition } from "@components/Condition";
import { SmallButton } from "@components/SmallButton";
import { Trade } from "@components/Trade";
import { PaymentMethods } from "@components/Payments";

import { AppNavigatorRoutesApp } from "@routes/app.routes";
import { useAuth } from "@hooks/useAuth";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { FormatProductData, QueryFilterProducts } from "@utils/Function";
import { storageAuthTokenGet } from "@storage/storageAuthToken";

import { ProductDTO } from "@dtos/ProductDTO";
import { ProductImageDTO } from "@dtos/ProductImageDTO";

type FormDataProps = {
    name: string;
    accept_trade: boolean;
    payment_methods: string[];
}

type ProductProps = {
    id: string;
    name: string;
    description: string;
    is_new: boolean;
    price: number;
    is_active: boolean;
    accept_trade: boolean;
    payment_methods: any[];
    product_images: ProductImageDTO[];
    user: {
        avatar: string;
    }
}

export function Home() {
    const { user } = useAuth();
    const toast = useToast();
    const navigation = useNavigation<AppNavigatorRoutesApp>();
    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({});

    const [showModal, setShowModal] = useState(false);
    const [isNewModal, setIsNewModal] = useState(false);
    const [isUsedModal, setIsUsedModal] = useState(false);
    const [isNew, setIsNew] = useState<boolean | undefined>();
    const [paymentSelected, setPaymentSelected] = useState<string[]>([]);
    const [products, setProducts] = useState<ProductProps[]>([]);
    const [myProducts, setMyProducts] = useState<ProductDTO[]>([]);

    async function handleNavigateDetailMyAds(productId: string) {
        const { token } = await storageAuthTokenGet();
        
        const responseProductByUser = await api.get(`/products/${productId}`,
                { headers: { "Authorization": `Bearer ${token}` } }
            );

        navigation.navigate("detailsAds", { product: responseProductByUser.data });
    }

    function handleIsNewIsUsedCondition(is_new: boolean, condition: string) {
        switch (condition) {
            case "new":
                setIsNewModal(true);
                setIsUsedModal(false);
                setIsNew(true);
                break;
            case "used":
                setIsNewModal(false);
                setIsUsedModal(true);
                setIsNew(false);
                break;
            default:
                setIsNew(undefined);
                break;
        }
    }

    function handleDisableUsedOrNewOption(disabled: boolean, options: string) {
        switch (options) {
            case "new":
                setIsNewModal(disabled);
                setIsNew(undefined);
                break;
            case "used":
                setIsUsedModal(disabled);
                setIsNew(undefined);
                break;
            default:
                break;
        }
    }

    async function handleApplyFilters({ accept_trade, payment_methods }: FormDataProps) {
        try {
            const { token } = await storageAuthTokenGet();
            const query = QueryFilterProducts(isNew, accept_trade, payment_methods);

            const responseFilterProducts = await api.get(`/products/?${query}`,
                { headers: { "Authorization": `Bearer ${token}` } }
            );

            const formatFilteredProductsData = FormatProductData(responseFilterProducts.data);

            setProducts(formatFilteredProductsData);
            setIsNewModal(false);
            setIsUsedModal(false);
            setIsNew(undefined);
        } catch (error) {
            console.log(error);
        }
    }

    async function handleResetFilter() {
        const { token } = await storageAuthTokenGet();

        const responseAllProducts = await api.get(`/products`, { headers: { "Authorization": `Bearer ${token}` } });

        const formatProductsData = FormatProductData(responseAllProducts.data);

        setProducts(formatProductsData);
    }

    async function handleFilterByProduct({ name }: FormDataProps) {
        const { token } = await storageAuthTokenGet();

        const responseProductData = await api.get(`/products/?query=${name}`, { headers: { "Authorization": `Bearer ${token}` } });

        const formatProductData = FormatProductData(responseProductData.data);

        setProducts(formatProductData);
    }

    async function fetchProducts() {
        try {
            const { token } = await storageAuthTokenGet();

            const responseAllProducts = await api.get(`/products`, { headers: { "Authorization": `Bearer ${token}` } });
           
            const formatProductsData = FormatProductData(responseAllProducts.data);

            setProducts(formatProductsData);
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : "Não foi possível carregar os produtos";

            toast.show({
                title,
                placement: "top",
                bgColor: "red.500"
            });
        }
    }

    async function fetchMyProducts() {
        const { token } = await storageAuthTokenGet();

        const responseAllProducts = await api.get(`/users/products`,
            { headers: { "Authorization": `Bearer ${token}` } }
        );

        setMyProducts(responseAllProducts.data);
    }

    useEffect(() => {
        fetchProducts();
        fetchMyProducts();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <VStack pt={6} pb={4} px={6}>
                <HomeHeader
                    name={user.name}
                    avatarUrl={user.avatar}
                />

                <Text fontFamily="body" fontSize="sm" color="gray.200">
                    Seus produtos anunciados para venda
                </Text>

                <HomeSell
                    quantity={myProducts.filter(product => product.is_active).length}
                />

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
                                        onPress={handleSubmit(handleFilterByProduct)}
                                    >
                                        <MagnifyingGlass size={22} />
                                    </TouchableOpacity>
                                    <Box width={0.4} height={18} bg="gray.500" mr={2} ml={2} />
                                    <TouchableOpacity onPress={() => setShowModal(true)}>
                                        <Sliders size={22} />
                                    </TouchableOpacity>
                                </HStack>
                            }
                            onChangeText={onChange}
                            value={value}
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
                                    <TouchableOpacity
                                        onPress={() => handleIsNewIsUsedCondition(true, "new")}
                                        style={{ marginRight: 5 }}
                                    >
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
                                                        onPress={() => handleDisableUsedOrNewOption(false, "new")}
                                                    />
                                                    :
                                                    <Text
                                                        fontFamily="heading"
                                                        fontSize="sm"
                                                        color={isNewModal ? "white" : "gray.300"}
                                                    >
                                                        NOVO
                                                    </Text>
                                            }
                                        </Box>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => handleIsNewIsUsedCondition(false, "used")}
                                    >
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
                                                        onPress={() => handleDisableUsedOrNewOption(false, "used")}
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
                                        onPress={handleResetFilter}
                                    />

                                    <SmallButton
                                        title="Aplicar filtros"
                                        bgColor="gray.100"
                                        textColor="white"
                                        onPress={handleSubmit(handleApplyFilters)}
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
                        keyExtractor={item => item.id as string}
                        renderItem={({ item }) => (
                            <Box>
                                <TouchableOpacity onPress={() => handleNavigateDetailMyAds(item.id)}>
                                    <Item
                                        uri={item.user.avatar ? { uri: `${api.defaults.baseURL}/images/${item.user.avatar}` } : defaultUserPhotoImg}
                                        name={item.name}
                                        price={item.price}
                                        is_new={item.is_new}
                                        alt={item.name}
                                        source={item.product_images[0].path ? { uri: `${api.defaults.baseURL}/images/${item.product_images[0].path}` } : defaultUserPhotoImg}
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
