import { ChakraProvider } from "@chakra-ui/react";
import { ErrorBoundary } from "react-error-boundary";

import theme from "../theme";
import { AppProps } from "next/app";

import "lib/firebase";
import { FallbackFullPageError } from "components/Common";
import AuthProvider from "context/AuthProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      {/* app-wide error boundary */}
      <AuthProvider>
        <ErrorBoundary FallbackComponent={FallbackFullPageError}>
          <Component {...pageProps} />
        </ErrorBoundary>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
