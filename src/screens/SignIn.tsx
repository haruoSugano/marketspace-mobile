import { ScrollView, Text, VStack, Center } from "native-base";

import LogoImg from "@assets/logo.svg";
import { Input } from "@components/Input";
import { InputPassword } from "@components/InputPassword";
import { Button } from "@components/Button";

export function SignIn() {
    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
        >
            <VStack bg="gray.600" h={570} borderBottomRadius={24} p={45}>
                <Center mt={45} mb={15}>
                    <LogoImg />
                    <Text fontFamily="heading" fontSize="xxl">marketspace</Text>
                    <Text color="gray.300" fontFamily="mono" fontSize="sm">Seu espaço de compra e venda</Text>
                </Center>

                <Center mt={35}>
                    <Text fontFamily="body">Acesse sua conta</Text>
                    <Input placeholder="E-mail"/>
                    <InputPassword placeholder="Senha"/>
                    
                    <Button 
                    title="Entrar" 
                    bgColor="#647AC7"
                    textColor="#F7F7F8"/>
                </Center>
            </VStack>

            <VStack p={45}>
                <Center>
                    <Text mt={8}>
                        Ainda não tem acesso?
                    </Text>

                    <Button title="Criar uma conta" bgColor="#D9D8DA"/>
                </Center>
            </VStack>
        </ScrollView>

    );
}
