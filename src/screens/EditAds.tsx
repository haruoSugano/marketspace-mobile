import { useState } from "react";
import { Input as InputNativeBase, HStack, Text, VStack, TextArea, Box, Radio, Stack, ScrollView, FormControl, useToast, Image } from "native-base";
import { AppNavigatorRoutesApp } from "@routes/app.routes";
import { Plus, XCircle } from "phosphor-react-native";
import { Platform, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

import { useNavigation, useRoute } from "@react-navigation/native";

import { Header } from "@components/Header";
import { SmallButton } from "@components/SmallButton";
import { Trade } from "@components/Trade";
import { PaymentMethods } from "@components/Payments";
import { ProductDTO } from "@dtos/ProductDTO";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { api } from "@services/api";

type FormDataProps = {
    name: string;
    description: string;
    is_new: boolean;
    price: number;
    accept_trade: boolean;
    payment_methods: string[];
    user_id: string;
}

type DeleteImageProps = {
    id: string;
}

type RouteParamsProps = {
    product: ProductDTO;
}

const createAdsSchema = yup.object({
    name: yup.string().required("Informe o nome do anúncio."),
    description: yup.string().required("Digite a descrição deste produto"),
    is_new: yup.boolean().required("Informe a codição deste produto"),
    price: yup.number().required("Informe o preço deste anuncio").typeError("Digite um valor numérico"),
});

export function EditAds() {
    const navigation = useNavigation<AppNavigatorRoutesApp>();
    const route = useRoute();
    const toast = useToast();

    const { product } = route.params as RouteParamsProps;

    const [fileExtension, setFileExtension] = useState<string | undefined>("");
    const [paymentSelected, setPaymentSelected] = useState<string[]>(product.payment_methods);
    const [productImages, setProductImages] = useState<any[]>(product.product_images);
    const [imagesDeletedWillBeDatabase, setImagesDeletedWillBeDatabase] = useState<DeleteImageProps[]>([]);
    const [updateProductImages, setUpdateProductImages] = useState<any[]>([]);

    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
        resolver: yupResolver(createAdsSchema),
        defaultValues: {
            name: product.name,
            description: product.description,
            is_new: product.is_new ? true : false,
            price: product.price,
            accept_trade: product.accept_trade,
        }
    });



    function handleNavigateMyAds() {
        navigation.reset({
            index: 0,
            routes: [{ name: "myAds" }]
        });
    }

    function handleNavigateAdsPreview({ name, description, is_new, price, accept_trade }: FormDataProps) {

        if(paymentSelected.length === 0) {
            return toast.show({
                title: "Informe por favor a forma de pagamento",
                placement: "top",
                bgColor: "red.500"
            });
        }

        const updatedProductData = {
            ...product,
            name: name,
            description: description,
            is_new: is_new,
            price: price,
            accept_trade: accept_trade,
            payment_methods: paymentSelected,
            product_images: productImages
        };

        const productImagesData = updateProductImages.map((productImage, key) => {
            return {
                name: `${key + 1}-${name}.${fileExtension}`.toLocaleLowerCase(),
                uri: productImage.uri,
                type: `${productImage.type}/${fileExtension}`
            }
        });

        navigation.navigate("editAdsPreview", {
            product: updatedProductData,
            deleteImages: imagesDeletedWillBeDatabase,
            updateImages: productImagesData
        });
    }

    async function handleProductImagesSelect() {
        const productImage = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
            aspect: [4, 4],
            allowsEditing: true
        });

        if (productImage.canceled) {
            return;
        }

        const productImageAssets = productImage.assets[0];

        if (productImageAssets.uri) {
            const photoInfo = await FileSystem.getInfoAsync(productImageAssets.uri);

            if (photoInfo.size && (photoInfo.size / 1024 / 1024) > 1) {
                return toast.show({
                    title: "Essa imagem é muito grande. Escolha uma de até 5MB",
                    placement: "top",
                    bgColor: "red.500"
                });
            }

            const productImageExtension = productImageAssets.uri.split('.').pop();

            if (productImages.length > 2) {
                return toast.show({
                    title: "Só é possível adicionar 3 imagens.",
                    placement: "top",
                    bgColor: "red.500"
                });
            }

            setFileExtension(productImageExtension);
            setProductImages(productImage => [...productImage, productImageAssets]);
            setUpdateProductImages(productImage => [...productImage, productImageAssets]);
        }
    }

    async function handleDeleteProductImage(path: string, uri: string) {
        if (!path) {
            setProductImages(productImages.filter(productImage => productImage.uri !== uri));
            return;
        }

        const deletedImage = await productImages.find((image) => image.path === path);

        if (deletedImage) {
            const productImagesUpdated = productImages.filter(productImage => productImage.path !== path);

            setProductImages(productImagesUpdated);
            setImagesDeletedWillBeDatabase(imagesDeletedWillBeDatabase => [...imagesDeletedWillBeDatabase, deletedImage.id]);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header
                onPress={handleNavigateMyAds}
                title="Editar anúncio"
            />
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
                height="90%"
                backgroundColor="gray.600"
            >

                <VStack mt={3} pl={6} pr={6}>
                    <Text fontFamily="heading" fontSize="md">
                        Imagens
                    </Text>

                    <Text color="gray.300" mt={1}>
                        Escolha até três imagens para mostrar o quando o seu produto é incrível!
                    </Text>

                    <HStack mt={3}>
                        {
                            productImages.length === 3 ?
                                productImages.map((productImage, key) => {
                                    return (
                                        <HStack key={key}>
                                            <Image
                                                w={100}
                                                h={100}
                                                borderRadius={6}
                                                source={productImage.path ? { uri: `${api.defaults.baseURL}/images/${productImage.path}` } : productImage}
                                                alt="Imagem do produto"
                                                mr={2}
                                            />
                                            <TouchableOpacity
                                                style={{
                                                    position: "absolute",
                                                    marginLeft: "65%",
                                                    marginTop: 5
                                                }}
                                                onPress={() => handleDeleteProductImage(productImage.path, productImage.uri)}
                                            >
                                                <XCircle size={24} color="white" />
                                            </TouchableOpacity>
                                        </HStack>
                                    )
                                })

                                :

                                <HStack>
                                    {
                                        productImages.map((productImage, key) => {
                                            return (
                                                <HStack key={key}>
                                                    <Image
                                                        w={100}
                                                        h={100}
                                                        borderRadius={6}
                                                        source={productImage.path ? { uri: `${api.defaults.baseURL}/images/${productImage.path}` } : productImage}
                                                        alt="Imagem do produto"
                                                        mr={2}
                                                    />
                                                    <TouchableOpacity
                                                        style={{
                                                            position: "absolute",
                                                            marginLeft: "65%",
                                                            marginTop: 5
                                                        }}
                                                        onPress={() => handleDeleteProductImage(productImage.path, productImage.uri)}
                                                    >
                                                        <XCircle size={24} color="white" />
                                                    </TouchableOpacity>
                                                </HStack>
                                            )
                                        })
                                    }

                                    <TouchableOpacity
                                        style={{
                                            backgroundColor: "#D9D8DA",
                                            width: 100,
                                            height: 100,
                                            borderRadius: 6,
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                        onPress={handleProductImagesSelect}
                                    >
                                        <Plus color="gray" />
                                    </TouchableOpacity>
                                </HStack>

                        }
                    </HStack>

                    <VStack mt={5} mb={4}>
                        <Text fontFamily="heading" fontSize="md">
                            Sobre o produto
                        </Text>

                        <Controller
                            control={control}
                            name="name"
                            rules={{
                                required: "Informe o nome do anuncio"
                            }}
                            render={({ field: { onChange, value } }) => (
                                <FormControl isInvalid={!!errors.name?.message}>
                                    <InputNativeBase
                                        fontFamily="body"
                                        fontSize="sm"
                                        bgColor="white"
                                        borderRadius={6}
                                        borderColor="white"
                                        placeholder="Título do anúncio"
                                        onChangeText={onChange}
                                        value={value}
                                    />

                                    <FormControl.ErrorMessage>
                                        {errors.name?.message}
                                    </FormControl.ErrorMessage>
                                </FormControl>
                            )}
                        />

                        <Controller
                            control={control}
                            name="description"
                            rules={{
                                required: "Informe a descrição deste anúncio"
                            }}
                            render={({ field: { onChange, value } }) => (
                                <FormControl isInvalid={!!errors.description?.message}>
                                    <TextArea
                                        autoCompleteType={false}
                                        mt={4}
                                        p={3}
                                        h={140}
                                        w="full"
                                        bgColor="white"
                                        borderRadius={6}
                                        borderColor={!!errors.description?.message ? "red.light" : "white"}
                                        placeholder="Descrição do produto"
                                        fontFamily="body"
                                        fontSize="sm"
                                        onChangeText={onChange}
                                        value={value}
                                    />

                                    <FormControl.ErrorMessage>
                                        {errors.description?.message}
                                    </FormControl.ErrorMessage>
                                </FormControl>
                            )}
                        />

                        <Controller
                            control={control}
                            name="is_new"
                            rules={{
                                required: "Informe a situação do produto"
                            }}
                            render={({ field: { onChange, value } }) => (
                                <FormControl isInvalid={!!errors.is_new?.message}>
                                    <Box mt={3}>
                                        <Radio.Group
                                            name="is_new"
                                            onChange={onChange}
                                            value={value.toString()}
                                        >
                                            <Stack
                                                direction={{
                                                    base: "row",
                                                    md: "row"
                                                }}
                                                w="full"
                                                space={4}
                                                justifyContent="flex-start"
                                            >
                                                <Radio value="true" size="sm" my={1}>
                                                    Produto Novo
                                                </Radio>

                                                <Radio value="false" size="sm" my={1}>
                                                    Produto Usado
                                                </Radio>
                                            </Stack>
                                        </Radio.Group>
                                    </Box>

                                    <FormControl.ErrorMessage>
                                        {errors.is_new?.message}
                                    </FormControl.ErrorMessage>
                                </FormControl>
                            )}
                        />

                        <Box mt={4}>
                            <Text fontFamily="heading" fontSize="md">
                                Venda
                            </Text>

                            <Controller
                                control={control}
                                name="price"
                                rules={{
                                    required: "Informe o preço do anuncio"
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <FormControl isInvalid={!!errors.price?.message}>
                                        <InputNativeBase
                                            placeholder="Valor do produto"
                                            bgColor="white"
                                            borderRadius={6}
                                            borderColor="white"
                                            fontSize="md"
                                            fontFamily="body"
                                            InputLeftElement={
                                                <Text fontSize="md" fontFamily="body" ml={3}>
                                                    R$
                                                </Text>}
                                            onChangeText={onChange}
                                            value={!isNaN(value) ? String(value) : ""}
                                            keyboardType="numeric"
                                        />

                                        <FormControl.ErrorMessage>
                                            {errors.price?.message}
                                        </FormControl.ErrorMessage>
                                    </FormControl>
                                )}
                            />

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


                            <FormControl isInvalid={paymentSelected.length === 0}>
                                <PaymentMethods
                                    defaultValue={paymentSelected}
                                    onChange={(values: string[]) => setPaymentSelected(values)}
                                />
                                <FormControl.ErrorMessage>
                                    {"Informe a forma de pagamento"}
                                </FormControl.ErrorMessage>
                            </FormControl>
                        </Box>
                    </VStack>
                </VStack>
            </ScrollView>

            <HStack
                bg="white"
                pl={6}
                pr={6}
                w="full"
                h={Platform.OS === "android" ? "10%" : 70}
                justifyContent="space-between"
            >
                <SmallButton
                    onPress={handleNavigateMyAds}
                    title="Cancelar"
                    bgColor="gray.500"
                    textColor="gray.100"
                />

                <SmallButton
                    onPress={handleSubmit(handleNavigateAdsPreview)}
                    title="Avançar"
                    bgColor="gray.100"
                    textColor="white"
                />
            </HStack>
        </SafeAreaView>
    );
}
