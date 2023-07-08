import { Button as ButtonNative, IButtonProps, Text } from "native-base";

type Props = IButtonProps & {
    title: string;
    bgColor?: string;
    textColor?: string;
}

export function Button({ title, bgColor, textColor }: Props) {
    return (
        <ButtonNative
            w="full"
            h={12}
            mt={8}
            bg={bgColor}
            rounded="sm"
            borderRadius={6}
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
