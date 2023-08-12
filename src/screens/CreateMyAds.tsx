import { useState } from "react";
import { Box, FormControl, HStack, Input as InputNativeBase, Radio, ScrollView, Stack, Text, TextArea, VStack } from "native-base";
import { Platform, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";

import { Plus } from "phosphor-react-native";

import { AppNavigatorRoutesApp } from "@routes/app.routes";

import { Header } from "@components/Header";
import { SmallButton } from "@components/SmallButton";
import { Trade } from "@components/Trade";
import { PaymentMethods } from "@components/Payments";

type FormDataProps = {
    name: string;
    description: string;
    is_new: boolean;
    price: number;
    accept_trade: boolean;
    payment_methods: string[];
    user_id: string;
}

const createAdsSchema = yup.object({
    name: yup.string().required("Informe o nome do anúncio."),
    description: yup.string().required("Digite a descrição deste produto"),
    is_new: yup.boolean().required("Informe a codição deste produto"),
    price: yup.number().required("Informe o preço deste anuncio").typeError("Digite um valor numérico"),
    payment_methods: yup.array().min(1, "Informe a forma de pagamento").required("Informe a forma de pagamento")
});

export function CreateMyAds() {
    const navigation = useNavigation<AppNavigatorRoutesApp>();

    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
        resolver: yupResolver(createAdsSchema)
    });

    const [paymentSelected, setPaymentSelected] = useState<string[]>([]);
    const [images, setImages] = useState([]);

    function handleNavigateMyAds() {
        navigation.navigate("myAds");
    }

    function handleNavigateAdsPreview() {
        navigation.navigate("adsPreview");
    }

    async function handleCreatAds(data: FormDataProps) {
        console.log(data)
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header
                onPress={handleNavigateMyAds}
                title="Criar anúncio"
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
                        Escolha até três imagens para mostrar o quanto o seu produto é incrível!
                    </Text>

                    <HStack mt={3}>
                        {
                            images.length < 2 ?
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: "#D9D8DA",
                                        width: 100,
                                        height: 100,
                                        borderRadius: 6,
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}
                                >
                                    <Plus color="gray" />
                                </TouchableOpacity>

                                : null
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

                            <Controller
                                control={control}
                                name="payment_methods"
                                rules={{
                                    required: "Informe a forma de pagamento"
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <FormControl isInvalid={!!errors.payment_methods?.message}>
                                        <PaymentMethods
                                            defaultValue={paymentSelected}
                                            onChange={values => onChange(values)}
                                        />

                                        <FormControl.ErrorMessage>
                                            {errors.payment_methods?.message}
                                        </FormControl.ErrorMessage>
                                    </FormControl>
                                )}
                            />
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
                    onPress={handleSubmit(handleCreatAds)}
                    title="Avançar"
                    bgColor="gray.100"
                    textColor="white"
                />
            </HStack>
        </SafeAreaView>
    );
}
