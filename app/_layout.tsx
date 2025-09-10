import { SplashScreen, Stack } from "expo-router";
import "./global.css";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import "stream-chat-react/dist/css/v2/index.css";
import useAuthStore from "@/store/useAuthStore";
import { GestureHandlerRootView } from "react-native-gesture-handler"; // Add this import

export default function RootLayout() {
    const { isLoading, fetchAuthenticatedUser } = useAuthStore();
    const [fontsLoaded, error] = useFonts({
        "QuickSand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
        "QuickSand-Medium": require("../assets/fonts/Quicksand-Medium.ttf"),
        "QuickSand-Regular": require("../assets/fonts/Quicksand-Regular.ttf"),
        "QuickSand-SemiBold": require("../assets/fonts/Quicksand-SemiBold.ttf"),
        "QuickSand-Light": require("../assets/fonts/Quicksand-Light.ttf"),
    });

    useEffect(() => {
        if (error) throw error;
        if (fontsLoaded) SplashScreen.hideAsync();
    }, [fontsLoaded, error]);

    useEffect(() => {
        fetchAuthenticatedUser();
    }, []);

    if (!fontsLoaded || isLoading) return null;

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack screenOptions={{ headerShown: false }} />
            </GestureHandlerRootView>
            );
        }