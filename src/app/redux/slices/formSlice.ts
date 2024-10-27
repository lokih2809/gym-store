import { PaymentMethod } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: number;
  quantity: number;
}

export interface FormState {
  userId?: number;
  totalPrice: number;
  addressOrder: string;
  phoneNumber: string;
  paymentMethod: PaymentMethod;
  products: Product[];
}

const initialState: FormState = {
  userId: 0,
  totalPrice: 0,
  addressOrder: "",
  phoneNumber: "",
  paymentMethod: "SHIPCOD" as PaymentMethod,
  products: [],
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFormValues(state, action: PayloadAction<FormState>) {
      return { ...state, ...action.payload }; // Cập nhật tất cả các thuộc tính
    },
    setUserInForm(state, action: PayloadAction<number>) {
      state.userId = action.payload;
    },
    clearFormValues(state) {
      return initialState; // Trở về trạng thái ban đầu
    },
  },
});

export const { setFormValues, setUserInForm, clearFormValues } =
  formSlice.actions;

export default formSlice.reducer;
