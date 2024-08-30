import ItemType from "./Item";

type ServiceType = {
  id?: string;
  name: string;
  description: string;
  is_package: boolean | number;
  is_parent: boolean | number;
  parent_id?: string;
  items?: ItemType[];
};

export default ServiceType;
