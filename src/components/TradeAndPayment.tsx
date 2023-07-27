import { useState } from "react";
import { VStack, Text, Switch, Box, Checkbox } from "native-base";

type Props = {
    paymentSelected?: string[];
    onChange: (selectedPayment: string[]) => void;
};

export function TradeAndPayment({paymentSelected = [], onChange}: Props) {    
    return (
        <VStack>
            <VStack alignItems="flex-start" mt={4}>
                <Text fontFamily="heading">
                    Aceita troca?
                </Text>
                <Switch size="lg" colorScheme="primary" />
            </VStack>
            <VStack>
                <Text fontFamily="heading" mt={3}>
                    Meios de pagamentos aceitos
                </Text>
                <Box mt={2}>
                    <Checkbox.Group
                        defaultValue={paymentSelected}
                        onChange={onChange}
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
        </VStack>
    );
}
