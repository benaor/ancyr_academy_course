import { IIdProvider } from "@ratatouille/modules/core/id-provider";
import { GuestForm } from "@ratatouille/modules/order/core/form/guest.form";
import { guestFactory } from "@ratatouille/modules/order/core/model/guest.factory";
import { OrderingDomainModel } from "@ratatouille/modules/order/core/model/ordering.domain-model";

class StubIdProvider implements IIdProvider {
  generate() {
    return "1";
  }
}

const idProvider = new StubIdProvider();

const johnDoe = guestFactory.create({
  id: "1",
  firstName: "John",
  lastName: "Doe",
  age: 24,
});

const janeDoe = guestFactory.create({
  id: "2",
  firstName: "Jane",
  lastName: "Doe",
  age: 24,
});

const emptyInitialState: OrderingDomainModel.Form = {
  guests: [],
  organizerId: null,
};

const stateWithOneUser: OrderingDomainModel.Form = {
  guests: [johnDoe],
  organizerId: null,
};

const stateWithTwoUsers: OrderingDomainModel.Form = {
  guests: [johnDoe, janeDoe],
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
        age: 24,
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
        age: 24,
      },
      {
        id: "2",
        firstName: "Jane",
        lastName: "Doe",
        age: 24,
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
        firstName: "Jane",
        lastName: "Doe",
        age: 24,
      },
    ]);
  });

  it("Should remove organizer when the deleted user is him", () => {
    const withOrganizerState = {
      ...stateWithTwoUsers,
      organizerId: "1",
    };
    const state = form.removeGuest(withOrganizerState, "1");
    expect(state.organizerId).toBeNull();
  });
});

describe("Add an organiser", () => {
  it("Set organizer ID when the user doen't exist", () => {
    const state = form.changeOrganizer(emptyInitialState, "1");
    expect(state.organizerId).toEqual(null);
  });

  it("Set organizer ID when one user exist", () => {
    const state = form.changeOrganizer(stateWithOneUser, "1");
    expect(state.organizerId).toEqual("1");
  });
});

describe("Is submittable", () => {
  it("should return false", () => {
    const withOrganizerState = {
      ...stateWithOneUser,
      organizerId: "1",
    };
    const isSubmittable = form.isSubmittable(withOrganizerState);
    expect(isSubmittable).toEqual(true);
  });
});

it.each([
  {
    age: 0,
  },
  {
    firstName: "",
  },
  {
    lastName: "",
  },
])("When the guest is NOT valid, it should NOT be submittable", (guest) => {
  const withOrganizerState = {
    ...stateWithOneUser,
    organizerId: "1",
    guests: [
      {
        ...johnDoe,
        ...guest,
      },
    ],
  };

  const isSubmittable = form.isSubmittable(withOrganizerState);
  expect(isSubmittable).toEqual(false);
});

describe("Update a guest", () => {
  it.each([
    {
      key: "firstName" as keyof OrderingDomainModel.Guest,
      value: "Jane",
    },
    {
      key: "lastName" as keyof OrderingDomainModel.Guest,
      value: "Wick",
    },
    {
      key: "age" as keyof OrderingDomainModel.Guest,
      value: 30,
    },
  ])(`Should change the %s of the guest`, ({ key, value }) => {
    const state = form.updateGuest(stateWithOneUser, "1", key, value);
    expect(state.guests[0][key]).toEqual(value);
  });

  it("Should do nothing when the guest doesn't exist", () => {
    const state = form.updateGuest(stateWithOneUser, "2", "firstName", "Jane");
    expect(state.guests).toEqual(stateWithOneUser.guests);
  });
});
