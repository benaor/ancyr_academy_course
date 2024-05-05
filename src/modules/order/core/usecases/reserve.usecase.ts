import { orderingActions } from "@ratatouille/modules/order/core/store/ordering.slice";
import { extractErrorMessage } from "@ratatouille/modules/shared/errors.utils";
import { Dependencies } from "@ratatouille/modules/store/dependencies";
import { AppDispatch, AppGetState } from "@ratatouille/modules/store/store";

export const reserve =
  () =>
  async (
    dispatch: AppDispatch,
    getState: AppGetState,
    { reservationGateway }: Dependencies
  ) => {
    dispatch(orderingActions.handleReservationLoading());
    try {
      const form = getState().ordering.form;

      await reservationGateway.reserve({
        tableId: form.tableId!,
        guests: form.guests.map((guest) => ({
          id: guest.id,
          isOrganizer: guest.id === form.organizerId,
          firstName: guest.firstName,
          lastName: guest.lastName,
          age: guest.age,
          meals: {
            entry: guest.meals.entry,
            mainCourse: guest.meals.mainCourse!,
            dessert: guest.meals.dessert,
            drink: guest.meals.drink,
          },
        })),
      });
      dispatch(orderingActions.handleReservationSuccess());
    } catch (e) {
      const errorMesssage = extractErrorMessage(e);
      dispatch(orderingActions.handleReservationError(errorMesssage));
    }
  };
