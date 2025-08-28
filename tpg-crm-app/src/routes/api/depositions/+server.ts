import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { depositions } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

// GET /api/depositions - Read all depositions
export async function GET() {
  const activeDepositions = await db.select().from(depositions).where(eq(depositions.isArchived, false)).all();
  return json(activeDepositions);
}

// POST /api/depositions - Create a new deposition
export async function POST({ request }) {
  const newDepositionData = await request.json();
  const result = await db.insert(depositions).values(newDepositionData).returning().get();
  return json(result, { status: 201 });
}