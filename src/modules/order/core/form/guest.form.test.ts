import { IIdProvider } from "@ratatouille/modules/core/id-provider";
import { GuestForm } from "@ratatouille/modules/order/core/form/guest.form";
import { OrderingDomainModel } from "@ratatouille/modules/order/model/ordering.domain-model";

class StubIdProvider implements IIdProvider {
  generate() {
    return "1";
  }
}

const idProvider = new StubIdProvider();
const emptyInitialState: OrderingDomainModel.Form = {
  guests: [],
  organizerId: null,
};

const stateWithOneUser: OrderingDomainModel.Form = {
  guests: [
    {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      age: 0,
    },
  ],
  organizerId: null,
};

const stateWithTwoUsers: OrderingDomainModel.Form = {
  guests: [
    {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      age: 0,
    },
    {
      id: "2",
      firstName: "John",
      lastName: "Doe",
      age: 0,
    },
  ],
  organizerId: null,
};

const form = new GuestForm(idProvider);

describe("Add a guest", () => {
  it("should add a guest", () => {
    const state = form.addGuest(emptyInitialState);

    expect(state.guests).toEqual([
      {
        id: "1",
        firstName: "John",
        lastName: "Doe",
        age: 0,
      },
    ]);
  });

  it("should add a guest when there is already one", () => {
    const state = form.addGuest(stateWithOneUser);

    expect(state.guests).toEqual([
      {
        id: "1",
        firstName: "John",
        lastName: "Doe",
        age: 0,
      },
      {
        id: "1",
        firstName: "John",
        lastName: "Doe",
        age: 0,
      },
    ]);
  });
  it("should add a guest when there is already two", () => {
    const state = form.addGuest(stateWithTwoUsers);

    expect(state.guests).toEqual([
      {
        id: "1",
        firstName: "John",
        lastName: "Doe",
        age: 0,
      },
      {
        id: "2",
        firstName: "John",
        lastName: "Doe",
        age: 0,
      },
      {
        id: "1",
        firstName: "John",
        lastName: "Doe",
        age: 0,
      },
    ]);
  });
});

describe("removing a guest", () => {
  it("When there is no user, the remove should do nothing", () => {
    const state = form.removeGuest(emptyInitialState, "1");
    expect(state.guests).toEqual([]);
  });

  it("When there is a user with ID 1, the user with ID 1 should be removed", () => {
    const state = form.removeGuest(stateWithOneUser, "1");
    expect(state.guests).toEqual([]);
  });

  it("When there is two users, only the user with ID 1 should be removed", () => {
    const state = form.removeGuest(stateWithTwoUsers, "1");
    expect(state.guests).toEqual([
      {
        id: "2",
        firstName: "John",
        lastName: "Doe",
        age: 0,
      },
    ]);
  });
});
