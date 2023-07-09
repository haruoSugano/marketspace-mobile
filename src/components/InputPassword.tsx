import { IInputProps, Input as NativeBaseInput, Pressable } from "native-base";

import { Eye, EyeSlash } from "phosphor-react-native";
import { useState } from "react";

type Props = IInputProps & {

}

export function InputPassword({ ...rest }: Props) {
    const [show, setShow] = useState(false);

    return (
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
    );
}
