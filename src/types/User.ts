type UserType = {
  id: number;
  fname: string;
  mname: string;
  lname: string;
  username: string;
  email: string;
  slug: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  role: string;
  password: string;
  password_confirmation: string;
  isChecked?: boolean;
  full_name?: string;
  branch_id?: string;
};

export default UserType;
