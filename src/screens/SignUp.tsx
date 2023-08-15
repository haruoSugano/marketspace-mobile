import { useState } from "react";
import { Center, ScrollView, Text, VStack, useToast } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import { api } from "@services/api";


import LogoImg from "@assets/logo.svg";

import { Perfil } from "@components/Perfil";
import { Input } from "@components/Input";
import { InputPassword } from "@components/InputPassword";
import { Button } from "@components/Button";
import { ImageSourcePropType } from "react-native";
import { AppError } from "@utils/AppError";

type FormDataProps = {
    name: string;
    email: string;
    tel: string;
    password: string;
    passwordConfirm: string;
    avatar: ImageSourcePropType;
}

const signUpSchema = yup.object({
    name: yup.string().required("Informe o nome."),
    email: yup.string().required("Informe o e-mail.").email("E-mail inválido."),
    tel: yup.string().required("Informe o telefone."),
    password: yup.string().required("Informe a senha.").min(6, "A senha deve ter pelo menos 6 digitos."),
    passwordConfirm: yup.string().required("Confirme a senha.").oneOf([yup.ref('password'), ""], "A confirmação da senha não confere")
});

export function SignUp() {
    const navigation = useNavigation();
    const [fileExtension, setFileExtension] = useState<string | undefined>("");
    const toast = useToast();
    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
        resolver: yupResolver(signUpSchema)
    });
    const [avatarProfile, setAvatarProfile] = useState<any>();

    function handleGoBack() {
        navigation.goBack();
    }

    async function handleUserPhotoSelect() {
        try {
            const photoSelected = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
                aspect: [4, 4],
                allowsEditing: true
            });

            if (photoSelected.canceled) {
                return;
            }

            const photoAssets = photoSelected.assets[0];

            if (photoAssets.uri) {
                const photoInfo = await FileSystem.getInfoAsync(photoAssets.uri);

                if (photoInfo.size && (photoInfo.size / 1024 / 1024) > 1) {
                    return toast.show({
                        title: "Essa imagem é muito grande. Escolha uma de até 5MB",
                        placement: "top",
                        bgColor: "red.500"
                    });
                }

                const photoExtension = photoAssets.uri.split('.').pop();

                setFileExtension(photoExtension);
                setAvatarProfile(photoAssets);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function handleSignUp({ name, email, tel, password, passwordConfirm, avatar }: FormDataProps) {
        try {
            
            if (!avatarProfile) {
                return toast.show({
                    title: "A imagem de perfil é obrigatória.",
                    placement: "top",
                    bgColor: "red.500"
                });
            }

            const avatarFile = {
                name: `${name}.${fileExtension}`.toLocaleLowerCase(),
                uri: avatarProfile.uri,
                type: `${avatarProfile.type}/${fileExtension}`
            } as any;

            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('tel', tel);
            formData.append('password', password);
            formData.append('avatar', avatarFile);

            await api.post("/users", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            toast.show({
                title: "Conta criada com sucesso!",
                placement: "top",
                bgColor: "green.500"
            });

            navigation.goBack();
        } catch (error) {
            console.log(error)
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : "Não foi possível criar a conta. Tente novamente mais tarde";

            toast.show({
                title,
                placement: "top",
                bgColor: "red.500"
            });
        }
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

                        <Perfil
                            photo={avatarProfile}
                            onPress={handleUserPhotoSelect}
                        />

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
                            name="tel"
                            rules={{
                                required: "Informe o telefone"
                            }}
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    placeholder="Telefone"
                                    errorMessage={errors.tel?.message}
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
