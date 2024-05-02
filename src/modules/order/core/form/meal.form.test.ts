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
    it.each([
      {
        meals: [],
        guest: adult,
        expected: [],
      },
      {
        meals,
        guest: adult,
        expected: [regularEntry, adultEntry],
      },
      {
        meals,
        guest: child,
        expected: [regularEntry],
      },
    ])("should get selectable entries", ({ meals, guest, expected }) => {
      const result = mealForm.getSelectableEntries(meals, guest);
      expect(result).toEqual(expected);
    });
  });

  describe("Selecting main-course", () => {
    it.each([
      {
        meals: [],
        guest: adult,
        expected: [],
      },
      {
        meals,
        guest: adult,
        expected: [regularMainCourse, adultMainCourse],
      },
      {
        meals,
        guest: child,
        expected: [regularMainCourse],
      },
    ])("should get selectable entries", ({ meals, guest, expected }) => {
      const result = mealForm.getSelectableMainCourses(meals, guest);
      expect(result).toEqual(expected);
    });
  });

  describe("Selecting desserts", () => {
    it.each([
      {
        meals: [],
        guest: adult,
        expected: [],
      },
      {
        meals,
        guest: adult,
        expected: [regularDessert, adultDessert],
      },
      {
        meals,
        guest: child,
        expected: [regularDessert],
      },
    ])("should get selectable entries", ({ meals, guest, expected }) => {
      const result = mealForm.getSelectableDesserts(meals, guest);
      expect(result).toEqual(expected);
    });
  });

  describe("Selecting drinks", () => {
    it.each([
      {
        meals: [],
        guest: adult,
        expected: [],
      },
      {
        meals,
        guest: adult,
        expected: [regularDrink, adultDrink],
      },
      {
        meals,
        guest: child,
        expected: [regularDrink],
      },
    ])("should get selectable entries", ({ meals, guest, expected }) => {
      const result = mealForm.getSelectableDrinks(meals, guest);
      expect(result).toEqual(expected);
    });
  });
});

describe("Assinging meals", () => {
  const form: OrderingDomainModel.Form = {
    guests: [adult, child],
    organizerId: adult.id,
    tableId: "1",
  };

  it("Should assign NULL as an entry", () => {
    const result = mealForm.assignEntry(form, adult.id, null);
    expect(result.guests[0].meals.entry).toBeNull();
  });

  it("Should assign the adult entry as an entry to an adult guest", () => {
    const result = mealForm.assignEntry(form, adult.id, adultEntry.id);
    expect(result.guests[0].meals.entry).toEqual(adultEntry.id);
  });

  it("Should assign the adult entry as an entry to an unexisting guest", () => {
    const result = mealForm.assignEntry(form, "non-existant", adultEntry.id);
    expect(result).toEqual(form);
  });
});
