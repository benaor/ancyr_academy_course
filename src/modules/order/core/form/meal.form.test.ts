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

  describe("Assigning entry", () => {
    it.each([
      {
        guestId: adult.id,
        mealId: null,
        expected: null,
      },
      {
        guestId: adult.id,
        mealId: adultEntry.id,
        expected: adultEntry.id,
      },
      {
        guestId: "non-existant",
        mealId: adultEntry.id,
        expected: form.guests[0].meals.entry,
      },
    ])("Should assign an entry to a guest", ({ guestId, mealId, expected }) => {
      const result = mealForm.assignEntry(form, guestId, mealId);
      expect(result.guests[0].meals.entry).toEqual(expected);
    });
  });

  describe("Assigning main course", () => {
    it.each([
      {
        guestId: adult.id,
        mealId: null,
        expected: null,
      },
      {
        guestId: adult.id,
        mealId: adultMainCourse.id,
        expected: adultMainCourse.id,
      },
      {
        guestId: "non-existant",
        mealId: adultMainCourse.id,
        expected: form.guests[0].meals.mainCourse,
      },
    ])(
      "Should assign a main course to a guest",
      ({ guestId, mealId, expected }) => {
        const result = mealForm.assignMainCourse(form, guestId, mealId);
        expect(result.guests[0].meals.mainCourse).toEqual(expected);
      }
    );
  });

  describe("Assigning dessert", () => {
    it.each([
      {
        guestId: adult.id,
        mealId: null,
        expected: null,
      },
      {
        guestId: adult.id,
        mealId: adultDessert.id,
        expected: adultDessert.id,
      },
      {
        guestId: "non-existant",
        mealId: adultDessert.id,
        expected: form.guests[0].meals.dessert,
      },
    ])(
      "Should assign a dessert to a guest",
      ({ guestId, mealId, expected }) => {
        const result = mealForm.assignDessert(form, guestId, mealId);
        expect(result.guests[0].meals.dessert).toEqual(expected);
      }
    );
  });

  describe("Assigning drink", () => {
    it.each([
      {
        guestId: adult.id,
        mealId: null,
        expected: null,
      },
      {
        guestId: adult.id,
        mealId: adultDrink.id,
        expected: adultDrink.id,
      },
      {
        guestId: "non-existant",
        mealId: adultDrink.id,
        expected: form.guests[0].meals.drink,
      },
    ])("Should assign a drink to a guest", ({ guestId, mealId, expected }) => {
      const result = mealForm.assignDrink(form, guestId, mealId);
      expect(result.guests[0].meals.drink).toEqual(expected);
    });
  });
});
