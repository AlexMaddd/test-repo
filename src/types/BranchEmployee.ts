import EmployeeType from "./Employee";

type BranchEmployeeType = {
  id: string;
  branch_id: string;
  employee_id: string;
  employee: EmployeeType;
};

export default BranchEmployeeType;
