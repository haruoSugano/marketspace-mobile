import { Center, Text, VStack } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";

export function AdsPreview() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <VStack>
                <Center>
                    <Text backgroundColor="blue.100">AdsPreview</Text>
                </Center>
            </VStack>
        </SafeAreaView>

    );
}
