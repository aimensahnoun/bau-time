//Recoil import
import { atom } from "recoil";

//Models
export interface Employee {
  id: string;
  name: string;
  type: string;
  imgUrl: string;
  office: string | null;
}

export const employeesState = atom<Employee[]>({
  key: "employeesState",
  default: [],
});
