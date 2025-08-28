import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { cases } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

// GET /api/cases - Read all cases
export async function GET() {
  const activeCases = await db.select().from(cases).where(eq(cases.isArchived, false)).all();
  return json(activeCases);
}

// POST /api/cases - Create a new case
export async function POST({ request }) {
  const newCaseData = await request.json();
  const result = await db.insert(cases).values(newCaseData).returning().get();
  return json(result, { status: 201 });
}