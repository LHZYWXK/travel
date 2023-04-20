import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./screens/WelcomeScreen";
import MainScreen from "./screens/MainScreen";
import AttractionScreen from "./screens/AttractionScreen";
import store from "./store";
import { Provider } from "react-redux";
import BasketScreen from "./screens/BasketScreen";
import DistrictScreen from "./screens/DistrictScreen";
import CommentScreen from "./screens/CommentScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={WelcomeScreen} />
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="Attraction" component={AttractionScreen} />
          <Stack.Screen name="District" component={DistrictScreen} />
          <Stack.Screen name="Comment" component={CommentScreen} />
          <Stack.Screen
            name="Basket"
            component={BasketScreen}
            options={{ presentation: "modal", headerShown: false }}
          />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}
