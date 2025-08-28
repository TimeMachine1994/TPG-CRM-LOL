import { db } from '$lib/server/db';
import { cases, courts, depositions } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export async function load() {
  const archivedCases = await db.select().from(cases).where(eq(cases.isArchived, true)).all();
  const archivedCourts = await db.select().from(courts).where(eq(courts.isArchived, true)).all();
  const archivedDepositions = await db.select().from(depositions).where(eq(depositions.isArchived, true)).all();

  return {
    archivedCases,
    archivedCourts,
    archivedDepositions,
  };
}