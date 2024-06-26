export type ReserveDTO = {
  tableId: string;
  guests: Array<{
    id: string;
    firstName: string;
    lastName: string;
    age: number;
    isOrganizer: boolean;
    meals: {
      entry: string | null;
      mainCourse: string;
      dessert: string | null;
      drink: string | null;
    };
  }>;
};
