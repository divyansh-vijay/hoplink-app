// ChatScreen.jsx
import React, { useEffect, useRef, useState } from "react"
import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native"
import { Avatar, Card } from "react-native-paper"
import Icon from "react-native-vector-icons/Feather"

const mockMessages = [
    { id: "1", senderId: "1", content: "Hey! How are you doing?", timestamp: "10:30 AM", isRead: true },
    { id: "2", senderId: "me", content: "I'm doing great! Just finished working on a new project", timestamp: "10:32 AM", isRead: true },
    { id: "3", senderId: "1", content: "That sounds exciting! What kind of project?", timestamp: "10:33 AM", isRead: true },
    { id: "4", senderId: "me", content: "It's a social media app called HopLink. Really proud of how it's turning out!", timestamp: "10:35 AM", isRead: true },
    { id: "5", senderId: "1", content: "Wow, that's amazing! I'd love to check it out 🚀", timestamp: "10:36 AM", isRead: false },
]

const mockUser = {
    id: "1",
    username: "sarah_adventures",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    verified: true,
    isOnline: true,
    lastSeen: "Active now",
}

export default function ChatScreen({ navigation }) {
    const [messages, setMessages] = useState(mockMessages)
    const [newMessage, setNewMessage] = useState("")
    const [isTyping, setIsTyping] = useState(false)
    const flatListRef = useRef(null)

    useEffect(() => {
        if (flatListRef.current) {
            flatListRef.current.scrollToEnd({ animated: true })
        }
    }, [messages])

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const message = {
                id: Date.now().toString(),
                senderId: "me",
                content: newMessage,
                timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                isRead: false,
            }

            setMessages((prev) => [...prev, message])
            setNewMessage("")

            // simulate reply
            setIsTyping(true)
            setTimeout(() => {
                setIsTyping(false)
                setMessages((prev) => [
                    ...prev,
                    {
                        id: (Date.now() + 1).toString(),
                        senderId: "1",
                        content: "Thanks for sharing! That sounds really cool 😊",
                        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                        isRead: false,
                    },
                ])
            }, 2000)
        }
    }

    const renderMessage = ({ item }) => (
        <View
            style={[
                styles.messageWrapper,
                item.senderId === "me" ? styles.myMessageWrapper : styles.otherMessageWrapper,
            ]}
        >
            <Card style={[styles.messageCard, item.senderId === "me" ? styles.myMessage : styles.otherMessage]}>
                <Text style={item.senderId === "me" ? styles.myMessageText : styles.otherMessageText}>
                    {item.content}
                </Text>
            </Card>
            <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
    )

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            keyboardVerticalOffset={80}
        >
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
                    <Icon name="arrow-left" size={22} />
                </TouchableOpacity>

                <View style={styles.userInfo}>
                    <Avatar.Image size={40} source={{ uri: mockUser.avatar }} />
                    <View style={{ marginLeft: 10 }}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text style={styles.username}>{mockUser.username}</Text>
                            {mockUser.verified && <Icon name="check-circle" size={14} color="blue" style={{ marginLeft: 5 }} />}
                        </View>
                        <Text style={styles.lastSeen}>{isTyping ? "Typing..." : mockUser.lastSeen}</Text>
                    </View>
                </View>

                <View style={styles.headerActions}>
                    <Icon name="phone" size={20} style={styles.iconButton} />
                    <Icon name="video" size={20} style={styles.iconButton} />
                    <Icon name="more-vertical" size={20} style={styles.iconButton} />
                </View>
            </View>

            {/* Messages */}
            <FlatList
                ref={flatListRef}
                data={messages}
                keyExtractor={(item) => item.id}
                renderItem={renderMessage}
                contentContainerStyle={styles.messagesContainer}
            />

            {/* Typing Indicator */}
            {isTyping && (
                <View style={styles.typingIndicator}>
                    <Text style={{ fontStyle: "italic", color: "#666" }}>Typing...</Text>
                </View>
            )}

            {/* Input */}
            <View style={styles.inputContainer}>
                <TouchableOpacity>
                    <Icon name="paperclip" size={22} style={styles.iconButton} />
                </TouchableOpacity>
                <TextInput
                    style={styles.textInput}
                    placeholder="Type a message..."
                    value={newMessage}
                    onChangeText={setNewMessage}
                    onSubmitEditing={handleSendMessage}
                />
                <TouchableOpacity>
                    <Icon name="smile" size={22} style={styles.iconButton} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSendMessage} disabled={!newMessage.trim()}>
                    <Icon name="send" size={22} color={newMessage.trim() ? "blue" : "#aaa"} />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        justifyContent: "space-between",
    },
    iconButton: { marginHorizontal: 5 },
    userInfo: { flexDirection: "row", alignItems: "center", flex: 1 },
    username: { fontWeight: "600", fontSize: 16 },
    lastSeen: { fontSize: 12, color: "#666" },
    headerActions: { flexDirection: "row", alignItems: "center" },
    messagesContainer: { padding: 10 },
    messageWrapper: { marginVertical: 5, maxWidth: "75%" },
    myMessageWrapper: { alignSelf: "flex-end" },
    otherMessageWrapper: { alignSelf: "flex-start" },
    messageCard: { borderRadius: 16, padding: 10 },
    myMessage: { backgroundColor: "#0078FF" },
    otherMessage: { backgroundColor: "#eee" },
    myMessageText: { color: "#fff" },
    otherMessageText: { color: "#000" },
    timestamp: { fontSize: 10, color: "#999", marginTop: 3, alignSelf: "flex-end" },
    typingIndicator: { padding: 10, alignItems: "flex-start" },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: "#ddd",
        padding: 8,
        backgroundColor: "#fff",
    },
    textInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 20,
        paddingHorizontal: 15,
        marginHorizontal: 8,
    },
})
