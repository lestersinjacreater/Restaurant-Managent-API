import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import{stateRouter} from './state/state.router';

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

//custom router
app.route('/api', stateRouter);

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
