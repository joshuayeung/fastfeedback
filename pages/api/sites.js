import db from "@/lib/db";
import { getAllSites } from "@/lib/db-admin";

async function handler(_, res) {
  const sites = await getAllSites();

  res.status(200).json(sites);
}

export default handler;
