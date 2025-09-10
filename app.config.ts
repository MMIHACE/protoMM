import "dotenv/config";

export default {
    expo: {
        name: "read",
        slug: "read",
        version: "1.0.0",
        orientation: "portrait",
        icon: "./assets/images/icon.png",
        scheme: "read",
        userInterfaceStyle: "automatic",
        newArchEnabled: true,
        ios: {
            supportsTablet: true,
        },
        android: {
            adaptiveIcon: {
                foregroundImage: "./assets/images/adaptive-icon.png",
                backgroundColor: "#ffffff",
            },
            edgeToEdgeEnabled: true,
        },
        web: {
            bundler: "metro",
            output: "static",
            favicon: "./assets/images/favicon.png",
        },
        plugins: [
            "expo-router",
            [
                "expo-splash-screen",
                {
                    image: "./assets/images/splash-icon.png",
                    imageWidth: 200,
                    resizeMode: "contain",
                    backgroundColor: "#ffffff",
                },
            ],
        ],
        experiments: {
            typedRoutes: true,
        },

        // ✅ This is where env vars go
        extra: {
            EXPO_PUBLIC_APPWRITE_ENDPOINT: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
            EXPO_PUBLIC_APPWRITE_PROJECT_ID: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
            EXPO_PUBLIC_APPWRITE_DATABASE_ID: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
            EXPO_PUBLIC_APPWRITE_BUCKET_ID: process.env.EXPO_PUBLIC_APPWRITE_BUCKET_ID,
            EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID: process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID,
            EXPO_PUBLIC_APPWRITE_FUNCTION_ID: process.env.EXPO_PUBLIC_APPWRITE_FUNCTION_ID,
            EXPO_PUBLIC_STREAM_API_KEY: process.env.EXPO_PUBLIC_STREAM_API_KEY,
        },
    },
};
