import { FormControl, IInputProps, Input as NativeBaseInput } from "native-base";

type Props = IInputProps & {
    errorMessage?: string | null;
}

export function Input({ errorMessage = null, ...rest }: Props) {
    const isInvalid = !!errorMessage;

    return (
        <FormControl isInvalid={isInvalid}>
            <NativeBaseInput
                bg="white"
                h={12}
                px={4}
                mt={4}
                borderWidth={0}
                borderRadius={6}
                fontSize="md"
                fontFamily="body"
                placeholderTextColor="gray.400"
                _invalid={{
                    borderWidth: 1,
                    borderColor: "red.500",
                }}
                _focus={{
                    bg: "white",
                    borderWidth: 1,
                    borderColor: "gray.400"
                }}
                {...rest}
            />

            <FormControl.ErrorMessage>
                {errorMessage}
            </FormControl.ErrorMessage>
        </FormControl>
    );
}
