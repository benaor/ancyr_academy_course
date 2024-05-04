import { OrderingDomainModel } from "@ratatouille/modules/order/core/model/ordering.domain-model";
import { orderingActions } from "@ratatouille/modules/order/core/store/ordering.slice";
import { ListenerMiddlewareInstance } from "@reduxjs/toolkit";

export const registerOrderingStepListener = (
  listener: ListenerMiddlewareInstance
) => {
  listener.startListening({
    actionCreator: orderingActions.chooseGuests,
    effect: (_, api) => {
      api.dispatch(
        orderingActions.setStep(OrderingDomainModel.OrderingStep.TABLE)
      );
    },
  });

  listener.startListening({
    actionCreator: orderingActions.chooseTable,
    effect(_, api) {
      api.dispatch(
        orderingActions.setStep(OrderingDomainModel.OrderingStep.MEALS)
      );
    },
  });

  listener.startListening({
    actionCreator: orderingActions.chooseMeals,
    effect(_, api) {
      api.dispatch(
        orderingActions.setStep(OrderingDomainModel.OrderingStep.SUMMARY)
      );
    },
  });
};
