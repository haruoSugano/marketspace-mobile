import { useEffect, useState } from "react";
import { Dimensions, TouchableOpacity, Linking, Platform } from "react-native";
import { Box, Button, FlatList, HStack, Image, Text, VStack, useToast } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, WhatsappLogo } from "phosphor-react-native";

import defaultUserPhotoImg from "@assets/userPhotoDefault.png";

import { FormPayment } from "@components/FormPayment";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigatorRoutesApp } from "@routes/app.routes";
import { DetailsAdsContent } from "@components/DetailsAdsContent";
import { AppError } from "@utils/AppError";
import { api } from "@services/api";
import { FormatInputPrice } from "@utils/Function";
import { DetailsProductDTO } from "@dtos/DetailsProductDTO";

const { width } = Dimensions.get('window');

type RouteParamsProps = {
    product: DetailsProductDTO;
}

export function DetailsAds() {
    const navigation = useNavigation<AppNavigatorRoutesApp>();
    const route = useRoute();
    const toast = useToast();

    const { product } = route.params as RouteParamsProps;

    const [productData, setProductData] = useState<DetailsProductDTO>(product);
    console.log(product)
    function handleGoHome() {
        navigation.reset({
            index: 0,
            routes: [{ name: "home" }]
        });
    }

    function handleWhatsappContact() {
        Linking.openURL(`https://wa.me/55${productData.user.tel}`).catch((error) => console.log(error))
    }

    async function fetchAdDetails() {
        try {
            setProductData(product);
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : "Não foi possível carregar os detalhes do produto.";

            toast.show({
                title,
                placement: "top",
                bgColor: "red.500"
            });
        }
    }

    useEffect(() => {
        fetchAdDetails();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <VStack>
                <HStack p={5}>
                    <TouchableOpacity onPress={handleGoHome}>
                        <ArrowLeft />
                    </TouchableOpacity>
                </HStack>

                <FlatList
                    data={productData.product_images}
                    renderItem={({ item }) => (
                        <Image
                            source={{ uri: `${api.defaults.baseURL}/images/${item.path}` }}
                            alt="foto"
                            width={width}
                            h={Platform.OS === "android" ? 210 : 180}
                        />
                    )}
                    horizontal
                    pagingEnabled
                    keyExtractor={(item, index) => index.toString()}
                />

                <Box p={5}>
                    <DetailsAdsContent
                        uriUserPhoto={productData.user.avatar ? { uri: `${api.defaults.baseURL}/images/${productData.user.avatar}` } : defaultUserPhotoImg}
                        name={productData.user.name}
                        is_new={productData.is_new}
                        product={productData.name}
                        price={FormatInputPrice(productData.price)}
                        description={productData.description}
                        exchange={productData.accept_trade}
                    />

                    <VStack mt={2} mb={Platform.OS === "android" ? 0 : 4} h={Platform.OS === "android" ? 230 : 78}>
                        <Text fontFamily="heading">
                            Meios de pagamento:
                        </Text>

                        <FlatList
                            data={productData.payment_methods}
                            renderItem={({ item }) => (
                                <FormPayment
                                    payment={item.key}
                                />
                            )}
                        />
                    </VStack>
                </Box>

                <HStack
                    justifyContent="space-between"
                    alignItems="center"
                    alignSelf="center"
                    bg="white"
                    height="10%"
                    width="full"
                    p={4}
                >
                    <HStack alignItems="center" alignSelf="center">
                        <Text fontFamily="heading" fontSize="sm" mr={1}>
                            R$
                        </Text>

                        <Text fontSize="lg" fontFamily="heading">
                            {FormatInputPrice(productData.price)}
                        </Text>
                    </HStack>

                    <Button height={10} width={150} onPress={handleWhatsappContact}>
                        <HStack alignItems="center">
                            <WhatsappLogo color="white" size={18} />
                            <Text color="white" ml={1}>
                                Entrar em contato
                            </Text>
                        </HStack>
                    </Button>
                </HStack>
            </VStack>
        </SafeAreaView>
    );
}
