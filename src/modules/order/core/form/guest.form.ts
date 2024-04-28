import { IIdProvider } from "@ratatouille/modules/core/id-provider";
import { OrderingDomainModel } from "@ratatouille/modules/order/model/ordering.domain-model";

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

  changeOrganizer(state: OrderingDomainModel.Form, id: string) {
    return {
      ...state,
      organizerId: state.guests.some((guest) => guest.id === id) ? id : null,
    };
  }

  isSubmittable(state: OrderingDomainModel.Form) {
    return state.organizerId !== null;
  }

  updateGuest<T extends keyof OrderingDomainModel.Guest>(
    state: OrderingDomainModel.Form,
    id: OrderingDomainModel.Guest["id"],
    key: T,
    value: OrderingDomainModel.Guest[T]
  ) {
    return {
      ...state,
      guests: state.guests.map((guest) =>
        guest.id === id ? { ...guest, [key]: value } : guest
      ),
    };
  }
}
