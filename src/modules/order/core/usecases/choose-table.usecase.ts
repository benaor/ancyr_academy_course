import { orderingActions } from "@ratatouille/modules/order/core/store/ordering.slice";
import { AppDispatch, AppGetState } from "@ratatouille/modules/store/store";

export const chooseTable =
  (tableId: string) => (dispatch: AppDispatch, _: AppGetState) => {
    dispatch(orderingActions.chooseTable(tableId));
  };
