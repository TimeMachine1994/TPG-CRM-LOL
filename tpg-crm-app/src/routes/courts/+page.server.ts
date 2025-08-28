import { db } from '$lib/server/db';
import { courts } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export async function load() {
  const activeCourts = await db.select().from(courts).where(eq(courts.isArchived, false)).all();
  return {
    courts: activeCourts,
  };
}