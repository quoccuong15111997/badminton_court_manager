import { NextApiRequest } from "next";

declare module "next" {
  interface NextApiRequest {
    userId?: int; // hoặc kiểu dữ liệu phù hợp với userId
  }
}
