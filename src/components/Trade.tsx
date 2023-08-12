import { VStack, Text } from "native-base";
import { Switch, SwitchProps } from "react-native";

type Props = SwitchProps & {
}

export function Trade({ ...rest }: Props) {
    return (
        <VStack alignItems="flex-start" mt={2}>
            <Text fontFamily="heading">
                Aceita troca?
            </Text>
            <Switch
                {...rest}
            />
        </VStack>
    );
}
