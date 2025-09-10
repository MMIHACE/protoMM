import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity, Alert, Image } from "react-native";
import useAuthStore from "@/store/useAuthStore";
import { router } from "expo-router";

const UserList = () => {
    const { streamClient } = useAuthStore();
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!streamClient) return;
        async function fetchUsers() {
            setLoading(true);
            try {
                const response = await streamClient?.queryUsers(
                    { id: { $nin: [streamClient.userID] } },
                    { id: 1 },
                    { limit: 20 }
                );
                setUsers(response.users);
            } catch (e) {
                console.error("Error fetching users:", e);
                setUsers([]);
            }
            setLoading(false);
        }
        fetchUsers();
    }, [streamClient]);

    const createChannel = async (selectedUserId: string) => {
        if (!streamClient) {
            Alert.alert("Error", "Stream client is not initialized.");
            return;
        }

        try {
            // Check for existing channels
            const existingChannels = await streamClient.queryChannels({
                type: "messaging",
                members: { $eq: [streamClient.userID, selectedUserId] },
            });
            if (existingChannels.length > 0) {
                router.push(`/channel/${existingChannels[0].id}`);
                return;
            }

            // Create a new channel if none exists
            const channelId = `messaging-${[streamClient.userID, selectedUserId].sort().join('-')}`;
            const channel = streamClient.channel("messaging", channelId, {
                members: [streamClient.userID, selectedUserId],
            });

            // Initialize the channel
            await channel.watch();

            // Navigate to the chat screen with the channel ID
            router.push(`/channel/${channelId}`);
        } catch (error) {
            console.error("Error creating channel:", error);
            Alert.alert("Error", "Failed to create or navigate to chat channel.");
        }
    };

    if (!streamClient || loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator />
                <Text>Loading users...</Text>
            </View>
        );
    }

    return (
        <View>
            {users.map((user) => (
                <TouchableOpacity
                    key={user.id}
                    onPress={() => createChannel(user.id)}
                    style={{
                        padding: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: "#ccc",
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <Image
                        source={{ uri: user.image || "https://via.placeholder.com/40" }}
                        style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }}
                    />
                    <Text>{user.name || user.id}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default UserList;