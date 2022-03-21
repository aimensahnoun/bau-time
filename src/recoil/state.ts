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

export interface Unit {
  id: string;
  name: string;
  responsible: string;
  imgUrl: string;
  responsibleId: string;
}

export const employeesState = atom<Employee[]>({
  key: "employeesState",
  default: [],
});

export const unitsState = atom<Unit[]>({
  key: "unitsState",
  default: [],
});
