import { IMealGateway } from "@ratatouille/modules/order/core/gateway/meal.gateway";
import { OrderingDomainModel } from "@ratatouille/modules/order/core/model/ordering.domain-model";

export class StubMealGateway implements IMealGateway {
  constructor(private meals: OrderingDomainModel.Meal[] = []) {}

  getMeals(): Promise<OrderingDomainModel.Meal[]> {
    return Promise.resolve(this.meals);
  }
}
