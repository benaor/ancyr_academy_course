import { OrderingDomainModel } from "@ratatouille/modules/order/core/model/ordering.domain-model";

export class MealForm {
  getSelectableEntries(
    meals: OrderingDomainModel.Meal[],
    guest: OrderingDomainModel.Guest
  ) {
    return meals.filter((meal) => {
      if (meal.type !== OrderingDomainModel.MealType.ENTRY) return false;
      if (meal.requiredAge && guest.age < meal.requiredAge) return false;

      return true;
    });
  }
}
