import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Channel, MessageList, MessageInput, Thread } from "stream-chat-react-native";
import { useLocalSearchParams } from "expo-router";
import useAuthStore from "@/store/useAuthStore";

const ChannelScreen = () => {
    const { channelId } = useLocalSearchParams();
    const { streamClient } = useAuthStore();
    const [hasShownAlert, setHasShownAlert] = useState(false);

    console.log("ChannelScreen rendering", { channelId, streamClient });

    const channel = streamClient && channelId ? streamClient.channel("messaging", channelId as string, {
        members: [streamClient.userID, "test-user-2"],
    }) : null;

    useEffect(() => {
        if (!channel) return;

        async function initializeChannel() {
            try {
                await channel.watch();
                console.log("Channel initialized successfully:", channelId);
            } catch (error) {
                console.error("Error initializing channel:", error);
                if (!hasShownAlert) {
                    Alert.alert("Error", `Failed to initialize chat channel: ${String(error)}`);
                    setHasShownAlert(true);
                }
            }
        }
        initializeChannel();
    }, [channel, hasShownAlert]);

    if (!streamClient || !channelId || !channel) {
        if (!hasShownAlert) {
            Alert.alert("Error", "Chat client or channel ID is missing.");
            setHasShownAlert(true);
        }
        return null;
    }

    return (
        <Channel channel={channel}>
            <View style={styles.container}>
                <MessageList />
                <MessageInput />
                <Thread />
            </View>
        </Channel>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
});

export default ChannelScreen;