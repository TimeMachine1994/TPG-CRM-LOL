import { sqliteTable, text, integer, real, primaryKey } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  userId: text('user_id').primaryKey(),
  username: text('username').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  fullName: text('full_name'),
  role: text('role'),
  contactInfo: text('contact_info'),
});

export const session = sqliteTable('session', {
  id: text('id').notNull().primaryKey(),
  userId: text('user_id').notNull().references(() => users.userId),
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
});

export const firms = sqliteTable('firms', {
  firmId: text('firm_id').primaryKey(),
  firmName: text('firm_name').notNull(),
  address: text('address'),
  phone: text('phone'),
  website: text('website'),
});

export const attorneys = sqliteTable('attorneys', {
  attorneyId: text('attorney_id').primaryKey(),
  attorneyName: text('attorney_name').notNull(),
  firmId: text('firm_id').references(() => firms.firmId, { onDelete: 'set null' }),
  contactInfo: text('contact_info'),
});

export const caseTypes = sqliteTable('case_types', {
  caseTypeId: text('case_type_id').primaryKey(),
  typeName: text('type_name').notNull().unique(),
  description: text('description'),
});

export const courts = sqliteTable('courts', {
  courtId: text('court_id').primaryKey(),
  courtName: text('court_name').notNull(),
  address: text('address'),
  city: text('city'),
  state: text('state'),
  zipCode: text('zip_code'),
  generalPhone: text('general_phone'),
  techSupportPhone: text('tech_support_phone'),
  courtWebsiteLink: text('court_website_link'),
  techSupportWebsiteLink: text('tech_support_website_link'),
  parkingInfoLink: text('parking_info_link'),
  googleMapsLink: text('google_maps_link'),
  distanceFromOfficeMi: real('distance_from_office_mi'),
  projectorScreen: integer('projector_screen', { mode: 'boolean' }).default(false),
  docCamera: integer('doc_camera', { mode: 'boolean' }).default(false),
  isArchived: integer('is_archived', { mode: 'boolean' }).default(false),
});

export const courtroomTechnology = sqliteTable('courtroom_technology', {
  techId: text('tech_id').primaryKey(),
  techName: text('tech_name').notNull(),
  description: text('description'),
});

export const courtroomTechnologyJunction = sqliteTable('courtroom_technology_junction', {
  courtId: text('court_id').notNull().references(() => courts.courtId, { onDelete: 'cascade' }),
  techId: text('tech_id').notNull().references(() => courtroomTechnology.techId, { onDelete: 'cascade' }),
  quantity: integer('quantity').default(1),
  notes: text('notes'),
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.courtId, table.techId] }),
  };
});

export const cases = sqliteTable('cases', {
  caseId: text('case_id').primaryKey(),
  caseName: text('case_name').notNull(),
  caseTypeId: text('case_type_id').references(() => caseTypes.caseTypeId, { onDelete: 'set null' }),
  startDate: text('start_date'),
  endDate: text('end_date'),
  firmId: text('firm_id').references(() => firms.firmId, { onDelete: 'set null' }),
  courtId: text('court_id').references(() => courts.courtId, { onDelete: 'set null' }),
  techAssignedUserId: text('tech_assigned_user_id').references(() => users.userId, { onDelete: 'set null' }),
  lastUpdateTimestamp: text('last_update_timestamp').default('CURRENT_TIMESTAMP'),
  isArchived: integer('is_archived', { mode: 'boolean' }).default(false),
});

export const caseAttorneysJunction = sqliteTable('case_attorneys_junction', {
  caseId: text('case_id').notNull().references(() => cases.caseId, { onDelete: 'cascade' }),
  attorneyId: text('attorney_id').notNull().references(() => attorneys.attorneyId, { onDelete: 'cascade' }),
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.caseId, table.attorneyId] }),
  };
});

