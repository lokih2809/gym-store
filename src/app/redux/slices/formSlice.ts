import { PaymentMethod } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: number;
  quantity: number;
}

export interface FormState {
  userId?: string;
  totalPrice: number;
  name: string;
  addressOrder: string;
  phoneNumber: string;
  paymentMethod: PaymentMethod;
  products: Product[];
}

const initialState: FormState = {
  userId: "",
  totalPrice: 0,
  name: "",
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
      return { ...state, ...action.payload };
    },
    setUserInForm(state, action: PayloadAction<string>) {
      state.userId = action.payload;
    },
    clearFormValues() {
      return initialState;
    },
  },
});

export const { setFormValues, setUserInForm, clearFormValues } =
  formSlice.actions;

export default formSlice.reducer;
