import { HStack, Text } from "native-base";
import { ArrowLeft } from "phosphor-react-native";

type Props = {
    title: string;
}

export function HeaderDetailsAds({ title }: Props) {
    return (
        <HStack p={8} mt={10}>
            <ArrowLeft />
            <Text>
                {title}
            </Text>
        </HStack>
    );
}
