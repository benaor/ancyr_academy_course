import { OrderingDomainModel } from "@ratatouille/modules/order/core/model/ordering.domain-model";
import { invariant } from "@ratatouille/modules/shared/invariant";
import { AppState } from "@ratatouille/modules/store/store";

export const selectSummary = (state: AppState): OrderingDomainModel.Summary => {
  function getMealById(mealId: string): OrderingDomainModel.MealSummary {
    const meal = meals.find(({ id }) => id === mealId)!;

    invariant(meal !== null, `Meal with id ${mealId} not found`);

    return { id: meal.id, title: meal.title };
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
