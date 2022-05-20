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
    object: InventoryCountsObject;
  }
  export interface InventoryCountsObject {
    inventory_counts: (InventoryCountsEntity)[];
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
    object: Object;
  }
  
  export interface Object {
    type: string;
    id: string;
    updated_at: string;
    version: number;
    is_deleted: boolean;
    present_at_all_locations: boolean;
    item_data: ItemData;
  }
  export interface ItemData {
    name: string;
    description: string;
    visibility: string;
    variations: (VariationsEntity)[];
    product_type: string;
    skip_modifier_screen: boolean;
    ecom_available: boolean;
    ecom_visibility: string;
  }
  export interface VariationsEntity {
    type: string;
    id: string;
    updated_at: string;
    version: number;
    is_deleted: boolean;
    present_at_all_locations: boolean;
    item_variation_data: ItemVariationData;
  }
  export interface ItemVariationData {
    item_id: string;
    name: string;
    sku: string;
    ordinal: number;
    pricing_type: string;
    price_money: PriceMoney;
    location_overrides?: (LocationOverridesEntity)[] | null;
  }
  export interface PriceMoney {
    amount: number;
    currency: string;
  }
  export interface LocationOverridesEntity {
    location_id: string;
    track_inventory: boolean;
    inventory_alert_type: string;
    inventory_alert_threshold: number;
  }
  