import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../styles/theme";
import { Provider, useSelector } from "react-redux";
import store from '../store'
import Sidebar from "../components/Sidebar/Sidebar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
        <Sidebar/>

      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
