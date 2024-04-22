import { useDependencies } from "@ratatouille/modules/app/react/DependenciesProvider";
import { GuestForm } from "@ratatouille/modules/order/core/form/guest.form";
import { OrderingDomainModel } from "@ratatouille/modules/order/model/ordering.domain-model";
import { useRef, useState } from "react";

export const useGuestSection = () => {
  const { idProvider } = useDependencies();
  const [guests, setGuests] = useState<OrderingDomainModel.Guest[]>([]);

  function addGuest() {
    const newState = guestForm.current.addGuest(guests);
    setGuests(newState);
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

  const guestForm = useRef(new GuestForm(idProvider));

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
