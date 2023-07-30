import { Box, FlatList, HStack, Select, Text, VStack } from "native-base";
import { Plus, CaretUp, CaretDown } from "phosphor-react-native";
import { useState } from "react";
import { ImageSourcePropType, Platform, TouchableOpacity } from "react-native";
import testeImage from "@assets/Image.png";
import { Item } from "@components/Item";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesApp } from "@routes/app.routes";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
    name: string;
    uri: ImageSourcePropType | null;
    price: number;
    source: ImageSourcePropType;
    is_new: boolean;
}

export function MyAds() {
    const navigation = useNavigation<AppNavigatorRoutesApp>();
    const [status, setStatus] = useState("");
    const [products, setProducts] = useState<Props[]>([
        {
            name: "tenis vermelho",
            uri: null,
            price: 59.90,
            source: testeImage as ImageSourcePropType,
            is_new: true
        },
        {
            name: "tenis azul",
            uri: null,
            price: 120.90,
            source: testeImage as ImageSourcePropType,
            is_new: false
        },
        {
            name: "tenis amarelo",
            uri: null,
            price: 160.90,
            source: testeImage as ImageSourcePropType,
            is_new: true
        },
        {
            name: "tenis verde",
            uri: null,
            price: 350.90,
            source: testeImage as ImageSourcePropType,
            is_new: true
        },
        {
            name: "tenis roxo",
            uri: null,
            price: 1000.90,
            source: testeImage as ImageSourcePropType,
            is_new: true
        },
        {
            name: "tenis preto",
            uri: null,
            price: 2500.90,
            source: testeImage as ImageSourcePropType,
            is_new: true
        },
        {
            name: "tenis preto e ranco",
            uri: null,
            price: 1000.90,
            source: testeImage as ImageSourcePropType,
            is_new: true
        },
        {
            name: "tenis marinho",
            uri: null,
            price: 2500.90,
            source: testeImage as ImageSourcePropType,
            is_new: true
        },
        {
            name: "tenis preto e dfa",
            uri: null,
            price: 1000.90,
            source: testeImage as ImageSourcePropType,
            is_new: true
        },
        {
            name: "tenis adf",
            uri: null,
            price: 2500.90,
            source: testeImage as ImageSourcePropType,
            is_new: true
        },
    ]);

    function handleNavigateDetailMyAds() {
        navigation.navigate("detailsMyAds");
    }

    function handleNavigateCreateMyAds() {
        navigation.navigate("createMyAds");
    }

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
                    <Text>
                        9 anúncios
                    </Text>

                    <Box>
                        <Select
                            selectedValue={status}
                            minWidth={100}
                            height={30}
                            fontFamily="body"
                            accessibilityLabel="Todos"
                            placeholder="Todos"
                            _selectedItem={{
                                bg: "gray.500"
                            }}
                            onValueChange={itemValue => setStatus(itemValue)}
                            dropdownIcon={<CaretDown size={18} />}
                            dropdownOpenIcon={<CaretUp size={18} />}
                        >
                            <Select.Item label="Todos" value="Todos" />
                            <Select.Item label="Ativos" value="Ativos" />
                            <Select.Item label="Inativos" value="Inativos" />
                        </Select>
                    </Box>
                </HStack>

                <VStack mt={4}>
                    <FlatList
                        columnWrapperStyle={{ justifyContent: "space-between" }}
                        data={products}
                        keyExtractor={item => item.name}
                        renderItem={({ item }) => (
                            <Box>
                                <TouchableOpacity onPress={handleNavigateDetailMyAds}>
                                    <Item
                                        uri={item.uri}
                                        name={item.name}
                                        price={item.price}
                                        is_new={item.is_new}
                                        source={item.source}
                                        alt="foto"
                                    />
                                </TouchableOpacity>
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
