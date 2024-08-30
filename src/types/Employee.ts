type EmployeeType = {
  id?: string;
  fname: string;
  mname: string;
  lname: string;
  employee_code: string;
  date_of_birth: any;
  start_date: any;
  end_date: any;
  employment_status: number | boolean;
  full_name?: string;
};

export default EmployeeType;
