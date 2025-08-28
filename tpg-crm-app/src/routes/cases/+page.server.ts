import { db } from '$lib/server/db';
import { cases } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export async function load() {
  const activeCases = await db.select().from(cases).where(eq(cases.isArchived, false)).all();
  return {
    cases: activeCases,
  };
}