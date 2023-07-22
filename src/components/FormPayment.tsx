import { Box, HStack, Text } from "native-base";
import { Bank, Barcode, CreditCard, Money, QrCode } from "phosphor-react-native";

type Props = {
    payment: string;
}

export function FormPayment({ payment }: Props) {
    const renderSwitchFormPayment = (formPayment: string) => {
        switch (formPayment) {
            case "Boleto":
                return (
                    <HStack>
                        <Barcode />
                        <Text ml={2}>Boleto</Text>
                    </HStack>
                );
            case "Pix":
                return (
                    <HStack>
                        <QrCode />
                        <Text ml={2}>
                            Pix
                        </Text>
                    </HStack>
                );
            case "Dinheiro":
                return (
                    <HStack>
                        <Money />
                        <Text ml={2}>
                            Dinheiro
                        </Text>
                    </HStack>
                );
            case "Cartão de Crédito":
                return (
                    <HStack>
                        <CreditCard />
                        <Text ml={2}>
                            Cartão de Crédito
                        </Text>
                    </HStack>
                );
            case "Depósito Bancário":
                return (
                    <HStack>
                        <Bank />
                        <Text ml={2}>
                            Depósito Bancário
                        </Text>
                    </HStack>
                );
            default:
                break;
        }
    }

    return (
        <Box mt={1}>
            {
                renderSwitchFormPayment(payment)
            }
        </Box>
    );
}