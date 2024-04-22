import { app } from "@ratatouille/modules/app/main";
import { Dependencies } from "@ratatouille/modules/store/dependencies";
import { ReactNode, createContext, useContext } from "react";

const DependenciesContext = createContext<Dependencies>(null as any);

export const DependenciesProvider: React.FC<{
  children: ReactNode;
  dependencies: Dependencies;
}> = ({ children, dependencies }) => {
  return (
    <DependenciesContext.Provider value={dependencies}>
      {children}
    </DependenciesContext.Provider>
  );
};

export const useDependencies = () => useContext(DependenciesContext);
