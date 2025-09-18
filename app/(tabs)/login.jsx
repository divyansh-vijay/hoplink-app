// // app/login.jsx
// import { useRouter } from "expo-router";
// import { useState } from "react";
// import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
// import API from "@/services/api";

// export default function Login() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async () => {
//     try {
//       const res = await API.post("/auth/login", { email, password });

//       alert("Successfully logged in!");
//       console.log("User Logged in successfully", res.data.message);

//       // Navigate to home/dashboard after successful login
//       router.replace("/"); 
//     } catch (err) {
//       alert(err.response?.data?.error || "Error logging in");
//       console.log("Login error:", err);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Login to HopLink</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//         autoCapitalize="none"
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />

//       <TouchableOpacity style={styles.button} onPress={handleLogin}>
//         <Text style={styles.buttonText}>Login</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={styles.linkButton}
//         onPress={() => router.push("/signup")}
//       >
//         <Text style={styles.linkText}>Don’t have an account? Sign Up</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#fff" },
//   title: { fontSize: 28, fontWeight: "bold", marginBottom: 30, color: "#333" },
//   input: {
//     width: "100%",
//     padding: 15,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 10,
//     marginBottom: 15,
//     fontSize: 16,
//   },
//   button: {
//     backgroundColor: "#7d2ae8",
//     padding: 15,
//     borderRadius: 10,
//     width: "100%",
//     alignItems: "center",
//     marginTop: 10,
//   },
//   buttonText: { color: "white", fontWeight: "600", fontSize: 16 },
//   linkButton: { marginTop: 20 },
//   linkText: { color: "#7d2ae8", fontSize: 14, fontWeight: "500" },
// });


// app/login.jsx
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import API from "@/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage"; // ✅ import storage

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });

      const { token, user } = res.data; // ✅ assuming backend sends token + user object

      // ✅ Save token & user to AsyncStorage
      await AsyncStorage.setItem("authToken", token);
      await AsyncStorage.setItem("user", JSON.stringify(user));

      alert("Successfully logged in!");
      console.log("User Logged in successfully", user);

      // Navigate to home/dashboard after successful login
      router.replace("/"); 
    } catch (err) {
      alert(err.response?.data?.error || "Error logging in");
      console.log("Login error:", err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login to HopLink</Text>

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

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => router.push("/signup")}
      >
        <Text style={styles.linkText}>Don’t have an account? Sign Up</Text>
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
