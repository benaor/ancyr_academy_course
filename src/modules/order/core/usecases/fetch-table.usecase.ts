import { orderingActions } from "@ratatouille/modules/order/core/store/ordering.slice";
import { extractErrorMessage } from "@ratatouille/modules/shared/errors.utils";
import { Dependencies } from "@ratatouille/modules/store/dependencies";
import { AppDispatch, AppGetState } from "@ratatouille/modules/store/store";

export const fetchTables = async (
  dispatch: AppDispatch,
  _: AppGetState,
  dependencies: Dependencies
) => {
  dispatch(orderingActions.handleTablesLoading());

  try {
    const tables = await dependencies.tableGateway.getTables();
    dispatch(orderingActions.storeTables(tables));
  } catch (e) {
    dispatch(orderingActions.handleTablesError(extractErrorMessage(e)));
  }
};
