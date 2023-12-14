import { OrderingDomainModel } from "@ratatouille/modules/order/model/ordering.domain-model";
import { useState } from "react";

export const useGuestSection = () => {
  function addGuest() {
    setGuests([
      ...guests,
      {
        id: Math.random().toString(),
        firstName: "",
        lastName: "",
        age: 0,
      },
    ]);
  }

  function removeGuest(id: string) {
    setGuests((guests) => guests.filter((guest) => guest.id !== id));
  }

  function updateGuest() {
    console.log("updateGuest");
  }

  function changeOrganizer() {
    console.log("changeOrganizer");
  }

  function onNext() {
    console.log("onNext");
  }

  function isSubmittable() {
    return false;
  }

  const [guests, setGuests] = useState<OrderingDomainModel.Guest[]>([]);

  return {
    addGuest,
    updateGuest,
    removeGuest,
    changeOrganizer,
    onNext,
    isSubmittable,
    guests,
  };
};
