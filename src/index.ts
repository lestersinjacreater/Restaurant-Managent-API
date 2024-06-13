import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import "dotenv/config";
import { logger } from 'hono/logger';
import { csrf } from 'hono/csrf';
import { trimTrailingSlash } from 'hono/trailing-slash';
import { timeout } from 'hono/timeout';
import { HTTPException } from 'hono/http-exception';

// Importing routers from respective modules

import { stateRouter } from './state/state.router';
import { addressRouter } from './address/address.router';
import { categoryRouter } from './category/category.router';
import { cityRouter } from './city/city.router';
import { restaurantOwnerRouter } from './restaurant owner/restaurantowmer.router';
import { commentRouter } from './comment/comment.router';
import { orderStatusRouter } from './orderstatus/orderstatus.router';
import { driverRouter } from './driver/drivers.routers';
import { ordermenuitemRouter } from './order menu item/ordermenuitem.router';
import { ordersRouter } from './orders/orders.router';
import { restaurantRouter } from './restaurant/restaurant.router';
import { statsuscatalogRouter } from './statuscalalog/statuscatalog.router';
import { userRouter } from './users/users.routers';
import { menuitemRouter } from './menu item/menuitem.router';
import { authRouter } from './auth/auth.router';

const app = new Hono(); // Creating a new instance of the Hono application

// Logger middleware
app.use(logger());

// CSRF protection middleware
app.use(csrf());

// Trim trailing slashes middleware
app.use(trimTrailingSlash());

// Timeout middleware with a custom exception
const customTimeException = () =>
  new HTTPException(408, {
    message: "Request timeout after waiting for more than 10 seconds",
  });
app.use("time", timeout(10000, customTimeException));

// Handling GET request to root endpoint '/'
app.get('/', (c) => {
  return c.text('Hello Hono!'); // Responding with 'Hello Hono!' text
});

// Custom routing for API endpoints
app.route('/api', addressRouter); // Routing addressRouter under '/api'
app.route('/api', categoryRouter); // Routing categoryRouter under '/api'
app.route('/api', cityRouter); // Routing cityRouter under '/api'
app.route('/api', commentRouter); // Routing commentRouter under '/api'
app.route('/api', driverRouter); // Routing driverRouter under '/api'
app.route('/api', menuitemRouter); // Routing menuitemRouter under '/api'
app.route('/api', ordermenuitemRouter); // Routing ordermenuitemRouter under '/api'
app.route('/api', ordersRouter); // Routing ordersRouter under '/api'
app.route('/api', orderStatusRouter); // Routing orderStatusRouter under '/api'
app.route('/api', restaurantRouter); // Routing restaurantRouter under '/api'
app.route('/api', restaurantOwnerRouter); // Routing restaurantOwnerRouter under '/api'
app.route('/api', stateRouter); // Routing stateRouter under '/api'
app.route('/api', statsuscatalogRouter); // Routing statusCatalogRouter under '/api'
app.route('/api', userRouter); // Routing userRouter under '/api'

// Authentication routes
app.route('/api/auth', authRouter); // Routing authRouter under '/api/auth'

// Default test route
import { readFileSync } from 'fs';

app.get('/', async (c) => {
  try {
    let html = readFileSync('./index.html', 'utf-8');
    return c.html(html);

  } catch (error: any) {
    return c.json({ error: error.message, status: 500 });

  }
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port
});
