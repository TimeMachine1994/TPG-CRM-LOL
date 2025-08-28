import { json, error } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { courts } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

// GET /api/courts/[id] - Read court by ID
export async function GET({ params }) {
  const courtId = params.id;
  const court = await db.select().from(courts).where(eq(courts.courtId, courtId)).get();

  if (court && court.isArchived) {
    throw error(404, 'Court not found or is archived');
  }

  if (court) {
    return json(court);
  } else {
    throw error(404, 'Court not found');
  }
}

// PUT /api/courts/[id] - Update court by ID
export async function PUT({ params, request }) {
  const courtId = params.id;
  const updatedCourtData = await request.json();
  const result = await db.update(courts).set(updatedCourtData).where(eq(courts.courtId, courtId)).returning().get();

  if (result) {
    return json(result);
  } else {
    throw error(404, 'Court not found');
  }
}

// DELETE /api/courts/[id] - Archive court by ID
export async function DELETE({ params }) {
  const courtId = params.id;
  const result = await db.update(courts).set({ isArchived: true }).where(eq(courts.courtId, courtId)).returning().get();

  if (result) {
    return json({ message: 'Court archived successfully' });
  } else {
    throw error(404, 'Court not found');
  }
}