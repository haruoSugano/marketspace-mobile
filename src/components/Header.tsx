import { Box, HStack, Text } from "native-base";
import { ArrowLeft, PencilSimpleLine } from "phosphor-react-native";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

type Props = TouchableOpacityProps & {
    title?: string;
}

export function Header({ title, ...rest }: Props) {
    return (
        <HStack
            p={6}
            mt={12}
            justifyContent="flex-start"
            alignItems="center"
            bg="gray.600"
        >
            <TouchableOpacity style={{ width: 40 }} {...rest}>
                <ArrowLeft />
            </TouchableOpacity>
            <Box ml={20}>
                <Text fontFamily="heading" fontSize="lg">
                    {title}
                </Text>
            </Box>
        </HStack>
    );
}
