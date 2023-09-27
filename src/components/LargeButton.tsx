import { Box, Button as ButtonNative, HStack, IButtonProps, Text } from "native-base";

import { Power, Trash } from "phosphor-react-native";

type Props = IButtonProps & {
    title: string;
    bgColor?: string;
    textColor?: string;
    icon: "POWER" | "DELETE";
}

export function LargButton({ bgColor, textColor, title, icon, ...rest }: Props) {
    return (
        <ButtonNative
            w="full"
            h={10}
            mt={2}
            bg={bgColor}
            rounded="sm"
            borderRadius={6}
            _pressed={{
                bg: "gray.400"
            }}
            p={2}
            {...rest}
        >
            <HStack alignItems="center">
                <Box mr={2}>
                    {
                        icon === "POWER" ?
                            <Power color="white" size={18} />
                            :
                            <Trash color="black" size={18} />
                    }
                </Box>

                <Text
                    color={textColor}
                    fontFamily="heading"
                    fontSize="md"
                >
                    {title}
                </Text>
            </HStack>
        </ButtonNative>
    );
}