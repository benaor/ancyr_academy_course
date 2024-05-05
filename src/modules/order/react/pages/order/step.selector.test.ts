import { OrderingDomainModel } from "@ratatouille/modules/order/core/model/ordering.domain-model";
import { stepSelector } from "@ratatouille/modules/order/react/pages/order/step.selector";
import { createTestState } from "@ratatouille/modules/testing/tests-environment";

const orderingState: OrderingDomainModel.State = {
  step: OrderingDomainModel.OrderingStep.GUESTS,
  form: {
    guests: [],
    organizerId: null,
    tableId: null,
  },
  availableTables: {
    status: "idle",
    error: null,
    data: [],
  },
  availableMeals: {
    status: "idle",
    error: null,
    data: [],
  },
  reservation: {
    status: "idle",
  },
};

describe("Step selector", () => {
  it("Should return the current step", () => {
    const state = createTestState({
      ordering: orderingState,
    });

    expect(stepSelector(state)).toBe(OrderingDomainModel.OrderingStep.GUESTS);
  });
});
