import { authOptions } from "@/lib/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return NextAuth(req, res, authOptions);
}
