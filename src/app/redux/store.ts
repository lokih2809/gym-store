import storage from "redux-persist/lib/storage";
import cartReducer from "./slices/cartSlice";
import formReducer from "./slices/formSlice";
import sessionReducer from "./slices/sessionSlice";

import { persistReducer, persistStore } from "redux-persist";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

const createNoopStorage = () => ({
  getItem: (_key: string) => Promise.resolve(null),
  setItem: (_key: string, _value: any) => Promise.resolve(),
  removeItem: (_key: string) => Promise.resolve(),
});

const isClient = typeof window !== "undefined";

const formPersistConfig = {
  key: "form",
  storage: isClient ? storage : createNoopStorage(),
};

const sessionPersistConfig = {
  key: "session",
  storage: isClient ? storage : createNoopStorage(),
};

const rootPersistConfig = {
  key: "root",
  storage: isClient ? storage : createNoopStorage(),
  blacklist: ["form", "session"],
};

const rootReducer = combineReducers({
  cart: cartReducer,
  form: persistReducer(formPersistConfig, formReducer),
  session: persistReducer(sessionPersistConfig, sessionReducer),
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/REGISTER",
        ],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
