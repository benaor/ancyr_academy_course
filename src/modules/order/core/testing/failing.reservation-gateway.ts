import { IReservationGateway } from "@ratatouille/modules/order/core/gateway/reservation.gateway";
import { ReserveDTO } from "@ratatouille/modules/order/core/gateway/reserve.dto";

export class FailingReservationGateway implements IReservationGateway {
  async reserve(_: ReserveDTO): Promise<void> {
    throw new Error("Reservation failed");
  }
}
