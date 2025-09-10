import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";

const Sidebar = () => {
    const router = useRouter();
    const [open, setOpen] = useState(true);

    const sidebarItems = [
        { name: "Add User", icon: "person-add-outline", path: "/AddUser" },
        { name: "Shifts", icon: "time-outline", path: "/shifts" },
        { name: "Other Setups", icon: "settings-outline", path: "/other-setups" },
    ];

    if (!open) {
        return (
            <Pressable
                className="p-2 bg-gray-800"
                onPress={() => setOpen(true)}
            >
                <Ionicons name="menu" size={28} color="white" />
            </Pressable>
        );
    }

    return (
        <View className="w-[256px] bg-gray-800 h-full">
            {/* Header */}
            <View className="p-5 flex-row justify-between items-center border-b border-gray-700">
                <Text className="text-xl font-bold text-white">Admin Panel</Text>
                <Pressable onPress={() => setOpen(false)}>
                    <Ionicons name="close" size={24} color="white" />
                </Pressable>
            </View>

            {/* Links */}
            <View className="mt-5">
                {sidebarItems.map((item, index) => (
                    <Pressable
                        key={index}
                        className="flex-row items-center p-4"
                        onPress={() => router.push(item.path)}
                    >
                        <Ionicons name={item.icon} size={24} color="white" />
                        <Text className="text-white text-lg ml-4">{item.name}</Text>
                    </Pressable>
                ))}
            </View>
        </View>
    );
};

export default Sidebar;
