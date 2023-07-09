import { Center, HStack, ScrollView, Text, VStack, Image, Pressable } from "native-base";

import LogoImg from "@assets/logo.svg";
import { Perfil } from "@components/Perfil";
import { Input } from "@components/Input";
import { InputPassword } from "@components/InputPassword";
import { Button } from "@components/Button";

export function SignUp() {
    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            bg="gray.600"
        >
            <VStack p={12}>
                <Center>
                    <LogoImg width={74} height={74} />
                    <Text fontFamily="heading" fontSize="xl" mb={2}>Boas vindas!</Text>
                    <Text fontFamily="body" fontSize="sm" textAlign="center">Crie sua conta e use o espaço para comprar itens variados e vender seus produtos</Text>

                    <Perfil />

                    <Input
                        placeholder="Nome"
                    />

                    <Input
                        placeholder="E-mail"
                    />

                    <Input
                        placeholder="Telefone"
                    />

                    <InputPassword
                        placeholder="Senha"
                    />

                    <InputPassword
                        placeholder="Confirmar senha"
                    />

                    <Button
                        title="Criar"
                        bgColor="gray.100"
                        textColor="white"
                    />

                    <Text fontFamily="body" fontSize="sm" mt={8} mb={-5}>
                        Já tem uma conta?
                    </Text>

                    <Button
                        title="Ir para o login"
                        bgColor="gray.500"
                        textColor="gray.100"
                    />
                </Center>
            </VStack>
        </ScrollView>
    );
}
