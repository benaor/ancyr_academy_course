import { AppState } from "@ratatouille/modules/store/store";

export const stepSelector = (state: AppState) => state.ordering.step;
