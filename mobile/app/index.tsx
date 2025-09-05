import { Redirect } from "expo-router";

export default function Index() {
  // This will redirect to auth screen for login/signup
  return <Redirect href="/(auth)" />;
}
