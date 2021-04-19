export interface Product {
  permalink: string;
  kind: string;
  product_data: ProductData;
  image: Image;
  description: string;
  receiptCustomText: string;
  reviewCount: number;
  ratingValue: number;
  author: Author;
}

export interface Author {
  name: string;
  url: string;
  thumbnail: string;
}

export interface Image {
  url: string;
  title: string;
}

export interface ProductData {
  external_id: string;
  seller_id: number;
  permalink: string;
  currency: Currency;
  exchange_rate: number;
  long_url: string;
  name: string;
  product_duration_in_months: null;
  is_sales_limited: boolean;
  is_customizable: boolean;
  suggested_price_cents: number;
  is_physical: boolean;
  is_preorder: boolean;
  is_stream_only: boolean;
  is_tiered_membership: boolean;
  is_price_tax_exclusive: boolean;
  is_shipping_info_required: boolean;
  shippable_countries_map: ShippableCountriesMap;
  has_offer_codes: boolean;
  base_price_cents: number;
  base_rental_price_cents: null;
  recurrences: null;
  variant_list: VariantList;
  purchase_type: string;
  quantity_remaining: null;
  quantity_enabled: boolean;
  custom_summary: null;
  file_info_attributes: any[];
  custom_attributes: any[];
  custom_fields: any[];
  preorder_release_date_fmt: null;
  static_checkout_variables: StaticCheckoutVariables;
}

export interface Currency {
  is_single_unit: boolean;
  currency_symbol: string;
  currency_type: string;
  min_price: number;
}

export interface ShippableCountriesMap {}

export interface StaticCheckoutVariables {
  us_states: string[];
  ordered_shipping_countries: string[];
  vat_countries: string[];
}

export interface VariantList {
  kind: string;
  variant_categories: VariantCategory[];
}

export interface VariantCategory {
  id: string;
  name: string;
  options: Option[];
}

export interface Option {
  id: string;
  name: string;
  is_sold_out: boolean;
  quantity_left: null;
  description: string;
  price_difference_cents: number;
  recurrence_values: null;
  is_customizable: boolean;
}
