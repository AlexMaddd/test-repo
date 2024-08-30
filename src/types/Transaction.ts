import BranchType from "./Branch";
import CustomerType from "./Customer";

type TransactionType = {
  id?: string;
  branch_id?: string;
  customer_id: string;
  transaction_status?: string;
  work_status?: string;
  created_by_id?: string;
  items?: any[];
  branch: BranchType;
  customer: CustomerType;
  created_by: any;
};

export default TransactionType;
