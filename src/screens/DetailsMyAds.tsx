import { Header } from "@components/Header";
import { useState } from "react";
import { FlatList, VStack, Image, Box, Text } from "native-base";
import { Dimensions, ImageSourcePropType } from "react-native";

import testeImage from "@assets/Image.png";
import defaultUserPhotoImg from "@assets/userPhotoDefault.png";

import { DetailsAdsContent } from "@components/DetailsAdsContent";
import { FormPayment } from "@components/FormPayment";
import { LargButton } from "@components/LargeButton";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesApp } from "@routes/app.routes";

const { width } = Dimensions.get('window');

type Props = {
    id: string;
    url: ImageSourcePropType;
}

type FormPaymentProps = {
    id: string;
    type: string;
}

export function DetailsMyAds() {
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
            id: "5",
            type: "Depósito Bancário"
        },
    ]);

    function handleNavigateMyAds() {
        navigation.navigate("myAds");
    }

    return (
        <VStack>
            <Header 
                onPress={handleNavigateMyAds}
            />

            <FlatList
                data={productImages}
                renderItem={({ item }) => (
                    <Image
                        source={item.url}
                        alt="foto"
                        width={width}
                        h={210}
                    />
                )}
                horizontal
                pagingEnabled
                keyExtractor={(item, index) => index.toString()}
            />

            <Box p={5}>
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
                    <Text fontFamily="heading">
                        Meios de pagamento:
                    </Text>

                    <FlatList
                        data={formPayment}
                        renderItem={({ item }) => (
                            <FormPayment
                                payment={item.type}
                            />
                        )}
                    />
                </VStack>

                <Box mt={4}>
                    <LargButton
                        bgColor="gray.100"
                        textColor="white"
                        title="Desativar anúncios"
                        icon="POWER"
                    />

                    <LargButton
                        bgColor="gray.500"
                        textColor="gray.100"
                        title="Excluir anúncio"
                        icon="DELETE"
                    />
                </Box>
            </Box>
        </VStack>
    );
}
