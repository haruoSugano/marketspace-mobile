import { Header } from "@components/Header";
import { useState } from "react";
import { FlatList, VStack, Image } from "native-base";
import { Dimensions, ImageSourcePropType } from "react-native";

import testeImage from "@assets/Image.png";

const { width } = Dimensions.get('window');

type Props = {
    id: string;
    url: ImageSourcePropType;
}

export function DetailsMyAds() {
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

    return (
        <VStack>
            <Header />

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
        </VStack>
    );
}
