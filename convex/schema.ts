import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const rmMaxTable = defineTable({
  id: v.id("rmMax"),
  value: v.float64(),
  date: v.string(),
  userId: v.id("users"),
  exercise: v.string(),
});

const usersTable = defineTable({
  id: v.id("users"),
  name: v.string(),
  email: v.string(),
  password: v.string(),
  number: v.number(),
  type: v.union(v.literal("admin"), v.literal("user")),
});

export default defineSchema({
  rmMax: rmMaxTable,
  users: usersTable,
});
