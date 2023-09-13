import { useEffect, useState } from "react";
import { Dimensions, Platform } from "react-native";
import { Text, VStack, Image, FlatList, Box, HStack, ScrollView, useToast } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";

import { AppNavigatorRoutesApp } from "@routes/app.routes";

import defaultUserPhotoImg from "@assets/userPhotoDefault.png";

import { FormPayment } from "@components/FormPayment";
import { DetailsAdsContent } from "@components/DetailsAdsContent";
import { IconButton } from "@components/IconButton";
import { api } from "@services/api";
import { ProductDTO } from "@dtos/ProductDTO";
import { AppError } from "@utils/AppError";
import { useAuth } from "@hooks/useAuth";
import { storageAuthTokenGet } from "@storage/storageAuthToken";

const { width } = Dimensions.get('window');

type RouteParamsProps = {
    product: ProductDTO;
}

export function AdsPreview() {
    const navigation = useNavigation<AppNavigatorRoutesApp>();
    const { user } = useAuth();
    const toast = useToast();
    const route = useRoute();
    const [isLoading, setIsLoading] = useState(true);

    const { product } = route.params as RouteParamsProps;

    const [productData, setProductData] = useState<ProductDTO>({} as ProductDTO);
    const [productImages, setProductImages] = useState<any[]>([]);

    function handleNavigateEdit() {
        navigation.navigate("createMyAds");
    }

    async function handlePublish() {
        try {
            setIsLoading(true);

            const { token } = await storageAuthTokenGet();
            const formDataProductImage = new FormData();

            const responseProductData = await api.post("/products",
                {
                    name: productData.name,
                    description: productData.description,
                    is_new: productData.is_new,
                    price: productData.price,
                    accept_trade: productData.accept_trade,
                    payment_methods: productData.payment_methods
                },
                { headers: { "Authorization": `Bearer ${token}` } }
            );

            productImages.forEach((product) => {
                formDataProductImage.append("images", product as Blob, product.name);
            });

            formDataProductImage.append('product_id', responseProductData.data.id);

            await api.post("/products/images", formDataProductImage, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            toast.show({
                title: "Seu anúncio foi criado com sucesso.",
                placement: "top",
                bgColor: "green.500"
            });

            navigation.navigate("myAds");
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : "Não foi possível publicar o produto.";

            toast.show({
                title,
                placement: "top",
                bgColor: "red.500"
            });
        } finally {
            setIsLoading(false);
        }
    }

    async function fetchAdsDetails() {
        try {
            setIsLoading(true);
        
            setProductData(product);
            setProductImages(product.product_images);
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : "Não foi possível carregar os detalhes do produto.";

            toast.show({
                title,
                placement: "top",
                bgColor: "red.500"
            });
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchAdsDetails();
    }, [product]);

    return (
        <SafeAreaView style={{ flex: 1, height: "15%", backgroundColor: "#647AC7" }}>
            <VStack>
                <Box alignItems="center" mt={5}>
                    <Text fontFamily="heading" color="white">
                        Pré visualização do anúncio
                    </Text>

                    <Text fontFamily="body" color="white">
                        É assim que seu produto vai aparecer!
                    </Text>
                </Box>
                <FlatList
                    data={productImages}
                    renderItem={({ item }) => (
                        <Image
                            key={item.id}
                            source={{ uri: item.uri }}
                            alt="foto"
                            width={width}
                            h={250}
                        />
                    )}
                    horizontal
                    pagingEnabled
                    keyExtractor={(item, index) => index.toString()}
                    mt={3}
                />

                <ScrollView
                    p={6}
                    h={Platform.OS === "android" ? "50%" : "42%"}
                    bg="white"
                >
                    <DetailsAdsContent
                        uriUserPhoto={user.avatar ? { uri: `${api.defaults.baseURL}/images/${user.avatar}` } : defaultUserPhotoImg}
                        name={user.name}
                        is_new={product.is_new}
                        product={product.name}
                        price={product.price}
                        description={product.description}
                        exchange={product.accept_trade}
                    />

                    <VStack mt={1} mb={8}>
                        <Text fontFamily="heading">
                            Meios de pagamento:
                        </Text>
                        <Box>
                            {
                                product.payment_methods.map((typePayment) => {
                                    return <FormPayment
                                        key={typePayment}
                                        payment={typePayment}
                                    />
                                })
                            }
                        </Box>
                    </VStack>
                </ScrollView>

                <HStack
                    bg="white"
                    pl={6}
                    pr={6}
                    w="full"
                    h="20%"
                    justifyContent="space-between"
                >
                    <IconButton
                        title="Voltar e editar"
                        bgColor="gray.500"
                        textColor="gray.100"
                        typeIcon="ARROW"
                        onPress={handleNavigateEdit}
                    />

                    <IconButton
                        title="Publicar"
                        bgColor="blue.light"
                        textColor="white"
                        typeIcon="TAG"
                        onPress={handlePublish}
                        isLoading={isLoading}
                    />
                </HStack>
            </VStack>
        </SafeAreaView>

    );
}
