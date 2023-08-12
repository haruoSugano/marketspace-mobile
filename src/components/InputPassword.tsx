import { FormControl, IInputProps, Input as NativeBaseInput, Pressable } from "native-base";

import { Eye, EyeSlash } from "phosphor-react-native";
import { useState } from "react";

type Props = IInputProps & {
    errorMessage?: string | null;
}

export function InputPassword({ errorMessage = null, ...rest }: Props) {
    const isInvalid = !!errorMessage;
    const [show, setShow] = useState(false);

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
                type={show ? "text" : "password"}
                InputRightElement={
                    <Pressable
                        mr={4}
                        onPress={() => setShow(!show)}
                    >
                        {
                            show ? <Eye /> : <EyeSlash />
                        }
                    </Pressable>
                }
                {...rest}
            />

            <FormControl.ErrorMessage>
                {errorMessage}
            </FormControl.ErrorMessage>
        </FormControl>
    );
}
