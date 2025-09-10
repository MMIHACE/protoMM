
import { UserResponse, OwnUserResponse } from 'stream-chat';

// Extend Stream Chat's UserResponse and OwnUserResponse to include custom email field
declare module 'stream-chat' {
    interface UserResponse {
        email?: string;
    }
    interface OwnUserResponse {
        email?: string;
    }
}





interface TabBarIconProps {
    focused: boolean;
    icon: ImageSourcePropType;
    title: string;
}
interface CreateUserParams {
    email: string;
    password: string;
    name: string;
}

interface SignInParams {
    email: string;
    password: string;

}


export interface User  {
    name: string;
    email: string;
    avatar: string;
}

interface CustomInputProps {
    placeholder?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    label: string;
    secureTextEntry?: boolean;
    keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
}

interface CustomButtonProps {
    onPress?: () => void,
    title?: string,
    style?: string,
    leftIcon?: React.ReactNode,
    textStyle?: string,
    isLoading?: boolean,
    containerStyles?: string
}