export const archival = sqliteTable('archival', {
  archivalId: text('archival_id').primaryKey(),
  caseId: text('case_id').notNull().unique().references(() => cases.caseId, { onDelete: 'cascade' }),
  dateCaseConcluded: text('date_case_concluded'),
  outcome: text('outcome'),
  concludingAttorneyId: text('concluding_attorney_id').references(() => attorneys.attorneyId, { onDelete: 'set null' }),
});

export const workflowSteps = sqliteTable('workflow_steps', {
  stepId: text('step_id').primaryKey(),
  stepName: text('step_name').notNull().unique(),
  description: text('description'),
  stepOrder: integer('step_order'),
});

export const caseWorkflowStatus = sqliteTable('case_workflow_status', {
  archivalId: text('archival_id').notNull().references(() => archival.archivalId, { onDelete: 'cascade' }),
  stepId: text('step_id').notNull().references(() => workflowSteps.stepId, { onDelete: 'cascade' }),
  isCompleted: integer('is_completed', { mode: 'boolean' }).default(false),
  completionDate: text('completion_date'),
  completedByUserId: text('completed_by_user_id').references(() => users.userId, { onDelete: 'set null' }),
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.archivalId, table.stepId] }),
  };
});

export const trials = sqliteTable('trials', {
  trialId: text('trial_id').primaryKey(),
  caseId: text('case_id').notNull().references(() => cases.caseId, { onDelete: 'cascade' }),
  trialNameDescription: text('trial_name_description'),
  startDate: text('start_date'),
  endDate: text('end_date'),
  courtId: text('court_id').references(() => courts.courtId, { onDelete: 'set null' }),
  judge: text('judge'),
  outcome: text('outcome'),
});

export const equipment = sqliteTable('equipment', {
  equipmentId: text('equipment_id').primaryKey(),
  equipmentName: text('equipment_name').notNull(),
  description: text('description'),
  type: text('type'),
});

export const archivalEquipmentJunction = sqliteTable('archival_equipment_junction', {
  archivalId: text('archival_id').notNull().references(() => archival.archivalId, { onDelete: 'cascade' }),
  equipmentId: text('equipment_id').notNull().references(() => equipment.equipmentId, { onDelete: 'cascade' }),
  quantityUsed: integer('quantity_used'),
  notes: text('notes'),
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.archivalId, table.equipmentId] }),
  };
});

export const clients = sqliteTable('clients', {
  clientId: text('client_id').primaryKey(),
  clientName: text('client_name').notNull(),
  contactPerson: text('contact_person'),
  contactInfo: text('contact_info'),
  firmId: text('firm_id').references(() => firms.firmId, { onDelete: 'set null' }),
});

export const depositions = sqliteTable('depositions', {
  depositionId: text('deposition_id').primaryKey(),
  clientId: text('client_id').references(() => clients.clientId, { onDelete: 'set null' }),
  caseId: text('case_id').references(() => cases.caseId, { onDelete: 'set null' }),
  deponentName: text('deponent_name'),
  depoDate: text('depo_date'),
  editedRuntime: text('edited_runtime'),
  notes: text('notes'),
  isArchived: integer('is_archived', { mode: 'boolean' }).default(false),
});

export const depositionFiles = sqliteTable('deposition_files', {
  fileId: text('file_id').primaryKey(),
  depositionId: text('deposition_id').notNull().references(() => depositions.depositionId, { onDelete: 'cascade' }),
  fileType: text('file_type'),
  fileUrl: text('file_url'),
  notes: text('notes'),
});

export const trialEquipmentJunction = sqliteTable('trial_equipment_junction', {
  trialId: text('trial_id').notNull().references(() => trials.trialId, { onDelete: 'cascade' }),
  equipmentId: text('equipment_id').notNull().references(() => equipment.equipmentId, { onDelete: 'cascade' }),
  quantityUsed: integer('quantity_used'),
  notes: text('notes'),
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.trialId, table.equipmentId] }),
  };
});
