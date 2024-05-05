import { AppState } from "@ratatouille/modules/store/store";

export const formSelector = (state: AppState) => state.ordering.form;
