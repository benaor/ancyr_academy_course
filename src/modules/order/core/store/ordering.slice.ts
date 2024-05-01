import { OrderingDomainModel } from "@ratatouille/modules/order/core/model/ordering.domain-model";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type OrderingState = {
  step: OrderingDomainModel.OrderingStep;
  form: OrderingDomainModel.Form;
};

export const initialState: OrderingState = {
  step: OrderingDomainModel.OrderingStep.GUESTS,
  form: {
    guests: [],
    organizerId: null,
  },
};

export const orderingSlice = createSlice({
  name: "ordering",
  initialState,
  reducers: {
    setStep(state, action: PayloadAction<OrderingDomainModel.OrderingStep>) {
      state.step = action.payload;
    },
    chooseGuests(state, action: PayloadAction<OrderingDomainModel.Form>) {
      state.form = action.payload;
    },
  },
});

export const orderingReducer = orderingSlice.reducer;
export const orderingActions = orderingSlice.actions;
