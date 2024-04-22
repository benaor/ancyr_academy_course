import { IIdProvider } from "@ratatouille/modules/core/id-provider";
import { GuestForm } from "@ratatouille/modules/order/core/form/guest.form";
import { OrderingDomainModel } from "@ratatouille/modules/order/model/ordering.domain-model";

class StubIdProvider implements IIdProvider {
  generate() {
    return "1";
  }
}

const idProvider = new StubIdProvider();

describe("Add a guest", () => {
  it("should add a guest", () => {
    const form = new GuestForm(idProvider);
    const initialState: OrderingDomainModel.Guest[] = [];
    const state = form.addGuest(initialState);

    expect(state).toEqual([
      {
        id: "1",
        firstName: "john",
        lastName: "doe",
        age: 0,
      },
    ]);
  });

  it("should add a guest when there is already one", () => {
    const form = new GuestForm(idProvider);
    const initialState: OrderingDomainModel.Guest[] = [
      {
        id: "1",
        firstName: "john",
        lastName: "doe",
        age: 0,
      },
    ];
    const state = form.addGuest(initialState);

    expect(state).toEqual([
      {
        id: "1",
        firstName: "john",
        lastName: "doe",
        age: 0,
      },
      {
        id: "1",
        firstName: "john",
        lastName: "doe",
        age: 0,
      },
    ]);
  });
  it("should add a guest when there is already two", () => {
    const form = new GuestForm(idProvider);
    const initialState: OrderingDomainModel.Guest[] = [
      {
        id: "1",
        firstName: "john",
        lastName: "doe",
        age: 0,
      },
      {
        id: "2",
        firstName: "john",
        lastName: "doe",
        age: 0,
      },
    ];
    const state = form.addGuest(initialState);

    expect(state).toEqual([
      {
        id: "1",
        firstName: "john",
        lastName: "doe",
        age: 0,
      },
      {
        id: "2",
        firstName: "john",
        lastName: "doe",
        age: 0,
      },
      {
        id: "1",
        firstName: "john",
        lastName: "doe",
        age: 0,
      },
    ]);
  });
});
