import { Button as ButtonNative, IButtonProps, Text } from "native-base";

type Props = IButtonProps & {
    title: string;
    bgColor?: string;
    textColor?: string;
}

export function SmallButton({ title, bgColor, textColor}: Props) {
    return (
        <ButtonNative
            w="45%"
            h={12}
            mt={8}
            bg={bgColor}
            rounded="sm"
            borderRadius={6}
            _pressed={{
                bg: "gray.400"
            }}
        >
            <Text
                color={textColor}
                fontFamily="heading"
                fontSize="md"
            >
                {title}
            </Text>
        </ButtonNative>
    );
}