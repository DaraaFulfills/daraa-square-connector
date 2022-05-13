export interface IOrder {
    app_id: number;
    billing_address: BillingAddressOrShippingAddress;
    browser_ip: string;
    buyer_accepts_marketing: boolean;
    cancel_reason: string;
    cancelled_at?: null;
    cart_token: string;
    checkout_token: string;
    client_details: ClientDetails;
    closed_at: string;
    created_at: string;
    currency: string;
    current_total_discounts: string;
    current_total_discounts_set: CurrentTotalDiscountsSet;
    current_total_duties_set: CurrentTotalDutiesSet;
    current_total_price: string;
    current_total_price_set: CurrentTotalPriceSet;
    current_subtotal_price: string;
    current_subtotal_price_set: CurrentSubtotalPriceSet;
    current_total_tax: string;
    current_total_tax_set: CurrentTotalTaxSet;
    customer: Customer;
    customer_locale: string;
    discount_applications: DiscountApplications;
    discount_codes?: (DiscountCodesEntity)[] | null;
    email: string;
    estimated_taxes: boolean;
    financial_status: string;
    fulfillments?: (FulfillmentsEntity)[] | null;
    fulfillment_status: string;
    gateway: string;
    id: number;
    landing_site: string;
    line_items?: (LineItemsEntity)[] | null;
    location_id: number;
    name: string;
    note: string;
    note_attributes?: (PropertiesEntityOrNoteAttributesEntity)[] | null;
    number: number;
    order_number: number;
    original_total_duties_set: OriginalTotalDutiesSet;
    payment_details: PaymentDetails;
    payment_terms: PaymentTerms;
    payment_gateway_names?: (string)[] | null;
    phone: string;
    presentment_currency: string;
    processed_at: string;
    processing_method: string;
    referring_site: string;
    refunds?: (RefundsEntity)[] | null;
    shipping_address: BillingAddressOrShippingAddress;
    shipping_lines?: (ShippingLinesEntity)[] | null;
    source_name: string;
    source_identifier: string;
    source_url: string;
    subtotal_price: number;
    subtotal_price_set: CurrentTotalDiscountsSetOrCurrentTotalDutiesSetOrCurrentTotalPriceSetOrCurrentSubtotalPriceSetOrCurrentTotalTaxSetOrPriceSetOrAmountSetOrTotalDiscountSetOrOriginalTotalDutiesSetOrDiscountedPriceSetOrSubtotalPriceSetOrTotalDiscountsSetOrTotalLineItemsPriceSetOrTotalPriceSetOrTotalShippingPriceSetOrTotalTaxSet;
    tags: string;
    tax_lines?: (TaxLinesEntity)[] | null;
    taxes_included: boolean;
    test: boolean;
    token: string;
    total_discounts: string;
    total_discounts_set: CurrentTotalDiscountsSetOrCurrentTotalDutiesSetOrCurrentTotalPriceSetOrCurrentSubtotalPriceSetOrCurrentTotalTaxSetOrPriceSetOrAmountSetOrTotalDiscountSetOrOriginalTotalDutiesSetOrDiscountedPriceSetOrSubtotalPriceSetOrTotalDiscountsSetOrTotalLineItemsPriceSetOrTotalPriceSetOrTotalShippingPriceSetOrTotalTaxSet;
    total_line_items_price: string;
    total_line_items_price_set: CurrentTotalDiscountsSetOrCurrentTotalDutiesSetOrCurrentTotalPriceSetOrCurrentSubtotalPriceSetOrCurrentTotalTaxSetOrPriceSetOrAmountSetOrTotalDiscountSetOrOriginalTotalDutiesSetOrDiscountedPriceSetOrSubtotalPriceSetOrTotalDiscountsSetOrTotalLineItemsPriceSetOrTotalPriceSetOrTotalShippingPriceSetOrTotalTaxSet;
    total_outstanding: string;
    total_price: string;
    total_price_set: CurrentTotalDiscountsSetOrCurrentTotalDutiesSetOrCurrentTotalPriceSetOrCurrentSubtotalPriceSetOrCurrentTotalTaxSetOrPriceSetOrAmountSetOrTotalDiscountSetOrOriginalTotalDutiesSetOrDiscountedPriceSetOrSubtotalPriceSetOrTotalDiscountsSetOrTotalLineItemsPriceSetOrTotalPriceSetOrTotalShippingPriceSetOrTotalTaxSet;
    total_shipping_price_set: CurrentTotalDiscountsSetOrCurrentTotalDutiesSetOrCurrentTotalPriceSetOrCurrentSubtotalPriceSetOrCurrentTotalTaxSetOrPriceSetOrAmountSetOrTotalDiscountSetOrOriginalTotalDutiesSetOrDiscountedPriceSetOrSubtotalPriceSetOrTotalDiscountsSetOrTotalLineItemsPriceSetOrTotalPriceSetOrTotalShippingPriceSetOrTotalTaxSet;
    total_tax: string;
    total_tax_set: CurrentTotalDiscountsSetOrCurrentTotalDutiesSetOrCurrentTotalPriceSetOrCurrentSubtotalPriceSetOrCurrentTotalTaxSetOrPriceSetOrAmountSetOrTotalDiscountSetOrOriginalTotalDutiesSetOrDiscountedPriceSetOrSubtotalPriceSetOrTotalDiscountsSetOrTotalLineItemsPriceSetOrTotalPriceSetOrTotalShippingPriceSetOrTotalTaxSet;
    total_tip_received: string;
    total_weight: number;
    updated_at: string;
    user_id: number;
    order_status_url: OrderStatusUrl;
  }
  export interface BillingAddressOrShippingAddress {
    address1: string;
    address2: string;
    city: string;
    company?: null;
    country: string;
    first_name: string;
    last_name: string;
    phone: string;
    province: string;
    zip: string;
    name: string;
    province_code: string;
    country_code: string;
    latitude: string;
    longitude: string;
  }
  export interface ClientDetails {
    accept_language: string;
    browser_height: number;
    browser_ip: string;
    browser_width: number;
    session_hash: string;
    user_agent: string;
  }
  export interface CurrentTotalDiscountsSet {
    current_total_discounts_set: CurrentTotalDiscountsSetOrCurrentTotalDutiesSetOrCurrentTotalPriceSetOrCurrentSubtotalPriceSetOrCurrentTotalTaxSetOrPriceSetOrAmountSetOrTotalDiscountSetOrOriginalTotalDutiesSetOrDiscountedPriceSetOrSubtotalPriceSetOrTotalDiscountsSetOrTotalLineItemsPriceSetOrTotalPriceSetOrTotalShippingPriceSetOrTotalTaxSet;
  }
  export interface CurrentTotalDiscountsSetOrCurrentTotalDutiesSetOrCurrentTotalPriceSetOrCurrentSubtotalPriceSetOrCurrentTotalTaxSetOrPriceSetOrAmountSetOrTotalDiscountSetOrOriginalTotalDutiesSetOrDiscountedPriceSetOrSubtotalPriceSetOrTotalDiscountsSetOrTotalLineItemsPriceSetOrTotalPriceSetOrTotalShippingPriceSetOrTotalTaxSet {
    shop_money: ShopMoneyOrPresentmentMoney;
    presentment_money: ShopMoneyOrPresentmentMoney;
  }
  export interface ShopMoneyOrPresentmentMoney {
    amount: string;
    currency_code: string;
  }
  export interface CurrentTotalDutiesSet {
    current_total_duties_set: CurrentTotalDiscountsSetOrCurrentTotalDutiesSetOrCurrentTotalPriceSetOrCurrentSubtotalPriceSetOrCurrentTotalTaxSetOrPriceSetOrAmountSetOrTotalDiscountSetOrOriginalTotalDutiesSetOrDiscountedPriceSetOrSubtotalPriceSetOrTotalDiscountsSetOrTotalLineItemsPriceSetOrTotalPriceSetOrTotalShippingPriceSetOrTotalTaxSet;
  }
  export interface CurrentTotalPriceSet {
    current_total_price_set: CurrentTotalDiscountsSetOrCurrentTotalDutiesSetOrCurrentTotalPriceSetOrCurrentSubtotalPriceSetOrCurrentTotalTaxSetOrPriceSetOrAmountSetOrTotalDiscountSetOrOriginalTotalDutiesSetOrDiscountedPriceSetOrSubtotalPriceSetOrTotalDiscountsSetOrTotalLineItemsPriceSetOrTotalPriceSetOrTotalShippingPriceSetOrTotalTaxSet;
  }
  export interface CurrentSubtotalPriceSet {
    current_subtotal_price_set: CurrentTotalDiscountsSetOrCurrentTotalDutiesSetOrCurrentTotalPriceSetOrCurrentSubtotalPriceSetOrCurrentTotalTaxSetOrPriceSetOrAmountSetOrTotalDiscountSetOrOriginalTotalDutiesSetOrDiscountedPriceSetOrSubtotalPriceSetOrTotalDiscountsSetOrTotalLineItemsPriceSetOrTotalPriceSetOrTotalShippingPriceSetOrTotalTaxSet;
  }
  export interface CurrentTotalTaxSet {
    current_total_tax_set: CurrentTotalDiscountsSetOrCurrentTotalDutiesSetOrCurrentTotalPriceSetOrCurrentSubtotalPriceSetOrCurrentTotalTaxSetOrPriceSetOrAmountSetOrTotalDiscountSetOrOriginalTotalDutiesSetOrDiscountedPriceSetOrSubtotalPriceSetOrTotalDiscountsSetOrTotalLineItemsPriceSetOrTotalPriceSetOrTotalShippingPriceSetOrTotalTaxSet;
  }
  export interface Customer {
    id: number;
    email: string;
    accepts_marketing: boolean;
    created_at: string;
    updated_at: string;
    first_name: string;
    last_name: string;
    state: string;
    note?: null;
    verified_email: boolean;
    multipass_identifier?: null;
    tax_exempt: boolean;
    tax_exemptions: TaxExemptionsOrAddressesOrDefaultAddress;
    phone: string;
    tags: string;
    currency: string;
    addresses: TaxExemptionsOrAddressesOrDefaultAddress;
    admin_graphql_api_id: string;
    default_address: TaxExemptionsOrAddressesOrDefaultAddress;
  }
  export interface TaxExemptionsOrAddressesOrDefaultAddress {
  }
  export interface DiscountApplications {
    discount_applications?: (DiscountApplicationsEntity)[] | null;
  }
  export interface DiscountApplicationsEntity {
    type: string;
    title?: string | null;
    description?: string | null;
    value: string;
    value_type: string;
    allocation_method: string;
    target_selection: string;
    target_type: string;
    code?: string | null;
  }
  export interface DiscountCodesEntity {
    code: string;
    amount: string;
    type: string;
  }
  export interface FulfillmentsEntity {
    created_at: string;
    id: number;
    order_id: number;
    status: string;
    tracking_company: string;
    tracking_number: string;
    updated_at: string;
  }
  export interface LineItemsEntity {
    fulfillable_quantity: number;
    fulfillment_service: string;
    fulfillment_status: string;
    grams: number;
    id: number;
    price: string;
    product_id: number;
    quantity: number;
    requires_shipping: boolean;
    sku: string;
    title: string;
    variant_id: number;
    variant_title: string;
    vendor: string;
    name: string;
    gift_card: boolean;
    price_set: CurrentTotalDiscountsSetOrCurrentTotalDutiesSetOrCurrentTotalPriceSetOrCurrentSubtotalPriceSetOrCurrentTotalTaxSetOrPriceSetOrAmountSetOrTotalDiscountSetOrOriginalTotalDutiesSetOrDiscountedPriceSetOrSubtotalPriceSetOrTotalDiscountsSetOrTotalLineItemsPriceSetOrTotalPriceSetOrTotalShippingPriceSetOrTotalTaxSet;
    properties?: (PropertiesEntityOrNoteAttributesEntity)[] | null;
    taxable: boolean;
    tax_lines?: (TaxLinesEntity1)[] | null;
    total_discount: string;
    total_discount_set: CurrentTotalDiscountsSetOrCurrentTotalDutiesSetOrCurrentTotalPriceSetOrCurrentSubtotalPriceSetOrCurrentTotalTaxSetOrPriceSetOrAmountSetOrTotalDiscountSetOrOriginalTotalDutiesSetOrDiscountedPriceSetOrSubtotalPriceSetOrTotalDiscountsSetOrTotalLineItemsPriceSetOrTotalPriceSetOrTotalShippingPriceSetOrTotalTaxSet;
    discount_allocations?: (DiscountAllocationsEntity)[] | null;
    origin_location: OriginLocation;
    duties?: (DutiesEntity)[] | null;
  }
  export interface PropertiesEntityOrNoteAttributesEntity {
    name: string;
    value: string;
  }
  export interface TaxLinesEntity1 {
    title: string;
    price: string;
    price_set: CurrentTotalDiscountsSetOrCurrentTotalDutiesSetOrCurrentTotalPriceSetOrCurrentSubtotalPriceSetOrCurrentTotalTaxSetOrPriceSetOrAmountSetOrTotalDiscountSetOrOriginalTotalDutiesSetOrDiscountedPriceSetOrSubtotalPriceSetOrTotalDiscountsSetOrTotalLineItemsPriceSetOrTotalPriceSetOrTotalShippingPriceSetOrTotalTaxSet;
    channel_liable: boolean;
    rate: number;
  }
  export interface DiscountAllocationsEntity {
    amount: string;
    discount_application_index: number;
    amount_set: CurrentTotalDiscountsSetOrCurrentTotalDutiesSetOrCurrentTotalPriceSetOrCurrentSubtotalPriceSetOrCurrentTotalTaxSetOrPriceSetOrAmountSetOrTotalDiscountSetOrOriginalTotalDutiesSetOrDiscountedPriceSetOrSubtotalPriceSetOrTotalDiscountsSetOrTotalLineItemsPriceSetOrTotalPriceSetOrTotalShippingPriceSetOrTotalTaxSet;
  }
  export interface OriginLocation {
    id: number;
    country_code: string;
    province_code: string;
    name: string;
    address1: string;
    address2: string;
    city: string;
    zip: string;
  }
  export interface DutiesEntity {
    id: string;
    harmonized_system_code: string;
    country_code_of_origin: string;
    shop_money: ShopMoneyOrPresentmentMoney;
    presentment_money: ShopMoneyOrPresentmentMoney;
    tax_lines?: (TaxLinesEntity1)[] | null;
    admin_graphql_api_id: string;
  }
  export interface OriginalTotalDutiesSet {
    original_total_duties_set: CurrentTotalDiscountsSetOrCurrentTotalDutiesSetOrCurrentTotalPriceSetOrCurrentSubtotalPriceSetOrCurrentTotalTaxSetOrPriceSetOrAmountSetOrTotalDiscountSetOrOriginalTotalDutiesSetOrDiscountedPriceSetOrSubtotalPriceSetOrTotalDiscountsSetOrTotalLineItemsPriceSetOrTotalPriceSetOrTotalShippingPriceSetOrTotalTaxSet;
  }
  export interface PaymentDetails {
    avs_result_code: string;
    credit_card_bin: string;
    cvv_result_code: string;
    credit_card_number: string;
    credit_card_company: string;
  }
  export interface PaymentTerms {
    amount: number;
    currency: string;
    payment_terms_name: string;
    payment_terms_type: string;
    due_in_days: number;
    payment_schedules?: (PaymentSchedulesEntity)[] | null;
  }
  export interface PaymentSchedulesEntity {
    amount: number;
    currency: string;
    issued_at: string;
    due_at: string;
    completed_at: string;
    expected_payment_method: string;
  }
  export interface RefundsEntity {
    id: number;
    order_id: number;
    created_at: string;
    note?: null;
    user_id?: null;
    processed_at: string;
    refund_line_items?: (null)[] | null;
    transactions?: (null)[] | null;
    order_adjustments?: (null)[] | null;
  }
  export interface ShippingLinesEntity {
    code: string;
    price: string;
    price_set: CurrentTotalDiscountsSetOrCurrentTotalDutiesSetOrCurrentTotalPriceSetOrCurrentSubtotalPriceSetOrCurrentTotalTaxSetOrPriceSetOrAmountSetOrTotalDiscountSetOrOriginalTotalDutiesSetOrDiscountedPriceSetOrSubtotalPriceSetOrTotalDiscountsSetOrTotalLineItemsPriceSetOrTotalPriceSetOrTotalShippingPriceSetOrTotalTaxSet;
    discounted_price: string;
    discounted_price_set: CurrentTotalDiscountsSetOrCurrentTotalDutiesSetOrCurrentTotalPriceSetOrCurrentSubtotalPriceSetOrCurrentTotalTaxSetOrPriceSetOrAmountSetOrTotalDiscountSetOrOriginalTotalDutiesSetOrDiscountedPriceSetOrSubtotalPriceSetOrTotalDiscountsSetOrTotalLineItemsPriceSetOrTotalPriceSetOrTotalShippingPriceSetOrTotalTaxSet;
    source: string;
    title: string;
    tax_lines?: (null)[] | null;
    carrier_identifier: string;
    requested_fulfillment_service_id: string;
  }
  export interface TaxLinesEntity {
    price: number;
    rate: number;
    title: string;
    channel_liable: boolean;
  }
  export interface OrderStatusUrl {
    order_status_url: string;
  }

  export interface IOrigin {
    "country": string;
    "postal_code": string;
    "province": string;
    "city": string;
    "name": string;
    "address1": string;
    "address2": string;
    "address3": string;
    "phone": string;
    "fax": string;
    "email": string;
    "address_type": string;
    "company_name": string;
}


