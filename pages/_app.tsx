import "antd/dist/antd.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../store";
import { appWithTranslation } from "next-i18next";
import LanguageProvider from "../context/language";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <LanguageProvider>
        <Component {...pageProps} />
      </LanguageProvider>
    </Provider>
  );
}

export default appWithTranslation(MyApp);
