import { Button as ButtonNative, HStack, IButtonProps, Text } from "native-base";

import { ArrowLeft, Tag } from "phosphor-react-native";

type Props = IButtonProps & {
    title: string;
    bgColor?: string;
    textColor?: string;
    typeIcon: "ARROW" | "TAG";
}

export function IconButton({ title, bgColor, textColor, typeIcon = "ARROW", ...rest }: Props) {
    return (
        <ButtonNative
            w="48%"
            h={10}
            mt={4}
            bg={bgColor}
            rounded="sm"
            borderRadius={6}
            _pressed={{
                bg: "gray.400"
            }}
            justifyContent="center"
            alignItems="center"
            {...rest}
        >
            <HStack
            >
                {
                    typeIcon === "ARROW" ?
                        <ArrowLeft size={18} style={{ marginRight: 6, marginTop: 4 }} />

                        :

                        <Tag size={18} color="white" style={{ marginRight: 6, marginTop: 4 }} />
                }
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