export interface IDestination {
    "country": string;
    "postal_code": string;
    "province": string;
    "city": string;
    "name": string;
    "address1": string;
    "address2": string;
    "address3": string;
    "phone": string;
    "fax": string;
    "email": string;
    "address_type": string;
    "company_name": string;
}

export interface IInventoryItem {
    "name": string;
    "sku": string;
    "quantity": number;
    "grams": number;
    "price": number;
    "vendor": string;
    "requires_shipping": boolean;  
    "taxable": boolean;
    "fulfillment_service": string;
    "properties": string;
    "product_id": number;
    "variant_id": number;
}

export interface IRateRequestDetail {
    "origin": IOrigin;
    "destination": IDestination;
    "items": IItem[];
    "currency": number;
    "locale": string;
}

export interface IRateRequest {
    "rate": IRateRequestDetail;
}

export interface IRate {
    "service_name": string;
    "service_code": string;
    "total_price": number;
    "currency": string;
    "min_delivery_date": Date;
    "max_delivery_date": Date;
    "time"?:number
}

export interface IRateResponse {
    "rates": IRate[];
}

export interface IDAPIResponse {
    "origin": number;
    "method": number;
    "cost": number;
    "quantity": number;
    "time": number;
}

export interface IItem {
    cost: string;
    country_code_of_origin: string;
    country_harmonized_system_codes?: (CountryHarmonizedSystemCodesEntity)[] | null;
    created_at: string;
    harmonized_system_code: number;
    id: number;
    province_code_of_origin: string;
    sku: string;
    tracked: boolean;
    updated_at: string;
    requires_shipping: boolean;
  }
  export interface CountryHarmonizedSystemCodesEntity {
    harmonized_system_code: string;
    country_code: string;
  }

  export interface IDAPIManagedResponse {
      managed: boolean,
      DIIN: number
  }

  export interface IInventoryUpdateMessage {
    source: string
    destination: string,
    quantity: number,
    sku: number
  }