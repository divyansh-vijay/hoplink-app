// app/MessagesList.js
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const mockChats = [
    // {
    //     id: "1",
    //     user: {
    //         id: "1",
    //         username: "sarah_adventures",
    //         avatar: require("../assets/woman-profile.png"),
    //         verified: true,
    //         isOnline: true,
    //     },
    //     lastMessage: "Hey! Did you see the photos from my hike?",
    //     timestamp: "2m",
    //     unreadCount: 2,
    //     isTyping: false,
    // },
    // {
    //     id: "2",
    //     user: {
    //         id: "2",
    //         username: "tech_guru",
    //         avatar: require("../assets/man-glasses.png"),
    //         verified: false,
    //         isOnline: true,
    //     },
    //     lastMessage: "The new update looks amazing! 🚀",
    //     timestamp: "15m",
    //     unreadCount: 0,
    //     isTyping: true,
    // },
    {
        id: "3",
        user: {
            id: "3",
            username: "foodie_life",
            avatar: require("../../assets/images/placeholder.png"),
            verified: true,
            isOnline: false,
        },
        lastMessage: "Thanks for the recipe recommendation!",
        timestamp: "1h",
        unreadCount: 0,
        isTyping: false,
    },
];

export default function MessagesList() {
    const [searchQuery, setSearchQuery] = useState("");
    const navigation = useNavigation();
    const router = useRouter()

    const filteredChats = mockChats.filter((chat) =>
        chat.user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderItem = ({ item: chat }) => (
        <TouchableOpacity
            style={styles.chatCard}
            onPress={() => router.push(`/chat/${chat.id}`)}
        >
            <View style={styles.avatarContainer}>
                <Image source={chat.user.avatar} style={styles.avatar} />
                {chat.user.isOnline && <View style={styles.onlineDot} />}
            </View>

            <View style={styles.chatInfo}>
                <View style={styles.rowBetween}>
                    <View style={styles.row}>
                        <Text style={styles.username}>{chat.user.username}</Text>
                        {chat.user.verified && (
                            <Ionicons name="checkmark-circle" size={16} color="#7d2ae8" />
                        )}
                    </View>
                    <Text style={styles.timestamp}>{chat.timestamp}</Text>
                </View>

                <View style={styles.rowBetween}>
                    <Text
                        style={[
                            styles.lastMessage,
                            chat.unreadCount > 0 && styles.unreadText,
                        ]}
                        numberOfLines={1}
                    >
                        {chat.isTyping ? "Typing..." : chat.lastMessage}
                    </Text>
                    {chat.unreadCount > 0 && (
                        <View style={styles.unreadBadge}>
                            <Text style={styles.unreadTextBadge}>{chat.unreadCount}</Text>
                        </View>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.iconButton}
                >
                    <Ionicons name="arrow-back" size={22} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Messages</Text>
                <TouchableOpacity style={styles.iconButton}>
                    <Feather name="edit-3" size={22} color="black" />
                </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View style={styles.searchBar}>
                <Feather name="search" size={18} color="#888" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search messages..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            {/* Chat List */}
            <FlatList
                data={filteredChats}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        justifyContent: "space-between",
    },
    headerTitle: { fontSize: 18, fontWeight: "600" },
    iconButton: { padding: 5 },
    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        margin: 10,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 12,
        paddingHorizontal: 10,
    },
    searchIcon: { marginRight: 5 },
    searchInput: { flex: 1, paddingVertical: 8 },
    chatCard: {
        flexDirection: "row",
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        alignItems: "center",
    },
    avatarContainer: { position: "relative", marginRight: 12 },
    avatar: { width: 48, height: 48, borderRadius: 24 },
    onlineDot: {
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 12,
        height: 12,
        backgroundColor: "#4ade80",
        borderRadius: 6,
        borderWidth: 2,
        borderColor: "#fff",
    },
    chatInfo: { flex: 1 },
    row: { flexDirection: "row", alignItems: "center" },
    rowBetween: { flexDirection: "row", justifyContent: "space-between" },
    username: { fontSize: 14, fontWeight: "600", marginRight: 4 },
    timestamp: { fontSize: 12, color: "#888" },
    lastMessage: { fontSize: 13, color: "#666", flex: 1 },
    unreadText: { color: "#000", fontWeight: "500" },
    unreadBadge: {
        backgroundColor: "#7d2ae8",
        borderRadius: 12,
        minWidth: 20,
        height: 20,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 6,
        paddingHorizontal: 5,
    },
    unreadTextBadge: { color: "#fff", fontSize: 12, fontWeight: "600" },
});
