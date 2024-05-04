export class FailingMealGateway {
  constructor() {}

  getMeals() {
    return Promise.reject(new Error("Failed to fetch data"));
  }
}
