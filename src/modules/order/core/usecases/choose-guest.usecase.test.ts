import { guestFactory } from "@ratatouille/modules/order/core/model/guest.factory";
import { OrderingDomainModel } from "@ratatouille/modules/order/core/model/ordering.domain-model";

import { chooseGuests } from "@ratatouille/modules/order/core/usecases/choose-guest.usecase";
import { createTestStore } from "@ratatouille/modules/testing/tests-environment";

describe("Choose guest", () => {
  it("should choose the guest", () => {
    const store = createTestStore();
    const form: OrderingDomainModel.Form = {
      guests: [
        guestFactory.create({
          id: "1",
        }),
      ],
      tableId: null,
      organizerId: null,
    };

    store.dispatch(chooseGuests(form));

    expect(store.getState().ordering.form).toEqual(form);
    expect(store.getState().ordering.step).toEqual(
      OrderingDomainModel.OrderingStep.TABLE
    );
  });
});
