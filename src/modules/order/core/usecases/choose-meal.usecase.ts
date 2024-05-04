import { OrderingDomainModel } from "@ratatouille/modules/order/core/model/ordering.domain-model";
import { orderingActions } from "@ratatouille/modules/order/core/store/ordering.slice";
import { AppDispatch, AppGetState } from "@ratatouille/modules/store/store";

export const chooseMeals =
  (form: OrderingDomainModel.Form) =>
  (dispatch: AppDispatch, _: AppGetState) => {
    dispatch(orderingActions.chooseMeals(form));
  };
