import { IIdProvider } from "@ratatouille/modules/core/id-provider";

export class StubIdProvider implements IIdProvider {
  generate() {
    return "1";
  }
}
