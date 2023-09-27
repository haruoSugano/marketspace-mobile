import { Button as ButtonNative, HStack, IButtonProps, Text } from "native-base";

import { ArrowLeft } from "phosphor-react-native";

type Props = IButtonProps & {
    title: string;
    bgColor?: string;
    textColor?: string;
    isIcon?: boolean;
}

export function SmallButton({ title, bgColor, textColor, isIcon = false, ...rest }: Props) {
    return (
        <ButtonNative
            w="45%"
            h={12}
            mt={4}
            bg={bgColor}
            rounded="sm"
            borderRadius={6}
            _pressed={{
                bg: "gray.400"
            }}
            {...rest}
        >
            <HStack
                alignItems="center"
            >
                {
                    isIcon ? <ArrowLeft size={18} style={{marginRight: 6}}/> : null
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
