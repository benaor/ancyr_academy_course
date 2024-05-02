import { OrderingDomainModel } from "@ratatouille/modules/order/core/model/ordering.domain-model";
import { useState } from "react";

export const useTable = () => {
  const [assignedTableId, setAssignedTableId] = useState<string | null>(null);

  function assignTable(tableId: string) {
    setAssignedTableId(tableId);
  }

  function onNext() {
    console.log("next");
  }

  function onPrevious() {
    console.log("previous");
  }

  function isSubmittable() {
    return false;
  }

  const availableTables: OrderingDomainModel.Table[] = [];

  return {
    assignTable,
    onNext,
    onPrevious,
    isSubmittable: isSubmittable(),
    availableTables,
    assignedTableId,
  };
};
