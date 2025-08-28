import { json, error } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { depositions } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

// GET /api/depositions/[id] - Read deposition by ID
export async function GET({ params }) {
  const depositionId = params.id;
  const deposition = await db.select().from(depositions).where(eq(depositions.depositionId, depositionId)).get();

  if (deposition && deposition.isArchived) {
    throw error(404, 'Deposition not found or is archived');
  }

  if (deposition) {
    return json(deposition);
  } else {
    throw error(404, 'Deposition not found');
  }
}

// PUT /api/depositions/[id] - Update deposition by ID
export async function PUT({ params, request }) {
  const depositionId = params.id;
  const updatedDepositionData = await request.json();
  const result = await db.update(depositions).set(updatedDepositionData).where(eq(depositions.depositionId, depositionId)).returning().get();

  if (result) {
    return json(result);
  } else {
    throw error(404, 'Deposition not found');
  }
}

// DELETE /api/depositions/[id] - Archive deposition by ID
export async function DELETE({ params }) {
  const depositionId = params.id;
  const result = await db.update(depositions).set({ isArchived: true }).where(eq(depositions.depositionId, depositionId)).returning().get();

  if (result) {
    return json({ message: 'Deposition archived successfully' });
  } else {
    throw error(404, 'Deposition not found');
  }
}