import { SafeAreaView, Text, View } from "react-native";
import SearchBar from "@/components/SearchBar";
import { OverlayProvider, Chat } from "stream-chat-react-native";
import useAuthStore from "@/store/useAuthStore";
import UserList from "@/components/UserList";
import "stream-chat-react/dist/css/v2/index.css";
import {Link} from "expo-router";

export default function App() {
    const { streamClient } = useAuthStore();

    if (!streamClient) {
        return (
            <SafeAreaView className="bg-white h-full">
                <Text>Initializing chat client...</Text>
            </SafeAreaView>
        );
    }

    return (
        <OverlayProvider>
            <Chat client={streamClient}>
                <SafeAreaView className="bg-white h-full">
                    <View className="my-5 gap-5">
                        <View className="flex-row justify-between w-full">
                            <View className="flex-start">
                                <View className="flex-row gap-x-1 mt-0.5">
                                    <Text className="text-xl font-bold text-blue-500">
                                        Welcome Nativewind!
                                    </Text>
                                </View>
                                <View className="flex-row gap-x-1 mt-0.5">
                                    <Text className="paragraph-bold text-dark-100">Find your Trade</Text>
                                </View>
                                <Text className="small-bold uppercase text-primary">Search</Text>
                            </View>
                        </View>
                        <SearchBar />

                        <View className="flex justify-center mt-5 flex-row gap-2">
                            <Text className="base-regular text-gray-100">
                                Don't have an account?
                            </Text>
                            <Link href="/Admin/AdminDashboard" className="base-bold text-primary">
                                Sign Up
                            </Link>
                        </View>

                    </View>
                    <UserList />
                </SafeAreaView>
            </Chat>
        </OverlayProvider>
    );
}