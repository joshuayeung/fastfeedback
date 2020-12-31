import { AuthProvider } from "@/lib/auth";
// import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/styles/theme";

const MyApp = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
};

export default MyApp;
