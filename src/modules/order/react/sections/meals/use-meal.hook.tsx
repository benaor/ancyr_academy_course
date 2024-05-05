import { MealForm } from "@ratatouille/modules/order/core/form/meal.form";
import { OrderingDomainModel } from "@ratatouille/modules/order/core/model/ordering.domain-model";
import { orderingActions } from "@ratatouille/modules/order/core/store/ordering.slice";
import { chooseMeals } from "@ratatouille/modules/order/core/usecases/choose-meal.usecase";
import { formSelector } from "@ratatouille/modules/order/core/selectors/form.selector";
import { AppState, useAppDispatch } from "@ratatouille/modules/store/store";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";

export const useMeal = () => {
  const meals: OrderingDomainModel.Meal[] = useSelector(
    (state: AppState) => state.ordering.availableMeals.data
  );

  const mealForm = useRef(new MealForm());

  const dispatch = useAppDispatch();
  const initialForm = useSelector(formSelector);

  const [form, setForm] = useState(initialForm);

  const findGuestById = (guestId: string) =>
    form.guests.find((guest) => guest.id === guestId);

  function getSelectableEntries(guestId: string): OrderingDomainModel.Meal[] {
    const guest = findGuestById(guestId);
    if (!guest) return [];
    return mealForm.current.getSelectableEntries(meals, guest);
  }

  function getSelectableMainCourses(
    guestId: string
  ): OrderingDomainModel.Meal[] {
    const guest = findGuestById(guestId);
    if (!guest) return [];
    return mealForm.current.getSelectableMainCourses(meals, guest);
  }

  function getSelectableDesserts(guestId: string): OrderingDomainModel.Meal[] {
    const guest = findGuestById(guestId);
    if (!guest) return [];
    return mealForm.current.getSelectableDesserts(meals, guest);
  }

  function getSelectableDrinks(guestId: string): OrderingDomainModel.Meal[] {
    const guest = findGuestById(guestId);
    if (!guest) return [];
    return mealForm.current.getSelectableDrinks(meals, guest);
  }

  function assignEntry(guestId: string, mealId: string): void {
    const newState = mealForm.current.assignEntry(form, guestId, mealId);
    setForm(newState);
  }

  function assignMainCourse(guestId: string, mealId: string): void {
    const newState = mealForm.current.assignMainCourse(form, guestId, mealId);
    setForm(newState);
  }

  function assignDessert(guestId: string, mealId: string): void {
    const newState = mealForm.current.assignDessert(form, guestId, mealId);
    setForm(newState);
  }

  function assignDrink(guestId: string, mealId: string): void {
    const newState = mealForm.current.assignDrink(form, guestId, mealId);
    setForm(newState);
  }

  function onNext() {
    dispatch(chooseMeals(form));
  }

  function onPrevious() {
    dispatch(orderingActions.setStep(OrderingDomainModel.OrderingStep.TABLE));
  }

  function isSubmittable() {
    return mealForm.current.isSubmittable(form);
  }

  return {
    getSelectableEntries,
    getSelectableMainCourses,
    getSelectableDesserts,
    getSelectableDrinks,

    assignEntry,
    assignMainCourse,
    assignDessert,
    assignDrink,

    onNext,
    onPrevious,

    isSubmittable: isSubmittable(),
    guests: form.guests,
  };
};
