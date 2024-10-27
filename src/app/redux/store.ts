import storage from "redux-persist/lib/storage";
import cartReducer from "./slices/cartSlice";
import formReducer from "./slices/formSlice";
import sessionReducer from "./slices/sessionSlice";

import { persistReducer, persistStore } from "redux-persist";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

// Cấu hình riêng cho form và session
const formPersistConfig = {
  key: "form",
  storage,
};

const sessionPersistConfig = {
  key: "session",
  storage,
};

// Cấu hình rootPersist chỉ cho những slice không có cấu hình persist riêng
const rootPersistConfig = {
  key: "root",
  storage,
  blacklist: ["form", "session"], // Loại bỏ các slice đã được persist riêng
};

// Kết hợp tất cả reducer và áp dụng persist cho từng slice nếu cần thiết
const rootReducer = combineReducers({
  cart: cartReducer, // Không cần persist cho cart nếu không cần lưu vào storage
  form: persistReducer(formPersistConfig, formReducer),
  session: persistReducer(sessionPersistConfig, sessionReducer),
});

// Áp dụng persist cho rootReducer với cấu hình root tổng thể
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
