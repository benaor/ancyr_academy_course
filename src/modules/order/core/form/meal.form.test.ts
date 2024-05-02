import { MealForm } from "@ratatouille/modules/order/core/form/meal.form";
import { guestFactory } from "@ratatouille/modules/order/core/model/guest.factory";
import { MealFactory } from "@ratatouille/modules/order/core/model/meal.factory";
import { OrderingDomainModel } from "@ratatouille/modules/order/core/model/ordering.domain-model";

const regularEntry = MealFactory.create({
  id: "entry-1",
  type: OrderingDomainModel.MealType.ENTRY,
});

const adultEntry = MealFactory.create({
  id: "entry-2",
  type: OrderingDomainModel.MealType.ENTRY,
  requiredAge: 18,
});

const regularMainCourse = MealFactory.create({
  id: "main-course-1",
  type: OrderingDomainModel.MealType.MAIN_COURSE,
});

const adultMainCourse = MealFactory.create({
  id: "main-course-2",
  type: OrderingDomainModel.MealType.MAIN_COURSE,
  requiredAge: 18,
});

const regularDessert = MealFactory.create({
  id: "dessert-1",
  type: OrderingDomainModel.MealType.DESSERT,
});

const adultDessert = MealFactory.create({
  id: "dessert-2",
  type: OrderingDomainModel.MealType.DESSERT,
  requiredAge: 18,
});

const regularDrink = MealFactory.create({
  id: "drink-1",
  type: OrderingDomainModel.MealType.DRINK,
});

const adultDrink = MealFactory.create({
  id: "drink-2",
  type: OrderingDomainModel.MealType.DRINK,
  requiredAge: 18,
});

const meals: OrderingDomainModel.Meal[] = [
  regularEntry,
  regularMainCourse,
  regularDessert,
  regularDrink,
  adultEntry,
  adultMainCourse,
  adultDessert,
  adultDrink,
];

const adult = guestFactory.create({
  id: "1",
  firstName: "John",
  lastName: "Doe",
  age: 30,
});
const child = guestFactory.create({
  id: "2",
  firstName: "Jane",
  lastName: "Doe",
  age: 10,
});

const mealForm = new MealForm();

describe("Selecting meals", () => {
  describe("Selecting Entries", () => {
    it("should return nothing", () => {
      const meals = mealForm.getSelectableEntries([], adult);
      expect(meals).toEqual([]);
    });

    it("When meals are available, it should return ADULT meals", () => {
      const result = mealForm.getSelectableEntries(meals, adult);
      expect(result).toEqual([regularEntry, adultEntry]);
    });

    it("When meals are available, it should return children-compatible meals only", () => {
      const result = mealForm.getSelectableEntries(meals, child);
      expect(result).toEqual([regularEntry]);
    });
  });
});
