import { Box, HStack, Text } from "native-base";
import { ArrowLeft, PencilSimpleLine } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";

type Props = {
    isMyAds?: boolean;
}

export function Header({ isMyAds = true }: Props) {
    return (
        <HStack
            p={6}
            mt={12}
            justifyContent={isMyAds ? "space-between" : "flex-start"}
            alignItems="center"
        >
            <TouchableOpacity style={{ width: 40 }}>
                <ArrowLeft />
            </TouchableOpacity>
            {
                isMyAds ?
                    <TouchableOpacity style={{ width: 35 }}>
                        <PencilSimpleLine />
                    </TouchableOpacity>
                    :
                    <Box ml={20}>
                        <Text fontFamily="heading" fontSize="lg">
                            Criar anúncio
                        </Text>
                    </Box>
            }
        </HStack>
    );
}
