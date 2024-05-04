import { ListenerMiddlewareInstance } from "@reduxjs/toolkit";

import { OrderingDomainModel } from "@ratatouille/modules/order/core/model/ordering.domain-model";
import { orderingActions } from "@ratatouille/modules/order/core/store/ordering.slice";
import { fetchMeals } from "@ratatouille/modules/order/core/usecases/fetch-meal.usecase";
import { fetchTables } from "@ratatouille/modules/order/core/usecases/fetch-table.usecase";

export const registerFetcherListener = (
  listener: ListenerMiddlewareInstance
) => {
  listener.startListening({
    actionCreator: orderingActions.setStep,
    effect: (action, api) => {
      switch (action.payload) {
        case OrderingDomainModel.OrderingStep.TABLE:
          api.dispatch(fetchTables as any);
          break;
        case OrderingDomainModel.OrderingStep.MEALS:
          api.dispatch(fetchMeals as any);
          break;
      }
    },
  });
};
