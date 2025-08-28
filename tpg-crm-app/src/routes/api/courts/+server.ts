import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { courts } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

// GET /api/courts - Read all courts
export async function GET() {
  const activeCourts = await db.select().from(courts).where(eq(courts.isArchived, false)).all();
  return json(activeCourts);
}

// POST /api/courts - Create a new court
export async function POST({ request }) {
  const newCourtData = await request.json();
  const result = await db.insert(courts).values(newCourtData).returning().get();
  return json(result, { status: 201 });
}