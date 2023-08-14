import { ChatProvider } from "@/context/ChatContext";
import { AuthProvider } from "@/hooks/useAuth";

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ChatProvider>
        <Component {...pageProps} />
      </ChatProvider>
    </AuthProvider>
  );
}
