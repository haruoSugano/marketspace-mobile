import { Box, Button, FlatList, HStack, Image, Text, VStack } from "native-base";
import { ArrowLeft, WhatsappLogo } from "phosphor-react-native";
import { Dimensions, ImageSourcePropType, TouchableOpacity } from "react-native";

import testeImage from "@assets/Image.png";
import defaultUserPhotoImg from "@assets/userPhotoDefault.png";

import { UserPhoto } from "@components/UserPhoto";
import { useState } from "react";
import { FormPayment } from "@components/FormPayment";

const { width } = Dimensions.get('window');

type Props = {
    id: string;
    url: ImageSourcePropType;
}

type FormPaymentProps = {
    id: string;
    type: string;
}

export function DetailMyAds() {
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

    return (
        <VStack>
            <HStack p={6} mt={10}>
                <TouchableOpacity>
                    <ArrowLeft />
                </TouchableOpacity>
            </HStack>

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

            <VStack p={5} alignContent="center">
                <HStack>
                    <UserPhoto
                        source={defaultUserPhotoImg}
                        alt="User photo"
                        size={7}
                        mr={2}
                    />

                    <Text fontFamily="heading">
                        Helio Haruo
                    </Text>
                </HStack>

                <Box
                    width={12}
                    height={5}
                    bg="blue.light"
                    alignItems="center"
                    borderRadius={12}
                    alignContent="flex-end"
                    mt={4}
                >
                    <Text fontFamily="heading" fontSize="sm" color="white">NOVO</Text>
                </Box>

                <HStack mt={1} justifyContent="space-between">
                    <Text fontFamily="heading" fontSize="lg">
                        Bicicleta
                    </Text>

                    <Text fontFamily="heading" fontSize="lg" color="blue.light">
                        <Text fontFamily="heading" fontSize="sm">R$</Text>
                        120,00
                    </Text>
                </HStack>

                <Text mt={1}>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been
                    typesetting industry. Lorem Ipsum has been
                    typesetting industry. Lorem Ipsum has been
                    typesetting industry. Lorem Ipsum has been
                </Text>

                <HStack mt={2}>
                    <Text mr={3} fontFamily="heading">
                        Aceita troca?
                    </Text>
                    <Text fontFamily="body">
                        Sim
                    </Text>
                </HStack>

                <Box mt={2}>
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
                </Box>
            </VStack>

            <HStack
                justifyContent="space-between"
                alignItems="center"
                alignSelf="center"
                bg="white"
                height="8%"
                width="full"
                p={4}
            >
                <HStack alignItems="center" alignSelf="center">
                    <Text fontFamily="heading" fontSize="sm" mr={1}>
                        R$
                    </Text>

                    <Text fontSize="lg" fontFamily="heading">
                        120,00
                    </Text>
                </HStack>

                <Button height={9} width={150}>
                    <HStack alignItems="center">
                        <WhatsappLogo color="white" size={18} />
                        <Text color="white" ml={1}>
                            Entrar em contato
                        </Text>
                    </HStack>
                </Button>
            </HStack>
        </VStack>
    );
}
