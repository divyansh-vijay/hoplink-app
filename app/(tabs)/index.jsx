// app/WelcomeScreen.js
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function WelcomeScreen({ navigation }) {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
		console.log(user);
      }
    };
    loadUser();
  }, []);

  const handleLogout = async () => {
	try {
	  // 1️⃣ Remove stored user data and token
	  await AsyncStorage.removeItem("authToken");
	  await AsyncStorage.removeItem("user");
  
	  // 2️⃣ Optionally reset local state if you are storing user in state
	  setUser(null); // if using a user state
	  console.log("User logged out");
  
	  // 3️⃣ Redirect to login page
	  router.replace("/login");
	} catch (error) {
	  console.log("Error logging out:", error);
	}
  };

  return (
    <LinearGradient colors={["#00c6ff", "#7d2ae8"]} style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.logoContainer}>
        <AntDesign name="link" size={80} color="white" />
        <Text style={styles.title}>HopLink</Text>
        <Text style={styles.subtitle}>Connect. Share. Hop into the link.</Text>
		{user && <Text style={styles.subtitle}>Welcome back, {user.name}!</Text>}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/login")}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleLogout()}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 100,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 120,
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: "white",
    marginTop: 20,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255,255,255,0.8)",
    marginTop: 8,
    textAlign: "center",
    paddingHorizontal: 30,
  },
  button: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#7d2ae8",
  },
});
