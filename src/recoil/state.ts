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
  schedule: string | null;
}

export interface Timesheet {
  id: string;
  unitId: string;
  timesheet: {};
  month: string;
  submitted: boolean;
}

export const employeesState = atom<Employee[]>({
  key: "employeesState",
  default: [],
});

export const unitsState = atom<Unit[]>({
  key: "unitsState",
  default: [],
});

export const userState = atom<Employee | null>({
  key: "userState",
  default: null,
});

export const currentTabState = atom<number>({
  key: "currentTabState",
  default: 0,
});

export const previousTabState = atom<number>({
  key: "previousTabState",
  default: 0,
});

export const selectedUnitState = atom<Unit | null>({
  key: "selectedUnitState",
  default: null,
});

export const timesheetsState = atom<Timesheet[]>({
  key: "timesheetsState",
  default: [],
});
