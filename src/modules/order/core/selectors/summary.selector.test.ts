import { guestFactory } from "@ratatouille/modules/order/core/model/guest.factory";
import { MealFactory } from "@ratatouille/modules/order/core/model/meal.factory";
import { OrderingDomainModel } from "@ratatouille/modules/order/core/model/ordering.domain-model";
import { TableFactory } from "@ratatouille/modules/order/core/model/table.factory";
import { selectSummary } from "@ratatouille/modules/order/core/selectors/summary.selector";
import { createTestState } from "@ratatouille/modules/testing/tests-environment";

describe("Should return an empty summary", () => {
  it("Should return Summary when the guest has choosen every meal", () => {
    const ordering: OrderingDomainModel.State = {
      step: OrderingDomainModel.OrderingStep.GUESTS,
      form: {
        guests: [
          guestFactory.create({
            id: "1",
            firstName: "Paul",
            lastName: "Smith",
            meals: {
              dessert: "2",
              drink: "5",
              entry: "6",
              mainCourse: "3",
            },
          }),
        ],
        organizerId: null,
        tableId: "1",
      },
      availableTables: {
        status: "idle",
        error: null,
        data: [
          TableFactory.create({
            id: "1",
            title: "Testing table",
          }),
        ],
      },
      availableMeals: {
        status: "idle",
        error: null,
        data: [
          MealFactory.create({
            id: "2",
            title: "Testing dessert",
            type: OrderingDomainModel.MealType.DESSERT,
          }),
          MealFactory.create({
            id: "3",
            title: "Testing mean course",
            type: OrderingDomainModel.MealType.MAIN_COURSE,
          }),
          MealFactory.create({
            id: "5",
            title: "Testing drink",
            type: OrderingDomainModel.MealType.DRINK,
          }),
          MealFactory.create({
            id: "6",
            title: "Testing entry",
            type: OrderingDomainModel.MealType.ENTRY,
          }),
        ],
      },
      reservation: {
        status: "idle",
      },
    };

    const state = createTestState({ ordering });

    expect(selectSummary(state)).toEqual({
      table: {
        id: "1",
        title: "Testing table",
      },
      guests: [
        {
          id: "1",
          isOrganizer: false,
          name: "Paul SMITH",
          meals: {
            entry: {
              id: "6",
              title: "Testing entry",
            },
            mainCourse: {
              id: "3",
              title: "Testing mean course",
            },
            dessert: {
              id: "2",
              title: "Testing dessert",
            },
            drink: {
              id: "5",
              title: "Testing drink",
            },
          },
        },
      ],
    });
  });
  it("Should return Summary when the guest has only choosen main course", () => {
    const ordering: OrderingDomainModel.State = {
      step: OrderingDomainModel.OrderingStep.GUESTS,
      form: {
        guests: [
          guestFactory.create({
            id: "1",
            firstName: "Paul",
            lastName: "Smith",
            meals: {
              dessert: null,
              drink: null,
              entry: null,
              mainCourse: "3",
            },
          }),
        ],
        organizerId: null,
        tableId: "1",
      },
      availableTables: {
        status: "idle",
        error: null,
        data: [
          TableFactory.create({
            id: "1",
            title: "Testing table",
          }),
        ],
      },
      availableMeals: {
        status: "idle",
        error: null,
        data: [
          MealFactory.create({
            id: "3",
            title: "Testing mean course",
            type: OrderingDomainModel.MealType.MAIN_COURSE,
          }),
        ],
      },
      reservation: {
        status: "idle",
      },
    };

    const state = createTestState({ ordering });

    expect(selectSummary(state)).toEqual({
      table: {
        id: "1",
        title: "Testing table",
      },
      guests: [
        {
          id: "1",
          isOrganizer: false,
          name: "Paul SMITH",
          meals: {
            entry: null,
            mainCourse: {
              id: "3",
              title: "Testing mean course",
            },
            dessert: null,
            drink: null,
          },
        },
      ],
    });
  });
});
