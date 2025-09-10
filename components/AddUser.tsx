import {View, Text, TouchableOpacity, TextInput} from 'react-native'
import React from 'react'
import {Ionicons} from "@expo/vector-icons";

const AddUser = () => {
    const [showForm, setShowForm] = React.useState(false);
    return (
        <View>
           <TouchableOpacity onPress={() => setShowForm(true)}>
            <Text>Add User</Text>
           </TouchableOpacity>
            {showForm && (
                <View className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <View className="bg-white p-6 rounded-lg w-11/12">
                        <Text className="text-xl font-bold mb-4">Add User</Text>
                        <TextInput className="border border-gray-300 p-2 mb-2 rounded" placeholder="First Name" />
                        <TextInput className="border border-gray-300 p-2 mb-2 rounded" placeholder="Last Name" />
                        <TextInput className="border border-gray-300 p-2 mb-2 rounded" placeholder="Email" />
                        <TextInput className="border border-gray-300 p-2 mb-2 rounded" placeholder="Username" />
                        <TextInput className="border border-gray-300 p-2 mb-2 rounded" placeholder="Phone" />
                        <TextInput className="border border-gray-300 p-2 mb-2 rounded" placeholder="Password" secureTextEntry />
                        <TextInput className="border border-gray-300 p-2 mb-4 rounded" placeholder="Confirm Password" secureTextEntry />
                        <TouchableOpacity className="bg-red-500 p-2 rounded mb-2">
                            <Text className="text-white text-center">CANCEL</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="bg-purple-800 p-2 rounded">
                            <Text className="text-white text-center">SAVE</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="absolute top-2 right-2" onPress={() => setShowForm(false)}>
                            <Ionicons name="close-outline" size={24} color="#000" />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    )
}
export default AddUser
