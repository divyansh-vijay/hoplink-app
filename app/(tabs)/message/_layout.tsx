import { Stack } from "expo-router"
import React from "react"

export default function MessageStackLayout() {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="index" />
			<Stack.Screen name="[chatId]" options={{ headerShown: false }} />
		</Stack>
	)
}


