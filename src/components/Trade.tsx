import { Switch, SwitchProps } from "react-native";
import { VStack, Text } from "native-base";

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
