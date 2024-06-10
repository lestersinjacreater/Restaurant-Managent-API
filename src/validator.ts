import { z } from "zod";



// Tables Validators

// City Validator
export const CityValidator = z.object({
  city_id: z.number().int().optional(),
  name: z.string().max(255),
  state_id: z.number().int(),
  address: z.string(),
  state: z.string(),
  restaurant: z.string()
});

// State Validator
export const StateValidator = z.object({
  state_id: z.number().int().optional(),
  name: z.string().max(255),
  code: z.string().max(10),
  city: z.string()
});

// Restaurant Owner Validator
export const RestaurantOwnerValidator = z.object({
  restaurant_owner_id: z.number().int().optional(),
  restaurant_id: z.number().int(),
  owner_id: z.number().int(),
  users: z.string(),
  restorant: z.string()
});

// Users Validator


export const UsersValidator = z.object({
  user_id: z.number().int().optional(),
  name: z.string().max(255),
  contact_phone: z.string().max(20),
  phone_verified: z.boolean().default(false),
  email: z.string().email().max(255),
  email_verified: z.boolean().default(false),
  confirmation_code: z.string().max(255),
  password: z.string(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  address: z.string(),
  comment: z.string(),
  driver: z.string(),
  orders: z.string(),
  restorant_owner: z.string()
});

// Comment Validator
export const CommentValidator = z.object({
  comment_id: z.number().int().optional(),
  order_id: z.number().int(),
  user_id: z.number().int(),
  comment_text: z.string(),
  is_complaint: z.boolean().default(false),
  is_praise: z.boolean().default(false),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  orders: z.string(),
  users: z.string()
});

// Driver Validator
export const DriverValidator = z.object({
  driver_id: z.number().int().optional(),
  car_make: z.string().max(255),
  car_model: z.string().max(255),
  car_year: z.number().int(),
  user_id: z.number().int(),
  online: z.boolean().default(false),
  delivering: z.boolean().default(false),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  users: z.string(),
  orders: z.string()
});

// Address Validator
export const AddressValidator = z.object({
  address_id: z.number().int().optional(),
  street_address_1: z.string().max(255),
  street_address_2: z.string().max(255).optional(),
  zip_code: z.string().max(10),
  delivery_instructions: z.string().optional(),
  user_id: z.number().int(),
  city_id: z.number().int(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  city: z.string(),
  users: z.string(),
  orders: z.string()
});

// Restaurant Validator
export const RestaurantValidator = z.object({
  restaurant_id: z.number().int().optional(),
  name: z.string().max(255),
  street_address: z.string().max(255),
  zip_code: z.string().max(10),
  city_id: z.number().int(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  menu_items: z.string(),
  orders: z.string(),
  city: z.string(),
  restaurant_owner: z.string()
});

// MenuItem Validator
export const MenuItemValidator = z.object({
  menu_item_id: z.number().int().optional(),
  name: z.string().max(255),
  restaurant_id: z.number().int(),
  category_id: z.number().int(),
  description: z.string(),
  ingredients: z.string(),
  price: z.number(),
  active: z.boolean().default(true),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  restaurant: z.string(),
  category: z.string(),
  order_menu_items: z.string()
});

// Category Validator
export const CategoryValidator = z.object({
  category_id: z.number().int().optional(),
  name: z.string().max(255),
  menu_items: z.string()
});

// OrderMenuItem Validator
export const OrderMenuItemValidator = z.object({
  order_menu_item_id: z.number().int().optional(),
  order_id: z.number().int(),
  menu_item_id: z.number().int(),
  quantity: z.number().int(),
  item_price: z.number(),
  price: z.number(),
  comment: z.string().optional(),
  menu_item: z.string(),
  orders: z.string()
});

// Orders Validator
export const OrdersValidator = z.object({
  order_id: z.number().int().optional(),
  restaurant_id: z.number().int(),
  estimated_delivery_time: z.string(),
  actual_delivery_time: z.string().optional(),
  delivery_address_id: z.number().int(),
  user_id: z.number().int(),
  driver_id: z.number().int(),
  price: z.number(),
  discount: z.number().optional().default(0),
  final_price: z.number(),
  comment: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  comments: z.string(),
  order_menu_items: z.string(),
  order_status: z.string(),
  address: z.string(),
  driver: z.string(),
  restaurant: z.string(),
  users: z.string()
});

// OrderStatus Validator
export const OrderStatusValidator = z.object({
  order_status_id: z.number().int().optional(),
  order_id: z.number().int(),
  status_catalog_id: z.number().int(),
  created_at: z.string().optional(),
  orders: z.string(),
  status_catalog: z.string()
});

// StatusCatalog Validator
export const StatusCatalogValidator = z.object({
  status_catalog_id: z.number().int().optional(),
  name: z.string().max(255),
  order_status: z.string()
});
