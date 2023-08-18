import { ScrollView, Text, VStack, Center, useToast } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";

import LogoImg from "@assets/logo.svg";
import { Input } from "@components/Input";
import { InputPassword } from "@components/InputPassword";
import { Button } from "@components/Button";

import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import { useAuth } from "@hooks/useAuth";
import { AppError } from "@utils/AppError";
import { useState } from "react";

type FormData = {
    email: string,
    password: string,
}

export function SignIn() {
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation<AuthNavigatorRoutesProps>();
    const toast = useToast();
    const { signIn } = useAuth();
    const { control, handleSubmit, formState: { errors } } = useForm<FormData>();

    function handleNavigateSignUp() {
        navigation.navigate("signUp");
    }

    async function handleSign({ email, password }: FormData) {
        try {
            setIsLoading(true);

            signIn(email, password);
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : "Não foi possível realizar o login. Tente novamente mais tarde."

            setIsLoading(false);

            toast.show({
                title,
                placement: "top",
                bgColor: "red.500"
            })
        }
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
                        isLoading={isLoading}
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
