import { IReservationGateway } from "@ratatouille/modules/order/core/gateway/reservation.gateway";
import { ReserveDTO } from "@ratatouille/modules/order/core/gateway/reserve.dto";

export class InMemoryReservationGateway implements IReservationGateway {
  async reserve(reserveDTO: ReserveDTO): Promise<void> {
    return Promise.resolve();
  }
}
