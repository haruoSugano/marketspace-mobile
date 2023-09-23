import { useEffect, useState } from "react";
import { Box, FlatList, HStack, Select, Text, VStack, useToast } from "native-base";
import { Platform, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Plus, CaretUp, CaretDown } from "phosphor-react-native";
import { Item } from "@components/Item";
import { AppNavigatorRoutesApp } from "@routes/app.routes";
import { storageAuthTokenGet } from "@storage/storageAuthToken";
import { ProductDTO } from "@dtos/ProductDTO";
import { AppError } from "@utils/AppError";
import { api } from "@services/api";
import { Loading } from "@components/Loading";

export function MyAds() {
    const navigation = useNavigation<AppNavigatorRoutesApp>();
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState("Todos");
    const [products, setProducts] = useState<ProductDTO[]>([]);
    const [allProducts, setAllProducts] = useState<ProductDTO[]>([]);

    function handleNavigateDetailMyAds(product: ProductDTO) {
        const paymentMethods = product.payment_methods.map(method => method.key);

        const productDataFormated = { ...product, payment_methods: paymentMethods };

        navigation.navigate("detailsMyAds", { product: productDataFormated });
    }

    function handleNavigateCreateMyAds() {
        navigation.navigate("createMyAds");
    }

    function handleSelectedStatus(status: string) {
        switch (status) {
            case "all":
                setProducts(allProducts);
                setStatus("Todos")
                break;
            case "active":
                const productActive = allProducts.filter(product => product.is_active === true);

                setProducts(productActive);
                setStatus("Ativos");
                break;
            case "inactive":
                const productInactive = allProducts.filter(product => product.is_active === false);

                setProducts(productInactive);
                setStatus("Inativos");
                break;
            default:
                break;
        }
    }

    async function fetchProducts() {
        try {
            setIsLoading(true);
            const { token } = await storageAuthTokenGet();

            const response = await api.get(`/users/products`,
                { headers: { "Authorization": `Bearer ${token}` } }
            );

            setProducts(response.data);
            setAllProducts(response.data);
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : "Não foi possível carregar os produtos";

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
        fetchProducts();
        setProducts(products)
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <VStack p={6}>
                <HStack mt={5} justifyContent="flex-end" alignItems="center">
                    <Text fontFamily="heading" fontSize="lg" width={210} >
                        Meus anúncios
                    </Text>

                    <TouchableOpacity style={{ width: 35 }} onPress={handleNavigateCreateMyAds}>
                        <Plus />
                    </TouchableOpacity>
                </HStack>

                <HStack mt={6} justifyContent="space-between" alignItems="center">
                    <Text fontFamily="heading">
                        {products.length} anúncios
                    </Text>

                    <Box>
                        <Select
                            selectedValue={status}
                            minWidth={100}
                            height={30}
                            fontFamily="body"
                            accessibilityLabel="Todos"
                            placeholder={status}
                            _selectedItem={{
                                bg: "gray.500"
                            }}
                            onValueChange={itemValue => handleSelectedStatus(itemValue)}
                            dropdownIcon={<CaretDown size={18} />}
                            dropdownOpenIcon={<CaretUp size={18} />}
                        >
                            <Select.Item label="Todos" value="all" />
                            <Select.Item label="Ativos" value="active" />
                            <Select.Item label="Inativos" value="inactive" />
                        </Select>
                    </Box>
                </HStack>

                <VStack mt={4}>
                    <FlatList
                        columnWrapperStyle={{ justifyContent: "space-between" }}
                        data={products}
                        keyExtractor={item => item.id as string}
                        renderItem={({ item }) => (
                            <Box>
                                {
                                    isLoading ? <Loading /> :
                                        <TouchableOpacity onPress={() => handleNavigateDetailMyAds(item)}>
                                            <Item
                                                key={item.id}
                                                uri={null}
                                                name={item.name}
                                                price={item.price}
                                                is_new={item.is_new}
                                                is_activated={item.is_active}
                                                source={{ uri: `${api.defaults.baseURL}/images/${item.product_images[0].path}` }}
                                            />
                                        </TouchableOpacity>
                                }
                            </Box>
                        )}
                        maxHeight={Platform.OS === "android" ? 540 : 430}
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                    />
                </VStack>
            </VStack>
        </SafeAreaView>
    );
}
