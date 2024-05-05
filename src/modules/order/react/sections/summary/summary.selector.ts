import { OrderingDomainModel } from "@ratatouille/modules/order/core/model/ordering.domain-model";
import { AppState } from "@ratatouille/modules/store/store";

export const selectSummary = (state: AppState): OrderingDomainModel.Summary => {
  function getMealById(mealId: string) {
    return (
      state.ordering.availableMeals.data.find(({ id }) => id === mealId) ?? null
    );
  }

  const tableId = state.ordering.form.tableId;
  const organizerId = state.ordering.form.organizerId;

  const table = state.ordering.availableTables.data.find(
    ({ id }) => id === tableId
  )!;

  const meals = state.ordering.availableMeals.data;
  const guests = state.ordering.form.guests.map((guest) => ({
    id: guest.id,
    isOrganizer: guest.id === organizerId,
    name: `${guest.firstName} ${guest.lastName.toUpperCase()}`,
    meals: {
      entry: guest.meals.entry ? getMealById(guest.meals.entry) : null,
      mainCourse: getMealById(guest.meals.mainCourse!)!,
      dessert: guest.meals.dessert ? getMealById(guest.meals.dessert) : null,
      drink: guest.meals.drink ? getMealById(guest.meals.drink) : null,
    },
  }));

  return {
    table: {
      id: table.id,
      title: table.title,
    },
    guests,
  };
};
