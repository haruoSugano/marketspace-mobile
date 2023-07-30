import { useState } from "react";
import { Input as InputNativeBase, HStack, Text, VStack, TextArea, Box, Radio, Stack, ScrollView } from "native-base";
import { AppNavigatorRoutesApp } from "@routes/app.routes";
import { Plus } from "phosphor-react-native";
import { Platform, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Header } from "@components/Header";
import { SmallButton } from "@components/SmallButton";
import { TradeAndPayment } from "@components/TradeAndPayment";
import { useNavigation } from "@react-navigation/native";

export function EditAds() {
    const navigation = useNavigation<AppNavigatorRoutesApp>();
    const [paymentSelected, setPaymentSelected] = useState<string[]>([]);
    const [images, setImages] = useState([]);

    function handleNavigateMyAds() {
        navigation.navigate("myAds");
    }

    function handleNavigateAdsPreview() {
        navigation.navigate("adsPreview");
    }

    function handlePaymentSelected(selectedPayment: string[]) {
        setPaymentSelected(selectedPayment);
    };

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

                        <InputNativeBase 
                            placeholder="Título do anúncio"
                        />

                        <TextArea
                            autoCompleteType={false}
                            mt={4}
                            p={3}
                            h={140}
                            w="full"
                            placeholder="Descrição do produto"
                            fontFamily="body"
                            fontSize="sm"
                        />

                        <Box mt={3}>
                            <Radio.Group name="typeProduct">
                                <Stack
                                    direction={{
                                        base: "row",
                                        md: "row"
                                    }}
                                    w="full"
                                    space={4}
                                    justifyContent="flex-start"
                                >
                                    <Radio value="NOVO" size="sm" my={1}>
                                        Produto Novo
                                    </Radio>

                                    <Radio value="USADO" size="sm" my={1}>
                                        Produto Usado
                                    </Radio>
                                </Stack>
                            </Radio.Group>
                        </Box>

                        <Box mt={4}>
                            <Text fontFamily="heading" fontSize="md">
                                Venda
                            </Text>

                            <InputNativeBase
                                placeholder="Valor do Produto"
                            />

                            <TradeAndPayment
                                paymentSelected={paymentSelected}
                                onChange={handlePaymentSelected}
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
                    onPress={handleNavigateAdsPreview}
                    title="Avançar"
                    bgColor="gray.100"
                    textColor="white"
                />
            </HStack>
        </SafeAreaView>
    );
}
