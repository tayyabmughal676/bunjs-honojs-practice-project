import { Hono } from "hono";
import {logger} from "hono/logger"
import {cors} from "hono/cors"
import { serveStatic } from 'hono/serve-static.bun';
import { SHA256 } from "crypto-js";

const port = parseInt(process.env.PORT) || 3000;

const app = new Hono();

app.use('/favicon.ico', serveStatic({ path: './public/favicon.ico' }));
app.use("*", logger(), cors())

app.get("/", (c) => {
  return c.json({ message: "Hello World!" });
});

app.get("/info", (c) => {
  return c.json({message: "Bun.sh is shinning"})
});

app.post("/post", (c) => {return c.json({message:"post"})});
app.put("/put", (c) => {return c.json({message:"put"})});
app.delete("/delete", (c) => {return c.json({message:"delete"})});


app.get("/user/:name", async (c)=> {

  var name = c.req.param('name');
  var hash = SHA256(name).toString();
  console.log(`hash: ${hash}`)

  var msg = `user name is: ${name} -> ${hash}`;
  return c.json({message:msg});

});


console.log(`Running at http://localhost:${port}`);

export default {
  port,
  fetch: app.fetch
};
