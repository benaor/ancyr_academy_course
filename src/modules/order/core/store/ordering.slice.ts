import { OrderingDomainModel } from "@ratatouille/modules/order/core/model/ordering.domain-model";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const initialState: OrderingDomainModel.State = {
  step: OrderingDomainModel.OrderingStep.GUESTS,
  form: {
    guests: [],
    organizerId: null,
    tableId: null,
  },
  availableTables: {
    status: "idle",
    error: null,
    data: [],
  },
  availableMeals: {
    status: "idle",
    error: null,
    data: [],
  },
  reservation: {
    status: "idle",
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
    handleTablesLoading(state) {
      state.availableTables.status = "loading";
    },
    handleTablesError(state, action: PayloadAction<string>) {
      state.availableTables.status = "error";
      state.availableTables.error = action.payload;
    },
    storeTables(state, action: PayloadAction<OrderingDomainModel.Table[]>) {
      state.availableTables.data = action.payload;
      state.availableTables.status = "success";
    },
    chooseTable(state, action: PayloadAction<string>) {
      state.form.tableId = action.payload;
    },
    handleMealsLoading(state) {
      state.availableMeals.status = "loading";
    },
    handleMealsError(state, action: PayloadAction<string>) {
      state.availableMeals.status = "error";
      state.availableMeals.error = action.payload;
    },
    storeMeals(state, action: PayloadAction<OrderingDomainModel.Meal[]>) {
      state.availableMeals.data = action.payload;
      state.availableMeals.status = "success";
    },
    chooseMeals(state, action: PayloadAction<OrderingDomainModel.Form>) {
      state.form = action.payload;
    },
    handleReservationLoading(state) {
      state.reservation.status = "loading";
    },
    handleReservationSuccess(state) {
      state.reservation.status = "success";
    },
    handleReservationError(state, action: PayloadAction<string>) {
      state.reservation = {
        status: "error",
        error: action.payload,
      };
    },
  },
});

export const orderingReducer = orderingSlice.reducer;
export const orderingActions = orderingSlice.actions;
