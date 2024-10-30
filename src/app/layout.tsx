"use client";

import "./globals.css";
import LayoutWrapper from "./LayoutWrapper";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import SessionProviderWrapper from "./SessionProviderWrapper";
import { PersistGate } from "redux-persist/integration/react";
import RouteChangeLoader from "./RouteChangeLoader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <PersistGate persistor={persistor} loading={null}>
            <SessionProviderWrapper>
              <LayoutWrapper>
                <RouteChangeLoader />
                {children}
              </LayoutWrapper>
            </SessionProviderWrapper>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
