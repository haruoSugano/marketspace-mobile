import { useNavigation, useRoute } from "@react-navigation/native";
import { FlatList, VStack, Image, Text, HStack, ScrollView, useToast } from "native-base";
import { Dimensions, Platform, TouchableOpacity } from "react-native";
import { ArrowLeft, PencilSimpleLine } from "phosphor-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { DetailsAdsContent } from "@components/DetailsAdsContent";
import { FormPayment } from "@components/FormPayment";
import { LargButton } from "@components/LargeButton";
import { AppNavigatorRoutesApp } from "@routes/app.routes";
import { api } from "@services/api";
import { storageAuthTokenGet } from "@storage/storageAuthToken";
import { ProductDTO } from "@dtos/ProductDTO";
import { useAuth } from "@hooks/useAuth";

import defaultUserPhotoImg from "@assets/userPhotoDefault.png";
import { AppError } from "@utils/AppError";

const { width } = Dimensions.get('window');

type RouteParamsProps = {
    product: ProductDTO;
}

export function DetailsMyAds() {
    const navigation = useNavigation<AppNavigatorRoutesApp>();
    const { user } = useAuth();
    const route = useRoute();
    const toast = useToast();

    const { product } = route.params as RouteParamsProps;

    function handleNavigateMyAds() {
        navigation.reset({
            index: 0,
            routes: [{ name: "myAds" }]
        });
    }

    function handleNavigateEdit() {
        navigation.navigate("editAds", { product });
    }

    async function handleInactivateOrActivateAds(is_active: boolean) {
        try {
            const { token } = await storageAuthTokenGet();

            if (is_active) {
                await api.patch(`/products/${product.id}`, { is_active: false }, { headers: { "Authorization": `Bearer ${token}` } });

                navigation.setParams({
                    product: {
                        id: product.id,
                        name: product.name,
                        description: product.description,
                        is_active: false,
                        price: product.price,
                        is_new: product.is_new,
                        accept_trade: product.accept_trade,
                        payment_methods: product.payment_methods,
                        product_images: product.product_images
                    }
                });
            } else {
                await api.patch(`/products/${product.id}`, { is_active: true }, { headers: { "Authorization": `Bearer ${token}` } });

                navigation.setParams({
                    product: {
                        name: product.name,
                        description: product.description,
                        is_active: true,
                        price: product.price,
                        is_new: product.is_new,
                        accept_trade: product.accept_trade,
                        payment_methods: product.payment_methods,
                        product_images: product.product_images
                    }
                });
            }

            toast.show({
                title: !is_active ? "Seu anúncio foi ativado" : "Seu anúncio foi desativado",
                placement: "top",
                bgColor: "green.500"
            });

            handleNavigateMyAds();
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : "Não foi possível efetuar essa ação.";

            toast.show({
                title,
                placement: "top",
                bgColor: "red.500"
            });
        }
    }

    async function handleDeleteAd() {
        try {
            const { token } = await storageAuthTokenGet();

            await api.delete(`/products/${product.id}`, { headers: { "Authorization": `Bearer ${token}` } });

            toast.show({
                title: "Seu anúncio foi excluído com sucesso.",
                placement: "top",
                bgColor: "green.500"
            });

            handleNavigateMyAds();
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : "Não foi possível deletar o produto.";

            toast.show({
                title,
                placement: "top",
                bgColor: "red.500"
            });
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <VStack>
                <HStack
                    pr={6}
                    pl={6}
                    pt={6}
                    pb={3}
                    justifyContent={"space-between"}
                    alignItems="center"
                    bg="gray.600"
                >
                    <TouchableOpacity style={{ width: 40 }} onPress={handleNavigateMyAds}>
                        <ArrowLeft />
                    </TouchableOpacity>

                    <TouchableOpacity style={{ width: 35 }} onPress={handleNavigateEdit}>
                        <PencilSimpleLine />
                    </TouchableOpacity>
                </HStack>

                <FlatList
                    data={product?.product_images}
                    renderItem={({ item }) => (
                        <Image
                            source={{ uri: `${api.defaults.baseURL}/images/${item.path}` }}
                            alt="foto"
                            width={width}
                            h={210}
                            key={item.id}
                        />
                    )}
                    horizontal
                    pagingEnabled
                    keyExtractor={(item) => item.id}
                />
                <ScrollView p={6} h={Platform.OS === "android" ? "50%" : "42%"}>
                    <DetailsAdsContent
                        uriUserPhoto={user.avatar ? { uri: `${api.defaults.baseURL}/images/${user.avatar}` } : defaultUserPhotoImg}
                        name={user.name}
                        is_new={product?.is_new as boolean}
                        product={product?.name as string}
                        price={product?.price as number}
                        description={product?.description as string}
                        exchange={product?.accept_trade as boolean}
                    />

                    <VStack mt={1} mb={8}>
                        <Text fontFamily="heading">
                            Meios de pagamento:
                        </Text>

                        {
                            product?.payment_methods.map((typePayment, key) => {
                                return <FormPayment
                                    key={key}
                                    payment={typePayment}
                                />
                            })
                        }
                    </VStack>
                </ScrollView>

                <VStack pr={6} pl={6}>
                    <LargButton
                        bgColor={product?.is_active ? "gray.100" : "blue.light"}
                        textColor="white"
                        title={product?.is_active ? "Desativar anúncios" : "Reativar anúncio"}
                        icon="POWER"
                        onPress={() => handleInactivateOrActivateAds(product?.is_active as boolean)}
                    />

                    <LargButton
                        bgColor="gray.500"
                        textColor="gray.100"
                        title="Excluir anúncio"
                        icon="DELETE"
                        onPress={handleDeleteAd}
                    />
                </VStack>
            </VStack>
        </SafeAreaView>
    );
}
