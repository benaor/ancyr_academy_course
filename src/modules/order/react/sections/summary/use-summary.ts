import { OrderingDomainModel } from "@ratatouille/modules/order/core/model/ordering.domain-model";
import { orderingActions } from "@ratatouille/modules/order/core/store/ordering.slice";
import { reserve } from "@ratatouille/modules/order/core/usecases/reserve.usecase";
import { selectSummary } from "@ratatouille/modules/order/core/selectors/summary.selector";
import { AppState, useAppDispatch } from "@ratatouille/modules/store/store";
import { useSelector } from "react-redux";

export const useSummary = () => {
  const dispatch = useAppDispatch();

  function onPrevious() {
    dispatch(orderingActions.setStep(OrderingDomainModel.OrderingStep.MEALS));
  }

  function onNext() {
    dispatch(reserve());
  }

  const summary: OrderingDomainModel.Summary = useSelector(selectSummary);

  return {
    onPrevious,
    onNext,
    summary,
  };
};
