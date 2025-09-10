import { create } from "zustand";
import { StreamChat } from "stream-chat";
import Constants from "expo-constants";
import { User } from "@/type";
import {
    getCurrentUser,
    createUser as appwriteCreateUser,
    signIn as appwriteSignIn,
    signOut as appwriteSignOut,
    functions,
    appwriteConfig,
} from "@/lib/appwrite";

const extra = Constants.expoConfig?.extra ?? {};
const EXPO_STREAM_API_KEY = extra.EXPO_PUBLIC_STREAM_API_KEY;

type AuthState = {
    isAuthenticated: boolean;
    user: User | null;
    isLoading: boolean;
    streamClient: StreamChat | null;
    setIsAuthenticated: (v: boolean) => void;
    setUser: (u: User | null) => void;
    setLoading: (v: boolean) => void;
    setStreamClient: (c: StreamChat | null) => void;
    fetchAuthenticatedUser: () => Promise<void>;
    signOut: () => Promise<void>;
    createUser: (p: { email: string; password: string; name: string }) => Promise<void>;
    signIn: (p: { email: string; password: string }) => Promise<void>;
};

const useAuthStore = create<AuthState>((set, get) => ({
    isAuthenticated: false,
    user: null,
    isLoading: true,
    streamClient: null,

    setIsAuthenticated: (v) => set({ isAuthenticated: v }),
    setUser: (u) => set({ user: u }),
    setLoading: (v) => set({ isLoading: v }),
    setStreamClient: (c) => set({ streamClient: c }),

    fetchAuthenticatedUser: async () => {
        set({ isLoading: true });
        try {
            const user = await getCurrentUser();
            if (!user) {
                set({ isAuthenticated: false, user: null, streamClient: null });
                return;
            }

            set({ isAuthenticated: true, user: user as unknown as User });

            const streamUserId = user.streamChatUserId || user.$id;
            if (!streamUserId) {
                throw new Error("No valid userId available for Stream");
            }

            console.log("User data:", user);
            console.log("Stream user ID:", streamUserId);
            console.log("Payload:", { userId: streamUserId, name: user.name, image: user.avatar });

            if (!EXPO_STREAM_API_KEY) throw new Error("Missing EXPO_PUBLIC_STREAM_API_KEY");
            const streamClient = StreamChat.getInstance(EXPO_STREAM_API_KEY);

            const exec = await functions.createExecution(
                appwriteConfig.functionId,
                JSON.stringify({
                    userId: streamUserId,
                    name: user.name,
                    image: user.avatar,
                })
            );

            console.log("Function execution response:", JSON.stringify(exec, null, 2));
            console.log("Function logs:", exec.logs);
            console.log("Response body:", exec.responseBody);

            const body = exec.responseBody ? JSON.parse(exec.responseBody) : {};
            if (!body?.token) {
                throw new Error(
                    body?.error ||
                    `Failed to get Stream token from function (Status: ${exec.responseStatusCode}, Body: ${JSON.stringify(body)}, Logs: ${exec.logs})`
                );
            }

            await streamClient.connectUser(
                { id: streamUserId, name: user.name, image: user.avatar },
                body.token
            );

            set({ streamClient });
            // In useAuthStore.ts, inside fetchAuthenticatedUser
            set({ streamClient });
            // console.log("Stream client initialized:", streamClient);
        } catch (e) {
            console.log("fetchAuthenticatedUser error:", e);
            set({ isAuthenticated: false, user: null, streamClient: null });
        } finally {
            set({ isLoading: false });
        }
    },

    signOut: async () => {
        set({ isLoading: true });
        try {
            const { streamClient } = get();
            await appwriteSignOut(streamClient || undefined);
            set({ isAuthenticated: false, user: null, streamClient: null });
        } catch {
            set({ isAuthenticated: false, user: null, streamClient: null });
        } finally {
            set({ isLoading: false });
        }
    },

    createUser: async ({ email, password, name }) => {
        set({ isLoading: true });
        try {
            await appwriteCreateUser({ email, password, name });
            await get().fetchAuthenticatedUser();
        } catch (e: any) {
            set({ isAuthenticated: false, user: null, streamClient: null });
            throw e;
        } finally {
            set({ isLoading: false });
        }
    },

    signIn: async ({ email, password }) => {
        set({ isLoading: true });
        try {
            await appwriteSignIn({ email, password });
            await get().fetchAuthenticatedUser();
        } catch (e: any) {
            set({ isAuthenticated: false, user: null, streamClient: null });
            throw e;
        } finally {
            set({ isLoading: false });
        }
    },
}));

export default useAuthStore;
