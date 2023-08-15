import { ScrollView, Text, VStack, Center } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import { api } from "@services/api";

import LogoImg from "@assets/logo.svg";
import { Input } from "@components/Input";
import { InputPassword } from "@components/InputPassword";
import { Button } from "@components/Button";

import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import { useAuth } from "@hooks/useAuth";

type FormData = {
    email: string,
    password: string,
}

export function SignIn() {
    const navigation = useNavigation<AuthNavigatorRoutesProps>();
    const { signIn } = useAuth();
    const { control, handleSubmit, formState: { errors } } = useForm<FormData>();

    function handleNavigateSignUp() {
        navigation.navigate("signUp");
    }

    async function handleSign({ email, password }: FormData) {
        signIn(email, password);
    }

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

                    <Controller
                        control={control}
                        name="email"
                        rules={{ required: "Informe o e-mail" }}
                        render={({ field: { onChange } }) => (
                            <Input
                                placeholder="E-mail"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                onChangeText={onChange}
                                errorMessage={errors.email?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="password"
                        rules={{
                            required: "Informe a senha"
                        }}
                        render={({ field: { onChange, value } }) => (
                            <InputPassword
                                placeholder="Senha"
                                errorMessage={errors.password?.message}
                                onChangeText={onChange}
                            />
                        )}
                    />

                    <Button
                        title="Entrar"
                        bgColor="#647AC7"
                        textColor="#F7F7F8"
                        onPress={handleSubmit(handleSign)}
                    />
                </Center>
            </VStack>

            <VStack p={45}>
                <Center>
                    <Text mt={8}>
                        Ainda não tem acesso?
                    </Text>

                    <Button
                        title="Criar uma conta"
                        bgColor="#D9D8DA"
                        onPress={handleNavigateSignUp}
                    />
                </Center>
            </VStack>
        </ScrollView>

    );
}
