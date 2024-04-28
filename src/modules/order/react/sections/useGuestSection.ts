import { useDependencies } from "@ratatouille/modules/app/react/DependenciesProvider";
import { GuestForm } from "@ratatouille/modules/order/core/form/guest.form";
import { OrderingDomainModel } from "@ratatouille/modules/order/model/ordering.domain-model";
import { useRef, useState } from "react";

export const useGuestSection = () => {
  const { idProvider } = useDependencies();
  const [guests, setGuests] = useState<OrderingDomainModel.Guest[]>([]);

  const guestForm = useRef(new GuestForm(idProvider));

  function addGuest() {
    const newState = guestForm.current.addGuest(guests);
    setGuests(newState);
  }

  function removeGuest(id: string) {
    const newState = guestForm.current.removeGuest(guests, id);
    setGuests(newState);
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
