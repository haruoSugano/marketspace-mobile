import { Center, ScrollView, Text, VStack } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import LogoImg from "@assets/logo.svg";

import { Perfil } from "@components/Perfil";
import { Input } from "@components/Input";
import { InputPassword } from "@components/InputPassword";
import { Button } from "@components/Button";

type FormDataProps = {
    name: string;
    email: string;
    phone: string;
    password: string;
    passwordConfirm: string;
}

const signUpSchema = yup.object({
    name: yup.string().required("Informe o nome."),
    email: yup.string().required("Informe o e-mail.").email("E-mail inválido."),
    phone: yup.string().required("Informe o telefone."),
    password: yup.string().required("Informe a senha.").min(6, "A senha deve ter pelo menos 6 digitos."),
    passwordConfirm: yup.string().required("Confirme a senha.").oneOf([yup.ref('password'), ""], "A confirmação da senha não confere")
});

export function SignUp() {
    const navigation = useNavigation();
    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
        resolver: yupResolver(signUpSchema)
    });

    function handleGoBack() {
        navigation.goBack();
    }

    async function handleSignUp(data: FormDataProps) {
        console.log(data)
    }

    return (
        <SafeAreaView>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
                bg="gray.600"
            >
                <VStack p={12}>
                    <Center>
                        <LogoImg width={74} height={74} />
                        <Text fontFamily="heading" fontSize="xl" mb={2}>Boas vindas!</Text>
                        <Text
                            fontFamily="body"
                            fontSize="sm"
                            textAlign="center"
                        >
                            Crie sua conta e use o espaço para comprar itens variados e vender seus produtos
                        </Text>

                        <Perfil />

                        <Controller
                            control={control}
                            name="name"
                            rules={{
                                required: "Informe o nome"
                            }}
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    placeholder="Nome"
                                    onChangeText={onChange}
                                    value={value}
                                    errorMessage={errors.name?.message}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="email"
                            rules={{
                                required: "Informe o e-mail",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "E-mail inválido."
                                }
                            }}
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    placeholder="E-mail"
                                    errorMessage={errors.email?.message}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="phone"
                            rules={{
                                required: "Informe o telefone"
                            }}
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    placeholder="Telefone"
                                    errorMessage={errors.phone?.message}
                                    onChangeText={onChange}
                                    value={value}
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
                                    value={value}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="passwordConfirm"
                            rules={{
                                required: "Confirme a senha"
                            }}
                            render={({ field: { onChange, value } }) => (
                                <InputPassword
                                    placeholder="Confirmar senha"
                                    errorMessage={errors.passwordConfirm?.message}
                                    onChangeText={onChange}
                                    value={value}
                                    returnKeyType="send"
                                    onSubmitEditing={handleSubmit(handleSignUp)}
                                />
                            )}
                        />

                        <Button
                            title="Criar"
                            bgColor="gray.100"
                            textColor="white"
                            onPress={handleSubmit(handleSignUp)}
                        />

                        <Text fontFamily="body" fontSize="sm" mt={8} mb={-5}>
                            Já tem uma conta?
                        </Text>

                        <Button
                            title="Ir para o login"
                            bgColor="gray.500"
                            textColor="gray.100"
                            onPress={handleGoBack}
                        />
                    </Center>
                </VStack>
            </ScrollView>
        </SafeAreaView>
    );
}
