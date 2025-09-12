// app/WelcomeScreen.js
import { AntDesign } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { useRouter } from "expo-router"
import { StatusBar } from "expo-status-bar"
import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
export default function WelcomeScreen({ navigation }) {
	const router = useRouter()

	return (
		<LinearGradient
			colors={["#00c6ff", "#7d2ae8"]}
			style={styles.container}>
			<StatusBar style="light" />

			<View style={styles.logoContainer}>
				<AntDesign name="link" size={80} color="white" />
				<Text style={styles.title}>HopLink</Text>
				<Text style={styles.subtitle}>
					Connect. Share. Hop into the link.
				</Text>
			</View>

			<TouchableOpacity
				style={styles.button}
				onPress={() => router.push("/login")}>
				<Text style={styles.buttonText}>Get Started</Text>
			</TouchableOpacity>
		</LinearGradient>
	)
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
})
