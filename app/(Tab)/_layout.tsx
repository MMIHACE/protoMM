import { Tabs, Redirect } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Image, Text, View } from "react-native";
import { images } from "@/constants";
import cn from "clsx";
import { OverlayProvider, Chat } from "stream-chat-react-native";
import useAuthStore from "@/store/useAuthStore";
import "stream-chat-react/dist/css/v2/index.css";

const TabBarIcon = ({ focused, icon, title }: { focused: boolean; icon: any; title: string }) => (
    <View className="tab-icon">
        <Image source={icon} className="size-7" resizeMode="contain" tintColor={focused ? '#FE8C00' : '#5D5F6D'} />
        <Text className={cn('text-sm font-bold', focused ? 'text-primary' : 'text-gray-200')}>
            {title}
        </Text>
    </View>
);

export default function TabLayout() {
    const { streamClient, isAuthenticated } = useAuthStore();

    if (!isAuthenticated || !streamClient) return <Redirect href="/sign-in" />;

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <OverlayProvider>
                <Chat client={streamClient}>
                    <Tabs
                        screenOptions={{
                            headerShown: false,
                            tabBarShowLabel: false,
                            tabBarStyle: {
                                borderTopLeftRadius: 50,
                                borderTopRightRadius: 50,
                                borderBottomLeftRadius: 50,
                                borderBottomRightRadius: 50,
                                marginHorizontal: 20,
                                height: 80,
                                position: 'absolute',
                                bottom: 40,
                                backgroundColor: 'white',
                                shadowColor: '#1a1a1a',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.1,
                                shadowRadius: 4,
                                elevation: 5,
                            },
                        }}
                    >
                        <Tabs.Screen
                            name="index"
                            options={{
                                title: "Home",
                                tabBarIcon: ({ focused }) => <TabBarIcon title="Home" icon={images.home} focused={focused} />,
                            }}
                        />
                        <Tabs.Screen
                            name="news"
                            options={{
                                title: "News",
                                tabBarIcon: ({ focused }) => <TabBarIcon title="Search" icon={images.search} focused={focused} />,
                            }}
                        />
                        <Tabs.Screen
                            name="profile"
                            options={{
                                title: "Profile",
                                tabBarIcon: ({ focused }) => <TabBarIcon title="Profile" icon={images.person} focused={focused} />,
                            }}
                        />
                        {/*<Tabs.Screen*/}
                        {/*    name="channel/[channelId]"*/}
                        {/*    options={{*/}
                        {/*        title: "Chat",*/}
                        {/*        tabBarIcon: ({ focused }) => <TabBarIcon title="Chat" icon={images.chat} focused={focused} />,*/}
                        {/*    }}*/}
                        {/*/>*/}
                    </Tabs>
                </Chat>
            </OverlayProvider>
        </GestureHandlerRootView>
    );
}