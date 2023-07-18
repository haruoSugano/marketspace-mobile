import { HStack, Text } from "native-base";
import { XCircle } from "phosphor-react-native";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

type Props = TouchableOpacityProps & {
    condition: "NOVO" | "USADO"
}


export function Condition({ condition, ...rest }: Props) {
    return (
        <HStack alignItems="center">
            <Text
                fontFamily="heading"
                fontSize="sm"
                color="white"
            >
                {condition}
            </Text>
            <TouchableOpacity
                style={{ marginRight: -12, marginLeft: 5}}
                {...rest}
            >
                <XCircle color="white" size={18} />
            </TouchableOpacity>
        </HStack>
    );
}