import CustomerType from "./Customer";

type VehicleType = {
  id?: string;
  maker: string;
  model: string;
  plate_number: string;
  customer_id: string;
  owner?: string;
  customer?: CustomerType;
};

export default VehicleType;
