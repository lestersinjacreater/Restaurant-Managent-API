import { optional, z } from "zod";



// Tables Validators

// City Validator
export const CityValidator = z.object({
  name: z.string().max(255).optional(),
  state_id: z.number().optional(),

  
});



// State Validator
export const StateValidator = z.object({
  name: z.string().max(255).optional(),
  code: z.string().max(10).optional(),
});

// Restaurant Owner Validator
export const RestaurantOwnerValidator = z.object({
  restaurant_id: z.number().int().optional(),
  owner_id: z.number().int().optional(),
 
});

// Users Validator


export const UsersValidator = z.object({
  name: z.string().max(255).optional(),
  contact_phone: z.string().max(20).optional(),
  phone_verified: z.boolean().optional(),
  email: z.string().email().max(255).optional(),
  email_verified: z.boolean().optional(),
  confirmation_code: z.string().max(255).optional(),

});



// Comment Validator
export const CommentValidator = z.object({
  order_id: z.number().int().optional(),
  user_id: z.number().int().optional(),
  comment_text: z.string().optional(),
  is_complaint: z.boolean().default(false).optional(),
  is_praise: z.boolean().default(false).optional(),
  created_at: z.string().optional().optional(),
  updated_at: z.string().optional().optional(),
 
});

// Driver Validator
export const DriverValidator = z.object({
  car_make: z.string().max(255).optional(),
  car_model: z.string().max(255).optional(),
  car_year: z.number().int().optional(),
  user_id: z.number().int().optional(),
  online: z.boolean().default(false).optional(),
  delivering: z.boolean().default(false).optional(),
  created_at: z.string().optional().optional(),
  updated_at: z.string().optional().optional(),
  
});

// Address Validator
export const AddressValidator = z.object({
  street_address_1: z.string().max(255).optional(),
  street_address_2: z.string().max(255).optional(),
  zip_code: z.string().max(10).optional(),
  delivery_instructions: z.string().optional().optional(),
  user_id: z.number().int().optional(),
  city_id: z.number().int().optional(),
  created_at: z.string().optional().optional(),
  updated_at: z.string().optional().optional(),
 
});

// Restaurant Validator
export const RestaurantValidator = z.object({
  name: z.string().max(255).optional(),
  street_address: z.string().max(255).optional(),
  zip_code: z.string().max(10).optional(),
  city_id: z.number().int().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  
});

// MenuItem Validator
export const MenuItemValidator = z.object({
  name: z.string().max(255).optional(),
  restaurant_id: z.number().int().optional(),
  category_id: z.number().int().optional(),
  description: z.string().optional(),
  ingredients: z.string().optional(),
  price: z.number().optional(),
  active: z.boolean().default(true).optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
 
});

// Category Validator
export const CategoryValidator = z.object({
  name: z.string().max(255).optional(),
  
});

// OrderMenuItem Validator
export const OrderMenuItemValidator = z.object({
  order_id: z.number().int().optional(),
  menu_item_id: z.number().int().optional(),
  quantity: z.number().int().optional(),
  item_price: z.number().optional(),
  price: z.number().optional(),
  comment: z.string().optional(),
  
});

// Orders Validator
export const OrdersValidator = z.object({
  restaurant_id: z.number().optional(),
  estimated_delivery_time: z.string().optional(),
  actual_delivery_time: z.string().optional(),
  delivery_address_id: z.number().int().optional(),
  user_id: z.number().int().optional(),
  driver_id: z.number().int().optional(),
  price: z.number().optional(),
  discount: z.number().optional().default(0),
  final_price: z.number().optional(),
  comment: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional()
});

// OrderStatus Validator
export const OrderStatusValidator = z.object({
  order_id: z.number().int().optional(),
  status_catalog_id: z.number().int().optional(),
  created_at: z.string().optional().optional(),
  
});

// StatusCatalog Validator
export const StatusCatalogValidator = z.object({
  name: z.string().max(255).optional(),
 
});

export const registerUserValidator = z.object({
  userId: z.number().optional(),
  username: z.string().optional(),
  password: z.string().optional(),
  role: z.string().optional(),
})

export const loginUservalidator= z.object({
  username: z.string().optional(),
  password: z.string().optional()
})


