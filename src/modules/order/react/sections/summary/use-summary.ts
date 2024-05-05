import { OrderingDomainModel } from "@ratatouille/modules/order/core/model/ordering.domain-model";
import { orderingActions } from "@ratatouille/modules/order/core/store/ordering.slice";
import { reserve } from "@ratatouille/modules/order/core/usecases/reserve.usecase";
import { AppState, useAppDispatch } from "@ratatouille/modules/store/store";
import { useSelector } from "react-redux";

type MealSummary = {
  id: string;
  title: string;
};

type Summary = {
  table: {
    id: string;
    title: string;
  };
  guests: Array<{
    id: string;
    name: string;
    isOrganizer: boolean;
    meals: {
      entry: MealSummary | null;
      mainCourse: MealSummary;
      dessert: MealSummary | null;
      drink: MealSummary | null;
    };
  }>;
};

const selectSummary = (state: AppState): Summary => {
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

export const useSummary = () => {
  const dispatch = useAppDispatch();

  function onPrevious() {
    dispatch(orderingActions.setStep(OrderingDomainModel.OrderingStep.MEALS));
  }

  function onNext() {
    dispatch(reserve());
  }

  const summary: Summary = useSelector(selectSummary);

  return {
    onPrevious,
    onNext,
    summary,
  };
};
