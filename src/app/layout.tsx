"use client";

import "./globals.css";
import LayoutWrapper from "./LayoutWrapper";
import SessionProviderWrapper from "./SessionProviderWrapper";
import RouteChangeLoader from "./RouteChangeLoader";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

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
