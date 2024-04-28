import { IIdProvider } from "@ratatouille/modules/core/id-provider";
import { OrderingDomainModel } from "@ratatouille/modules/order/model/ordering.domain-model";
import { nanoid } from "nanoid";
export class GuestForm {
  constructor(private idProvider: IIdProvider) {}

  addGuest(state: OrderingDomainModel.Guest[]) {
    return [
      ...state,
      {
        id: this.idProvider.generate(),
        firstName: "John",
        lastName: "Doe",
        age: 0,
      },
    ];
  }

  removeGuest(state: OrderingDomainModel.Guest[], id: string) {
    return state.filter((guest) => guest.id !== id);
  }
}