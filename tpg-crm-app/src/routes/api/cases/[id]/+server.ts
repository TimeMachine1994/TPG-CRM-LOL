import { json, error } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { cases } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

// GET /api/cases/[id] - Read case by ID
export async function GET({ params }) {
  const caseId = params.id;
  const caseItem = await db.select().from(cases).where(eq(cases.caseId, caseId)).get();

  if (caseItem && caseItem.isArchived) {
    throw error(404, 'Case not found or is archived');
  }

  if (caseItem) {
    return json(caseItem);
  } else {
    throw error(404, 'Case not found');
  }
}

// PUT /api/cases/[id] - Update case by ID
export async function PUT({ params, request }) {
  const caseId = params.id;
  const updatedCaseData = await request.json();
  const result = await db.update(cases).set(updatedCaseData).where(eq(cases.caseId, caseId)).returning().get();

  if (result) {
    return json(result);
  } else {
    throw error(404, 'Case not found');
  }
}

// DELETE /api/cases/[id] - Archive case by ID
export async function DELETE({ params }) {
  const caseId = params.id;
  const result = await db.update(cases).set({ isArchived: true }).where(eq(cases.caseId, caseId)).returning().get();

  if (result) {
    return json({ message: 'Case archived successfully' });
  } else {
    throw error(404, 'Case not found');
  }
}