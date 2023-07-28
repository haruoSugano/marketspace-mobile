import { useState } from "react";
import { Dimensions, ImageSourcePropType } from "react-native";
import { Center, Text, VStack, Image, FlatList, Box, HStack, ScrollView } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import { AppNavigatorRoutesApp } from "@routes/app.routes";

import defaultUserPhotoImg from "@assets/userPhotoDefault.png";
import testeImage from "@assets/Image.png";

import { FormPayment } from "@components/FormPayment";
import { DetailsAdsContent } from "@components/DetailsAdsContent";
import { IconButton } from "@components/IconButton";


const { width } = Dimensions.get('window');

type Props = {
    id: string;
    url: ImageSourcePropType;
}

type FormPaymentProps = {
    id: string;
    type: string;
}

export function AdsPreview() {
    const navigation = useNavigation<AppNavigatorRoutesApp>();
    const [productImages, setProductImages] = useState<Props[]>([
        {
            id: "1",
            url: testeImage as ImageSourcePropType
        },
        {
            id: "2",
            url: testeImage as ImageSourcePropType
        },
        {
            id: "3",
            url: testeImage as ImageSourcePropType
        }
    ]);

    const [formPayment, setFormPayment] = useState<FormPaymentProps[]>([
        {
            id: "1",
            type: "Boleto"
        },
        {
            id: "2",
            type: "Pix"
        },
        {
            id: "3",
            type: "Dinheiro"
        },
        {
            id: "4",
            type: "Cartão de Crédito"
        },
        {
            id: "5",
            type: "Depósito Bancário"
        },
    ]);

    function handleNavigateEdit() {
        navigation.navigate("editAds");
    }

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
                            source={item.url}
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

                <Box p={5} bg="gray.600">
                    <DetailsAdsContent
                        uriUserPhoto={defaultUserPhotoImg}
                        name="Helio Haruo"
                        is_new={true}
                        product="Bicicleta"
                        price={120.00}
                        description="Lorem Ipsum is simply dummy text of the printing and
                                        typesetting industry. Lorem Ipsum has been
                                        typesetting industry. Lorem Ipsum has been
                                        typesetting industry. Lorem Ipsum has been
                                        typesetting industry. Lorem Ipsum has been"
                        exchange={true}
                    />

                    <VStack mt={2}>
                        <Text fontFamily="heading" mb={2}>
                            Meios de pagamento:
                        </Text>

                        <FlatList
                            data={formPayment}
                            renderItem={({ item }) => (
                                <FormPayment
                                    payment={item.type}
                                />
                            )}
                            showsVerticalScrollIndicator={false}
                            h={95}
                        />
                    </VStack>
                </Box>

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
                    />
                </HStack>
            </VStack>
        </SafeAreaView>

    );
}
