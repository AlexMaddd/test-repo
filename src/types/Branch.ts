import EmployeeType from "./Employee";

type BranchType = {
  id?: string;
  name: string;
  address: string;
  employees?: EmployeeType[];
  // description: string;
  // isChecked?: boolean;
};

export default BranchType;
