import { OrderingDomainModel } from "@ratatouille/modules/order/model/ordering.domain-model";

export class GuestForm {
  addGuest(state: OrderingDomainModel.Guest[]) {
    return [
      ...state,
      {
        id:
          state.length === 0
            ? "1"
            : (+state[state.length - 1].id + 1).toString(),
        firstName: "john",
        lastName: "doe",
        age: 0,
      },
    ];
  }
}
