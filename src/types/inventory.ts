export interface InventoryCountUpdated {
    merchant_id: string;
    type: string;
    event_id: string;
    created_at: string;
    data: Data;
  }

  export interface Data {
    type: string;
    id: string;
    object: DataObject;
  }

  export interface DataObject {
    inventory_counts?: (InventoryCountsEntity)[] | null;
  }

  export interface InventoryCountsEntity {
    calculated_at: string;
    catalog_object_id: string;
    catalog_object_type: string;
    location_id: string;
    quantity: string;
    state: string;
  }
  
  export interface CatalogObject {
    object: CatObject;
  }

  export interface CatObject {
    type?: string | null;
    id?: string | null;
    updated_at?: string | null;
    created_at?: string | null;
    version: number;
    is_deleted: boolean;
    present_at_all_locations: boolean;
    item_data: ItemData;
  }
  export interface ItemData {
    name?: string | null;
    description?: string | null;
    visibility?: string | null;
    category_id?: string | null;
    variations?: (VariationsEntity)[] | null;
    product_type?: string | null;
    skip_modifier_screen: boolean;
    ecom_visibility?: string | null;
  }
  export interface VariationsEntity {
    type?: string | null;
    id?: string | null;
    updated_at?: string | null;
    created_at?: string | null;
    version: number;
    is_deleted: boolean;
    custom_attribute_values?: CAV_Keys | null;
    present_at_all_locations: boolean;
    item_variation_data: ItemVariationData;
  }
  export interface CAV_Keys {
    [key: string]: CAV_Values;
  }
  export interface CAV_Values {
    name?: string | null;
    string_value?: string | null;
    custom_attribute_definition_id?: string | null;
    type?: string | null;
    key?: string | null;
  }
  export interface ItemVariationData {
    item_id?: string | null;
    name?: string | null;
    sku?: string | null;
    ordinal: number;
    pricing_type?: string | null;
    price_money: PriceMoney;
    location_overrides?: (LocationOverridesEntity)[] | null;
    sellable: boolean;
    stockable: boolean;
  }
  export interface PriceMoney {
    amount: number;
    currency?: string | null;
  }
  export interface LocationOverridesEntity {
    location_id?: string | null;
    track_inventory: boolean;
  }
  