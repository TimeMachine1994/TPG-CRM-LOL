import { db } from '$lib/server/db';
import { depositions } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export async function load() {
  const activeDepositions = await db.select().from(depositions).where(eq(depositions.isArchived, false)).all();
  return {
    depositions: activeDepositions,
  };
}