import { Center, ScrollView, Text, VStack } from "native-base";

export function SignUp() {
    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            bg="gray.600"
        >
            <VStack>
                <Center>
                    <Text backgroundColor="blue.100">SignUp</Text>
                </Center>
            </VStack>
        </ScrollView>
    );
}
