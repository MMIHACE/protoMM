import { Account, Avatars, Client, Databases, Functions, ID, Query, Storage } from "react-native-appwrite";
import Constants from "expo-constants";
import { StreamChat } from "stream-chat";
import type { CreateUserParams, SignInParams } from "@/type";

const extra = Constants.expoConfig?.extra ?? {};

export const appwriteConfig = {
    endpoint: extra.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    projectId: extra.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    platform: "client_support",
    databaseId: extra.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
    bucketId: extra.EXPO_PUBLIC_APPWRITE_BUCKET_ID!,
    userCollectionId: extra.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID!,
    functionId: extra.EXPO_PUBLIC_APPWRITE_FUNCTION_ID!, // ✅ fixed
};

// ✅ Client-side Stream key
export const EXPO_STREAM_API_KEY = extra.EXPO_PUBLIC_STREAM_API_KEY!;

export const client = new Client();
export const functions = new Functions(client);

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);

export const signIn = async ({ email, password }: SignInParams) => {
    try {
        return await account.createEmailPasswordSession(email, password);
    } catch (e: any) {
        throw new Error(e?.message || "Sign-in failed");
    }
};

export const createUser = async ({ email, password, name }: CreateUserParams) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, name);
        if (!newAccount) throw new Error("Failed to create Appwrite account");

        await signIn({ email, password });

        const avatarUrl = avatars.getInitialsURL(name);

        const doc = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                email,
                name,
                accountId: newAccount.$id,
                avatar: avatarUrl,
                streamChatUserId: newAccount.$id,
            }
        );

        return doc;
    } catch (e: any) {
        throw new Error(e?.message || "Failed to create user");
    }
};

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if (!currentAccount) return null;

        const res = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal("accountId", currentAccount.$id)]
        );

        const user = res.documents[0] || null;
        if (user && !user.streamChatUserId) {
            console.log("Updating user with streamChatUserId:", currentAccount.$id);
            await databases.updateDocument(
                appwriteConfig.databaseId,
                appwriteConfig.userCollectionId,
                user.$id,
                { streamChatUserId: currentAccount.$id }
            );
            user.streamChatUserId = currentAccount.$id;
        }

        return user;
    } catch (e: any) {
        if (e?.message?.includes("missing scopes")) return null;
        throw e;
    }
};
export const signOut = async (streamClient?: StreamChat) => {
    try {
        if (streamClient) await streamClient.disconnectUser();
        await account.deleteSession("current");
    } catch (e: any) {
        throw new Error(e?.message || "Failed to sign out");
    }
};
