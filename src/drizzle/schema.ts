import { pgTable,serial, text, varchar, uuid, index, boolean, real, timestamp, primaryKey, integer, pgEnum } from 'drizzle-orm/pg-core';
import { or, relations } from 'drizzle-orm';


// Enums
export const OrderStatusEnum = pgEnum("orderStatus", ["PENDING", "DELIVERED", "CANCELLED"]); 
//


// Tables

//1city
export const CityTable = pgTable("city", {
  city_id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  state_id: serial("state_id").notNull().references (() => StateTable.state_id, ),  // Relationship field
  address : text("address").notNull(),
  state : varchar("state").notNull(),
  restaurant: text("restaurant").notNull(),
});

// City Relation
// City to State: Many-to-One
// City to Restaurant: One-to-Many
// City to Address: One-to-Many
export const CityRelations = relations(CityTable, ({ one, many }) => ({
  state: one(StateTable, {
    fields: [CityTable.state_id],
    references: [StateTable.state_id]
  }),
  restaurants: many(RestaurantTable),
  addresses: many(AddressTable)
}));


//2state
export const StateTable = pgTable("state", {
  state_id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  code: varchar("code", { length: 10 }).notNull(),
  city : text("city").notNull(),

  
});

// State Relations
// State to City: One-to-Many
export const StateRelations = relations(StateTable, ({ many }) => ({
  cities: many(CityTable)
}));


//3restorant_owner
export const RestaurantOwnerTable = pgTable("restaurant_owner", {
  restaurant_owner_id: serial("id").primaryKey(),
  restaurant_id: serial("restaurant_id").notNull() .references(() => RestaurantTable.restaurant_id) , // Relationship field
  owner_id: serial("owner_id").notNull() .references(() => UsersTable.user_id)  , // Relationship field
  users : text("users").notNull(),
  restorant : text("restorant").notNull(),
  
  
});

// RestaurantOwner Relations
// RestaurantOwner to User: Many-to-One
// RestaurantOwner to Restaurant: Many-to-One
export const RestaurantOwnerRelations = relations(RestaurantOwnerTable, ({ one }) => ({
  user: one(UsersTable, {
    fields: [RestaurantOwnerTable.owner_id],
    references: [UsersTable.user_id]
  }),
  restaurant: one(RestaurantTable, {
    fields: [RestaurantOwnerTable.restaurant_id],
    references: [RestaurantTable.restaurant_id]
  })
}));


