const Router = require('koa-router');
const router = new Router();
const uuidv4 = require('uuid/v4');
import { Context } from "koa";

router.get('/categories', async (ctx:Context, next:Function) => {
  console.info("GET /categories");
  let results = await ctx.db.collection('categories').find().toArray();
  ctx.body = '{"results":'+JSON.stringify(results)+'}';
});
router.post('/categories',  async (ctx:Context, next:Function) => {
  console.warn("PUT /categories: " + JSON.stringify(ctx.request.body));
  let json = ctx.request.body;
  const result = await ctx.db.collection('categories').insertOne({ _id: uuidv4(), name: json.name });
});
router.get("/categories/:id", async(ctx:Context, next:Function) => {
  console.info("GET /categories/"+ctx.params.id);
  let results = await ctx.db.collection('categories').find({"_id": ctx.params.id}).toArray();
  console.info("results: " + results);
  ctx.body = JSON.stringify(results[0]);  
})
router.delete("/categories/:id", async(ctx:Context, next:Function) => {
  console.info("GET /categories/"+ctx.params.id);
  ctx.db.collection('categories').remove({ _id: ctx.params.id })
})
router.put("/categories/:id", async(ctx:Context, next:Function) => {
  let json = { $set: ctx.request.body };
  ctx.db.collection('categories').updateOne({ _id: ctx.params.id },json);
})

router.post('/categories/:id/entries',  async (ctx:Context, next:Function) => {
  console.warn("POST /categories/" +ctx.params.id+"/entries: " + JSON.stringify(ctx.request.body));
  let json = ctx.request.body;
  const result = await ctx.db.collection('entries').insertOne({ _id: uuidv4(), categoryId: ctx.params.id, name: json.name });
  ctx.body = result;
});
router.get("/categories/:id/entries", async(ctx:Context, next:Function) => {
  console.info("GET /categories/"+ctx.params.id+"/entries");
  let results = await ctx.db.collection('entries').find({"categoryId": ctx.params.id}).toArray();
  console.info("results: " + results);
  ctx.body = JSON.stringify(results);  
})

module.exports = router;