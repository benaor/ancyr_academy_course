import { orderingActions } from "@ratatouille/modules/order/core/store/ordering.slice";
import { extractErrorMessage } from "@ratatouille/modules/shared/errors.utils";
import { Dependencies } from "@ratatouille/modules/store/dependencies";
import { AppDispatch, AppGetState } from "@ratatouille/modules/store/store";

export const fetchMeals = async (
  dispatch: AppDispatch,
  _: AppGetState,
  dependencies: Dependencies
) => {
  dispatch(orderingActions.handleMealsLoading());
  try {
    const meals = await dependencies.mealGateway.getMeals();
    dispatch(orderingActions.storeMeals(meals));
  } catch (e) {
    dispatch(orderingActions.handleMealsError(extractErrorMessage(e)));
  }
};
