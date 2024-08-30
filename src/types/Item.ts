import BrandType from "./Brand";
import TypeType from "./Types";

type ItemType = {
  id?: string;
  name: string;
  description: string;
  brand_id?: string;
  type_id?: string;
  brand?: BrandType;
  type?: TypeType;
};

export default ItemType;