//4users
export const UsersTable = pgTable("users", {
  user_id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  contact_phone: varchar("contact_phone", { length: 20 }).notNull(),
  phone_verified: boolean("phone_verified").notNull().default(false),
  email: varchar("email", { length: 255 }).notNull().unique(),
  email_verified: boolean("email_verified").notNull().default(false),
  confirmation_code: varchar("confirmation_code", { length: 255 }).notNull(),
  password: text("password").notNull(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
  address : text("address").notNull(),
  comment : text("comment").notNull(),
  driver : text("driver").notNull(),
  orders : text("orders").notNull(),
  restorant_owner : text("restorant_owner").notNull(),

  
});

// User Relations
// User to Address: One-to-Many
// User to Comment: One-to-Many
// User to Driver: One-to-Many
// User to Order: One-to-Many
// User to RestaurantOwner: One-to-Many
export const UserRelations = relations(UsersTable, ({ many }) => ({
  addresses: many(AddressTable),
  comments: many(CommentTable),
  drivers: many(DriverTable),
  orders: many(OrdersTable),
  restaurantOwners: many(RestaurantOwnerTable)
}));


//5comment
export const CommentTable = pgTable("comment", {
  comment_id: serial("id").primaryKey(),
  order_id: serial("order_id").notNull() .references(() => OrdersTable.order_id),  // Relationship field
  user_id: serial("user_id").notNull() .references(() => UsersTable.user_id),  // Relationship field
  comment_text: text("comment_text").notNull(),
  is_complaint: boolean("is_complaint").notNull().default(false),
  is_praise: boolean("is_praise").notNull().default(false),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
  orders: text("orders").notNull(),
  users: text("users").notNull(),

  
});

// Comment Relations
// Comment to Order: Many-to-One
// Comment to User: Many-to-One
export const ComentRelations = relations(CommentTable, ({ one }) => ({
  order: one(OrdersTable, {
    fields: [CommentTable.order_id],
    references: [OrdersTable.order_id]
  }),
  user: one(UsersTable, {
    fields: [CommentTable.user_id],
    references: [UsersTable.user_id]
  })
}));


//6driver
export const DriverTable = pgTable("driver", {
  driver_id: serial("id").primaryKey(),
  car_make: varchar("car_make", { length: 255 }).notNull(),
  car_model: varchar("car_model", { length: 255 }).notNull(),
  car_year: integer("car_year").notNull(),
  user_id: serial("user_id").notNull() .references(() => UsersTable.user_id),  // Relationship field
  online: boolean("online").notNull().default(false),
  delivering: boolean("delivering").notNull().default(false),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
  users: text("users").notNull(),
  orders : text("orders").notNull(),

  
});

// Driver Relations
// Driver to User: Many-to-One
export const DriverRelations = relations(DriverTable, ({ one }) => ({
  user: one(UsersTable, {
    fields: [DriverTable.user_id],
    references: [UsersTable.user_id]
  })
}));


//7address
export const AddressTable = pgTable("address", {
  address_id: serial("id").primaryKey(),
  street_address_1: varchar("street_address_1", { length: 255 }).notNull(),
  street_address_2: varchar("street_address_2", { length: 255 }),
  zip_code: varchar("zip_code", { length: 10 }).notNull(),
  delivery_instructions: text("delivery_instructions"),
  user_id: integer("user_id").notNull().references(() => UsersTable.user_id),  // Relationship field
  city_id: integer("city_id").notNull() .references(() => CityTable.city_id) ,  // Relationship field
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
  city : text("city").notNull(),
  users : text("users").notNull(),
  ordes : text("orders").notNull(),


  
});

// Address Relations
// Address to User: Many-to-One
// Address to City: Many-to-One
export const AddressRelations = relations(AddressTable, ({ one
}) => ({
  user: one(UsersTable, {
    fields: [AddressTable.user_id],
    references: [UsersTable.user_id]
  }),
  city: one(CityTable, {
    fields: [AddressTable.city_id],
    references: [CityTable.city_id]
  })
}));

//8restorant
export const RestaurantTable = pgTable("restaurant", {
  restaurant_id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  street_address: varchar("street_address", { length: 255 }).notNull(),
  zip_code: varchar("zip_code", { length: 10 }).notNull(),
  city_id: serial("city_id").notNull() .references(() => CityTable.city_id),  // Relationship field
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
  menu_items: text("menu_items").notNull(),
  orders: text("orders").notNull(),
  city: text("city").notNull(),
  restaurant_owner: text("restorant_owner").notNull(),

});

// Restaurant Relations
// Restaurant to City: Many-to-One
// Restaurant to MenuItem: One-to-Many
// Restaurant to Order: One-to-Many
// Restaurant to RestaurantOwner: One-to-Many
export const RestaurantRelations = relations(RestaurantTable, ({ one, many }) => ({
  city: one(CityTable, {
    fields: [RestaurantTable.city_id],
    references: [CityTable.city_id]
  }),
  menuItems: many(MenuItemTable),
  orders: many(OrdersTable),
  restaurantOwners: many(RestaurantOwnerTable)
}));


//9menu_item
export const MenuItemTable = pgTable("menu_item", {
  menu_item_id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  restaurant_id: serial("restaurant_id").notNull() .references (() => RestaurantTable.restaurant_id, ),  // Relationship field
  category_id: serial("category_id").notNull().references (() => CategoryTable.category_id, ),  // Relationship field
  description: text("description").notNull(),
  ingredients: text("ingredients").notNull(),
  price: real("price").notNull(),
  active: boolean("active").notNull().default(true),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
  restorant : text("restorant").notNull(),
  category : text("category").notNull(),
  restaurant: text("restorant").notNull(),
  order_menu_items: text("order_menu_items").notNull(),

  
});

// MenuItem Relations
// MenuItem to Restaurant: Many-to-One
// MenuItem to Category: Many-to-One
// MenuItem to OrderMenuItem: One-to-Many
export const MenuItemRelations = relations(MenuItemTable, ({ one, many }) => ({
  restaurant: one(RestaurantTable, {
    fields: [MenuItemTable.restaurant_id],
    references: [RestaurantTable.restaurant_id]
  }),
  category: one(CategoryTable, {
    fields: [MenuItemTable.category_id],
    references: [CategoryTable.category_id]
  }),
  orderMenuItems: many(OrderMenuItemTable)
}));

//10category
export const CategoryTable = pgTable("category", {
  category_id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  menu_items: text("menu_items").notNull(),

});

// Category Relations
// Category to MenuItem: One-to-Many
export const CategoryRelations = relations(CategoryTable, ({ many }) => ({
  menuItems: many(MenuItemTable)
}));


//11order_menu_item
export const OrderMenuItemTable = pgTable("order_menu_item", {
  order_menu_item_id: serial("id").primaryKey(),
  order_id: serial("order_id").notNull() .references (() => OrdersTable.order_id, ),  // Relationship field
  menu_item_id: serial("menu_item_id").notNull() .references (() => MenuItemTable.menu_item_id, ),  // Relationship field
  quantity: integer("quantity").notNull(),
  item_price: real("item_price").notNull(),
  price: real("price").notNull(),
  comment: text("comment"),
  menu_item: text("menu_item").notNull(),
  orders: text("orders").notNull(),


});

// OrderMenuItem Relations
// OrderMenuItem to Order: Many-to-One
// OrderMenuItem to MenuItem: Many-to-One
export const OrderMenuItemRelations = relations(OrderMenuItemTable, ({ one }) => ({
  order: one(OrdersTable, {
    fields: [OrderMenuItemTable.order_id],
    references: [OrdersTable.order_id]
  }),
  menuItem: one(MenuItemTable, {
    fields: [OrderMenuItemTable.menu_item_id],
    references: [MenuItemTable.menu_item_id]
  })
}));


//12order
export const OrdersTable = pgTable("orders", {
  order_id: serial("id").primaryKey(),
  restaurant_id: serial("restaurant_id").notNull() .references (() => RestaurantTable.restaurant_id, ),  // Relationship field
  estimated_delivery_time: timestamp("estimated_delivery_time").notNull(),
  actual_delivery_time: timestamp("actual_delivery_time"),
  delivery_address_id: serial("delivery_address_id").notNull() .references (() => AddressTable.address_id, ),  // Relationship field
  user_id: serial("user_id").notNull()  .references (() => UsersTable.user_id, ),  // Relationship field
  driver_id: serial("driver_id").notNull() .references (() => DriverTable.driver_id, ),  // Relationship field
  price: real("price").notNull(),
  discount: real("discount").default(0),
  final_price: real("final_price").notNull(),
  comment: text("comment"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
  coments: text("coments").notNull(),
  order_menu_items: text("order_menu_items").notNull(),
  ordder_status: text("order_status").notNull(),
  address: text("address").notNull(),
  driver: text("driver").notNull(),
  restaurant: text("restorant").notNull(),
  users: text("users").notNull(),

  
});

// Orders Relations
// Order to Restaurant: Many-to-One
// Order to DeliveryAddress: Many-to-One
// Order to User: Many-to-One
// Order to Driver: Many-to-One
// Order to Comment: One-to-Many
// Order to OrderMenuItem: One-to-Many
// Order to OrderStatus: One-to-Many
export const OrderRelations = relations(OrdersTable, ({ one, many }) => ({
  restaurant: one(RestaurantTable, {
    fields: [OrdersTable.restaurant_id],
    references: [RestaurantTable.restaurant_id]
  }),
  deliveryAddress: one(AddressTable, {
    fields: [OrdersTable.delivery_address_id],
    references: [AddressTable.address_id]
  }),
  user: one(UsersTable, {
    fields: [OrdersTable.user_id],
    references: [UsersTable.user_id]
  }),
  driver: one(DriverTable, {
    fields: [OrdersTable.driver_id],
    references: [DriverTable.driver_id]
  }),
  comments: many(CommentTable),
  orderMenuItems: many(OrderMenuItemTable),
  orderStatus: many(OrderStatusTable)
}));

//13order_status
export const OrderStatusTable = pgTable("order_status", {
  order_status_id: serial("id").primaryKey(),
  order_id: serial("order_id").notNull()  .references (() => OrdersTable.order_id, ),  // Relationship field
  status_catelog_id: serial("status_catelog_id").notNull() .references (() => StatusCatalogTable.status_catalog_id, ),  // Relationship field
  created_at: timestamp("created_at").defaultNow(),
  orders: text("orders").notNull(),
  status_catalog: text("status_catalog").notNull(),

});

// OrderStatus Relations
// OrderStatus to Order: Many-to-One
// OrderStatus to StatusCatalog: Many-to-One

export const OrderStatusRelations = relations(OrderStatusTable, ({ one }) => ({
  order: one(OrdersTable, {
    fields: [OrderStatusTable.order_id],
    references: [OrdersTable.order_id]
  }),
  statusCatalog: one(StatusCatalogTable, {
    fields: [OrderStatusTable.status_catelog_id],
    references: [StatusCatalogTable.status_catalog_id]
  })
}));


//14status_catalog
export const StatusCatalogTable = pgTable("status_catalog", {
  status_catalog_id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  order_status: text("order_status").notNull(),


});

// StatusCatalog Relations
// statusCatalog to OrderStatus: One-to-Many
export const StatusCatalogRelations = relations(StatusCatalogTable, ({ many }) => ({
  orderStatus: many(OrderStatusTable)
}));

export type TSState = typeof StateTable.$inferInsert;
export type TIState = typeof StateTable.$inferSelect;

export type TSUsers = typeof UsersTable.$inferInsert;
export type TIUsers = typeof UsersTable.$inferSelect;

export type TSCity = typeof CityTable.$inferInsert;
export type TICity = typeof CityTable.$inferSelect;

export type TSRestaurantOwner = typeof RestaurantOwnerTable.$inferInsert;
export type TIRestaurantOwner = typeof RestaurantOwnerTable.$inferSelect;

export type TSComment = typeof CommentTable.$inferInsert;
export type TIComment = typeof CommentTable.$inferSelect;

export type TSDriver = typeof DriverTable.$inferInsert;
export type TIDriver = typeof DriverTable.$inferSelect;

export type TSAddress = typeof AddressTable.$inferInsert;
export type TIAddress = typeof AddressTable.$inferSelect;

export type TSRestaurant = typeof RestaurantTable.$inferInsert;
export type TIRestaurant = typeof RestaurantTable.$inferSelect;

export type TSMenuItem = typeof MenuItemTable.$inferInsert;
export type TIMenuItem = typeof MenuItemTable.$inferSelect;

export type TSCategory = typeof CategoryTable.$inferInsert;
export type TICategory = typeof CategoryTable.$inferSelect;

export type TSOrderMenuItem = typeof OrderMenuItemTable.$inferInsert;
export type TIOrderMenuItem = typeof OrderMenuItemTable.$inferSelect;

export type TSOrders = typeof OrdersTable.$inferInsert;
export type TIOrders = typeof OrdersTable.$inferSelect;

export type TSOrderStatus = typeof OrderStatusTable.$inferInsert;
export type TIOrderStatus = typeof OrderStatusTable.$inferSelect;

export type TSStatusCatalog = typeof StatusCatalogTable.$inferInsert;
export type TIStatusCatalog = typeof StatusCatalogTable.$inferSelect;





