import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native"
import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { View } from "react-native"
import "react-native-reanimated"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { useColorScheme } from "@/hooks/use-color-scheme"

export const unstable_settings = {
	anchor: "(tabs)",
}

export default function RootLayout() {
	const colorScheme = useColorScheme()
	const insets = useSafeAreaInsets()

	return (
		<ThemeProvider
			value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
			{/* Top safe-area spacer to avoid notch overlap */}
			<View style={{ height: insets.top || 8, backgroundColor: "#000" }} />
			<Stack screenOptions={{ headerShown: false }}>
				<Stack.Screen name="(tabs)" />
				<Stack.Screen
					name="modal"
					options={{ presentation: "modal", title: "Modal" }}
				/>
			</Stack>
			<StatusBar style="auto" />
		</ThemeProvider>
	)
}
