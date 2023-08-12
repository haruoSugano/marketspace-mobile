import { Button as ButtonNative, IButtonProps, Text } from "native-base";

type Props = IButtonProps & {
    title: string;
    bgColor?: string;
    textColor?: string;
}

export function Button({ title, bgColor, textColor, ...rest }: Props) {
    return (
        <ButtonNative
            w="full"
            h={12}
            mt={8}
            bg={bgColor}
            rounded="sm"
            borderRadius={6}
            _pressed={{
                bg: "gray.400"
            }}
            {...rest}
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
