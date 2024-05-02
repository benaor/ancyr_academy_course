import { OrderingDomainModel } from "@ratatouille/modules/order/core/model/ordering.domain-model";
import { orderingActions } from "@ratatouille/modules/order/core/store/ordering.slice";
import { chooseTable } from "@ratatouille/modules/order/core/usecases/choose-table.usecase";
import { invariant } from "@ratatouille/modules/shared/invariant";
import { AppState, useAppDispatch } from "@ratatouille/modules/store/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useTable = () => {
  const dispatch = useAppDispatch();
  const [assignedTableId, setAssignedTableId] = useState<string | null>(null);

  function assignTable(tableId: string) {
    setAssignedTableId(tableId);
  }

  function onNext() {
    invariant(assignedTableId !== null, "Table must be assigned");
    dispatch(chooseTable(assignedTableId!));
  }

  function onPrevious() {
    dispatch(orderingActions.setStep(OrderingDomainModel.OrderingStep.GUESTS));
  }

  function isSubmittable() {
    return assignedTableId !== null;
  }

  const availableTables: OrderingDomainModel.Table[] = useSelector(
    (state: AppState) => state.ordering.availableTables.data
  );

  return {
    assignTable,
    onNext,
    onPrevious,
    isSubmittable: isSubmittable(),
    availableTables,
    assignedTableId,
  };
};
