import { SystemIdProvider } from "@ratatouille/modules/core/system.id-provider";
import { inMemoryTableGateway } from "@ratatouille/modules/order/core/gateway-infra/in-memory.table-gateway";
import { Dependencies } from "@ratatouille/modules/store/dependencies";
import { AppStore, createStore } from "@ratatouille/modules/store/store";

export class App {
  public dependencies: Dependencies;
  public store: AppStore;

  constructor() {
    this.dependencies = this.setupDependencies();
    this.store = createStore({ dependencies: this.dependencies });
  }

  setupDependencies(): Dependencies {
    return {
      idProvider: new SystemIdProvider(),
      tableGateway: new inMemoryTableGateway(),
    };
  }
}

export const app = new App();
