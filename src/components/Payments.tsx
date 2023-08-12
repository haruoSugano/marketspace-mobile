import { VStack, Text, Box, Checkbox } from "native-base";
import { ICheckboxGroupProps } from "native-base/lib/typescript/components/primitives/Checkbox/types";

type Props = ICheckboxGroupProps & {
};

export function PaymentMethods({...rest}:Props) {
    return (
        <VStack>
            <Text fontFamily="heading" mt={1}>
                Meios de pagamentos aceitos
            </Text>
            <Box mt={2}>
                <Checkbox.Group
                    {...rest}
                >
                    <Checkbox value="Boleto" my={1}>
                        Boleto
                    </Checkbox>
                    <Checkbox value="Pix" my={1}>
                        Pix
                    </Checkbox>
                    <Checkbox value="Dinheiro" my={1}>
                        Dinheiro
                    </Checkbox>
                    <Checkbox value="Cartão de Crédito" my={1}>
                        Cartão de Crédito
                    </Checkbox>
                    <Checkbox value="Depósito Bancário" my={1}>
                        Depósito Bancário
                    </Checkbox>
                </Checkbox.Group>
            </Box>
        </VStack>
    );
}
