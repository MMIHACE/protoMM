import { View } from "react-native";
import { Stack } from "expo-router";
import Sidebar from "@/components/SideBar";

export default function Layout() {
    return (
        <View className="flex-1 flex-row bg-gray-100">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <View className="flex-1 pt-5">
                <Stack>
                    <Stack.Screen name="index" options={{ headerShown: false }} />
                    <Stack.Screen name="AddUser" options={{ headerShown: false }} />
                    <Stack.Screen name="shifts" options={{ headerShown: false }} />
                    <Stack.Screen name="other-setups" options={{ headerShown: false }} />
                </Stack>
            </View>
        </View>
    );
}
