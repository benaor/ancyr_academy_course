import { useDependencies } from "@ratatouille/modules/app/react/DependenciesProvider";
import { GuestForm } from "@ratatouille/modules/order/core/form/guest.form";
import { OrderingDomainModel } from "@ratatouille/modules/order/model/ordering.domain-model";
import { useRef, useState } from "react";

export const useGuestSection = () => {
  const { idProvider } = useDependencies();
  const [form, setForm] = useState<OrderingDomainModel.Form>({
    guests: [],
    organizerId: null,
  });

  const guestForm = useRef(new GuestForm(idProvider));

  function addGuest() {
    const newState = guestForm.current.addGuest(form);
    setForm(newState);
  }

  function removeGuest(id: string) {
    const newState = guestForm.current.removeGuest(form, id);
    setForm(newState);
  }

  function updateGuest() {
    console.log("updateGuest");
  }

  function changeOrganizer(id: string) {
    const newState = guestForm.current.changeOrganizer(form, id);
    setForm(newState);
  }

  function onNext() {
    console.log("onNext");
  }

  function isSubmittable() {
    return guestForm.current.isSubmittable(form);
  }

  return {
    addGuest,
    updateGuest,
    removeGuest,
    changeOrganizer,
    onNext,
    isSubmittable: isSubmittable(),
    form,
  };
};
