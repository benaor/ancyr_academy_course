import { ReserveDTO } from "@ratatouille/modules/order/core/gateway/reserve.dto";
import { guestFactory } from "@ratatouille/modules/order/core/model/guest.factory";
import { OrderingDomainModel } from "@ratatouille/modules/order/core/model/ordering.domain-model";
import { OrderingState } from "@ratatouille/modules/order/core/store/ordering.slice";
import { FailingReservationGateway } from "@ratatouille/modules/order/core/testing/failing.reservation-gateway";
import { MockReservationGateway } from "@ratatouille/modules/order/core/testing/mock.reservation-gateway";
import { reserve } from "@ratatouille/modules/order/core/usecases/reserve.usecase";
import { createTestStore } from "@ratatouille/modules/testing/tests-environment";

const orderForm: OrderingDomainModel.Form = {
  tableId: "1",
  organizerId: "1",
  guests: [
    guestFactory.create({
      id: "1",
      firstName: "John",
      lastName: "Doe",
      age: 30,
      meals: {
        entry: null,
        mainCourse: "1",
        dessert: null,
        drink: null,
      },
    }),
  ],
};

const orderingState: OrderingState = {
  step: OrderingDomainModel.OrderingStep.SUMMARY,
  form: orderForm,
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

describe("Reserving an order", () => {
  it("Should reserve successfuly", async () => {
    const reservationGateway = new MockReservationGateway();

    const store = createTestStore({
      initialState: {
        ordering: orderingState,
      },
      dependencies: {
        reservationGateway,
      },
    });

    const promise = store.dispatch(reserve());

    expect(store.getState().ordering.reservation.status).toEqual("loading");

    await promise;
    expect(store.getState().ordering.reservation.status).toEqual("success");

    reservationGateway.expectReserveWasCalledWith({
      tableId: "1",
      guests: [
        {
          id: "1",
          isOrganizer: true,
          firstName: "John",
          lastName: "Doe",
          age: 30,
          meals: {
            entry: null,
            mainCourse: "1",
            dessert: null,
            drink: null,
          },
        },
      ],
    } satisfies ReserveDTO);

    expect(store.getState().ordering.step).toEqual(
      OrderingDomainModel.OrderingStep.RESERVED
    );
  });
  it("Should handle error if there is", async () => {
    const reservationGateway = new FailingReservationGateway();

    const store = createTestStore({
      initialState: {
        ordering: orderingState,
      },
      dependencies: {
        reservationGateway,
      },
    });

    expect(store.getState().ordering.reservation.status).toEqual("idle");

    const promise = store.dispatch(reserve());

    expect(store.getState().ordering.reservation.status).toEqual("loading");

    await promise;

    expect(store.getState().ordering.reservation).toEqual({
      status: "error",
      error: "Reservation failed",
    });
  });
});
