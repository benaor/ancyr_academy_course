import { IIdProvider } from "@ratatouille/modules/core/id-provider";
import { OrderingDomainModel } from "@ratatouille/modules/order/model/ordering.domain-model";
import { produce } from "immer";

export class GuestForm {
  constructor(private idProvider: IIdProvider) {}

  addGuest(state: OrderingDomainModel.Form): OrderingDomainModel.Form {
    return produce(state, (draft) => {
      draft.guests.push({
        id: this.idProvider.generate(),
        firstName: "John",
        lastName: "Doe",
        age: 0,
      });
    });
  }

  removeGuest(state: OrderingDomainModel.Form, id: string) {
    return produce(state, (draft) => {
      draft.guests = draft.guests.filter((guest) => guest.id !== id);
      if (draft.organizerId === id) draft.organizerId = null;
    });
  }

  changeOrganizer(state: OrderingDomainModel.Form, id: string) {
    return produce(state, (draft) => {
      const exist = draft.guests.some((guest) => guest.id === id);
      draft.organizerId = exist ? id : null;
    });
  }

  isSubmittable(state: OrderingDomainModel.Form) {
    return (
      state.organizerId !== null &&
      state.guests.every(
        (guest) =>
          guest.age > 0 &&
          guest.firstName.length > 0 &&
          guest.lastName.length > 0
      )
    );
  }

  updateGuest<T extends keyof OrderingDomainModel.Guest>(
    state: OrderingDomainModel.Form,
    id: OrderingDomainModel.Guest["id"],
    key: T,
    value: OrderingDomainModel.Guest[T]
  ) {
    return produce(state, (draft) => {
      const guest = draft.guests.find((guest) => guest.id === id);
      if (!guest) return;
      guest[key] = value;
    });
  }
}
