import { IIdProvider } from "@ratatouille/modules/core/id-provider";
import { OrderingDomainModel } from "@ratatouille/modules/order/model/ordering.domain-model";
import { nanoid } from "nanoid";
export class GuestForm {
  constructor(private idProvider: IIdProvider) {}

  addGuest(state: OrderingDomainModel.Form): OrderingDomainModel.Form {
    return {
      ...state,
      guests: [
        ...state.guests,
        {
          id: this.idProvider.generate(),
          firstName: "John",
          lastName: "Doe",
          age: 0,
        },
      ],
    };
  }

  removeGuest(state: OrderingDomainModel.Form, id: string) {
    return {
      ...state,
      guests: state.guests.filter((guest) => guest.id !== id),
    };
  }
}
