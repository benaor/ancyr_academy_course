"use client";

import React from "react";
import { GuestSection } from "@ratatouille/modules/order/react/sections/guest/GuestSection";
import { AppState } from "@ratatouille/modules/store/store";
import { useSelector } from "react-redux";

import { MealsSection } from "@ratatouille/modules/order/react/sections/meals/MealsSection";
import { TableSection } from "@ratatouille/modules/order/react/sections/table/TableSection";
import { SummarySection } from "@ratatouille/modules/order/react/sections/summary/SummarySection";
import { ReservedSection } from "@ratatouille/modules/order/react/sections/reserved/ReservedSection";
import { OrderingDomainModel } from "@ratatouille/modules/order/core/model/ordering.domain-model";
import { stepSelector } from "@ratatouille/modules/order/react/pages/order/step.selector";

export const OrderPage: React.FC = () => {
  const step = useSelector(stepSelector);
  return (
    <main>
      {step === OrderingDomainModel.OrderingStep.GUESTS && <GuestSection />}
      {step === OrderingDomainModel.OrderingStep.TABLE && <TableSection />}
      {step === OrderingDomainModel.OrderingStep.MEALS && <MealsSection />}
      {step === OrderingDomainModel.OrderingStep.SUMMARY && <SummarySection />}
      {step === OrderingDomainModel.OrderingStep.RESERVED && (
        <ReservedSection />
      )}
    </main>
  );
};
