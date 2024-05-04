import { guestFactory } from "@ratatouille/modules/order/core/model/guest.factory";
import { OrderingDomainModel } from "@ratatouille/modules/order/core/model/ordering.domain-model";
import { chooseMeals } from "@ratatouille/modules/order/core/usecases/choose-meal.usecase";
import { createTestStore } from "@ratatouille/modules/testing/tests-environment";

const guestForm: OrderingDomainModel.Form = {
  guests: [
    guestFactory.create({
      id: "1",
      meals: {
        entry: "1",
        mainCourse: "1",
        dessert: "1",
        drink: "1",
      },
    }),
  ],
  organizerId: "1",
  tableId: "1",
};

describe("feature: choosing a meal", () => {
  it("Should choose the meal", () => {
    const store = createTestStore();

    store.dispatch(chooseMeals(guestForm));

    expect(store.getState().ordering.form.guests).toEqual(guestForm.guests);
    expect(store.getState().ordering.step).toEqual(
      OrderingDomainModel.OrderingStep.SUMMARY
    );
  });
});
