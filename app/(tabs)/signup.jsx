// app/login.jsx
import API from "@/services/api";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Login() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async () => {
        try {
          await API.post("/auth/signup", { name, email, password });
          alert("Account created!");
          navigation.navigate("login");
        } catch (err) {
          alert(err);
          console.log(err)
        }
      };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Join with Us</Text>

            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
                // keyboardType="text"
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={handleSignup}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.linkButton}
                onPress={() => router.push("/login")}
            >
                <Text style={styles.linkText}>Dont have an account? Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#fff" },
    title: { fontSize: 28, fontWeight: "bold", marginBottom: 30, color: "#333" },
    input: {
        width: "100%",
        padding: 15,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        marginBottom: 15,
        fontSize: 16,
    },
    button: {
        backgroundColor: "#7d2ae8",
        padding: 15,
        borderRadius: 10,
        width: "100%",
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: { color: "white", fontWeight: "600", fontSize: 16 },
    linkButton: { marginTop: 20 },
    linkText: { color: "#7d2ae8", fontSize: 14, fontWeight: "500" },
});
