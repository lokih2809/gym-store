"use client";

import "./globals.css";
import LayoutWrapper from "./LayoutWrapper";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import SessionProviderWrapper from "./SessionProviderWrapper";
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
              <LayoutWrapper>{children}</LayoutWrapper>
            </SessionProviderWrapper>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
