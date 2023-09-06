import { Box, HStack, Text } from "native-base";
import { Bank, Barcode, CreditCard, Money, QrCode } from "phosphor-react-native";

type Props = {
    payment: string;
}

export function FormPayment({ payment }: Props) {
    const renderSwitchFormPayment = (formPayment: string) => {
        switch (formPayment) {
            case "boleto":
                return (
                    <HStack>
                        <Barcode />
                        <Text ml={2}>Boleto</Text>
                    </HStack>
                );
            case "pix":
                return (
                    <HStack>
                        <QrCode />
                        <Text ml={2}>
                            Pix
                        </Text>
                    </HStack>
                );
            case "cash":
                return (
                    <HStack>
                        <Money />
                        <Text ml={2}>
                            Dinheiro
                        </Text>
                    </HStack>
                );
            case "card":
                return (
                    <HStack>
                        <CreditCard />
                        <Text ml={2}>
                            Cartão de Crédito
                        </Text>
                    </HStack>
                );
            case "deposit":
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