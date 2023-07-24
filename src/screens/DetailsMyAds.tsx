import { Center, HStack, Text, VStack } from "native-base";
import { Plus } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";

export function DetailsMyAds() {
    return (
        <VStack>
            <HStack p={5} mt={7} justifyContent="flex-end" alignItems="center">
                <Text flex={1} fontFamily="heading" fontSize="lg">
                    Meus anúncios
                </Text>

                <TouchableOpacity>
                    <Plus />
                </TouchableOpacity>
            </HStack>
        </VStack>
    );
}
