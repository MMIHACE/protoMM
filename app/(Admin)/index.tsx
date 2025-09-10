import { View, Text, TextInput, Pressable, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

const AdminDashboard = () => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [users] = useState([
        { id: 1, roleId: 1, role: 'Accountant', dateUpdated: 'Mar 10, 2025' },
        { id: 2, roleId: 2, role: 'Bar Supervisor', dateUpdated: 'Mar 10, 2025' },
        { id: 3, roleId: 3, role: 'Bar Waiter', dateUpdated: 'Mar 10, 2025' },
        { id: 4, roleId: 4, role: 'Bar Waitress', dateUpdated: 'Mar 10, 2025' },
        { id: 5, roleId: 5, role: 'Cashier', dateUpdated: 'Mar 10, 2025' },
        { id: 6, roleId: 6, role: 'Chef', dateUpdated: 'Mar 10, 2025' },
        { id: 7, roleId: 7, role: 'Developer', dateUpdated: 'Mar 10, 2025' },
        { id: 8, roleId: 8, role: 'F&B Attendant', dateUpdated: 'Mar 10, 2025' },
        { id: 9, roleId: 9, role: 'F&B Auditor', dateUpdated: 'Mar 10, 2025' },
    ]);

    const renderItem = ({ item }) => (
        <View className="flex-row p-2 border-b border-gray-200">
            <Text className="flex-1">{item.id}</Text>
            <Text className="flex-1">{item.roleId}</Text>
            <Text className="flex-2">{item.role}</Text>
            <Text className="flex-1">{item.dateUpdated}</Text>
        </View>
    );

    return (
        <View className="p-6">
            <View className="flex-row justify-between mb-4">
                <Text className="text-lg font-semibold">Settings (Users)</Text>
                <Pressable
                    className="bg-purple-800 text-white p-2 rounded flex-row items-center"
                    onPress={() => router.push('/AddUser')}
                >
                    <Ionicons name="add-outline" size={16} color="white" />
                    <Text className="text-white ml-1">ADD USER</Text>
                </Pressable>
            </View>
            <TextInput
                className="border border-gray-300 p-2 mb-4 rounded-lg"
                placeholder="Search..."
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            <View className="bg-white shadow-md rounded-lg overflow-hidden">
                <View className="flex-row bg-purple-900 text-white p-2">
                    <Text className="flex-1 font-bold text-white">S/N</Text>
                    <Text className="flex-1 font-bold text-white">Role ID</Text>
                    <Text className="flex-2 font-bold text-white">User Role</Text>
                    <Text className="flex-1 font-bold text-white">Date Updated</Text>
                </View>
                <FlatList
                    data={users}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                />
            </View>
        </View>
    );
};

export default AdminDashboard;