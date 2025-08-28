CREATE TABLE `archival` (
	`archival_id` text PRIMARY KEY NOT NULL,
	`case_id` text NOT NULL,
	`date_case_concluded` text,
	`outcome` text,
	`concluding_attorney_id` text,
	FOREIGN KEY (`case_id`) REFERENCES `cases`(`case_id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`concluding_attorney_id`) REFERENCES `attorneys`(`attorney_id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE UNIQUE INDEX `archival_case_id_unique` ON `archival` (`case_id`);--> statement-breakpoint
CREATE TABLE `archival_equipment_junction` (
	`archival_id` text NOT NULL,
	`equipment_id` text NOT NULL,
	`quantity_used` integer,
	`notes` text,
	PRIMARY KEY(`archival_id`, `equipment_id`),
	FOREIGN KEY (`archival_id`) REFERENCES `archival`(`archival_id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`equipment_id`) REFERENCES `equipment`(`equipment_id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `attorneys` (
	`attorney_id` text PRIMARY KEY NOT NULL,
	`attorney_name` text NOT NULL,
	`firm_id` text,
	`contact_info` text,
	FOREIGN KEY (`firm_id`) REFERENCES `firms`(`firm_id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `case_attorneys_junction` (
	`case_id` text NOT NULL,
	`attorney_id` text NOT NULL,
	PRIMARY KEY(`case_id`, `attorney_id`),
	FOREIGN KEY (`case_id`) REFERENCES `cases`(`case_id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`attorney_id`) REFERENCES `attorneys`(`attorney_id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `case_types` (
	`case_type_id` text PRIMARY KEY NOT NULL,
	`type_name` text NOT NULL,
	`description` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `case_types_type_name_unique` ON `case_types` (`type_name`);--> statement-breakpoint
CREATE TABLE `case_workflow_status` (
	`archival_id` text NOT NULL,
	`step_id` text NOT NULL,
	`is_completed` integer DEFAULT false,
	`completion_date` text,
	`completed_by_user_id` text,
	PRIMARY KEY(`archival_id`, `step_id`),
	FOREIGN KEY (`archival_id`) REFERENCES `archival`(`archival_id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`step_id`) REFERENCES `workflow_steps`(`step_id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`completed_by_user_id`) REFERENCES `users`(`user_id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `cases` (
	`case_id` text PRIMARY KEY NOT NULL,
	`case_name` text NOT NULL,
	`case_type_id` text,
	`start_date` text,
	`end_date` text,
	`firm_id` text,
	`court_id` text,
	`tech_assigned_user_id` text,
	`last_update_timestamp` text DEFAULT 'CURRENT_TIMESTAMP',
	FOREIGN KEY (`case_type_id`) REFERENCES `case_types`(`case_type_id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`firm_id`) REFERENCES `firms`(`firm_id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`court_id`) REFERENCES `courts`(`court_id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`tech_assigned_user_id`) REFERENCES `users`(`user_id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `clients` (
	`client_id` text PRIMARY KEY NOT NULL,
	`client_name` text NOT NULL,
	`contact_person` text,
	`contact_info` text,
	`firm_id` text,
	FOREIGN KEY (`firm_id`) REFERENCES `firms`(`firm_id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `courtroom_technology` (
	`tech_id` text PRIMARY KEY NOT NULL,
	`tech_name` text NOT NULL,
	`description` text
);
--> statement-breakpoint
CREATE TABLE `courtroom_technology_junction` (
	`court_id` text NOT NULL,
	`tech_id` text NOT NULL,
	`quantity` integer DEFAULT 1,
	`notes` text,
	PRIMARY KEY(`court_id`, `tech_id`),
	FOREIGN KEY (`court_id`) REFERENCES `courts`(`court_id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`tech_id`) REFERENCES `courtroom_technology`(`tech_id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `courts` (
	`court_id` text PRIMARY KEY NOT NULL,
	`court_name` text NOT NULL,
	`address` text,
	`city` text,
	`state` text,
	`zip_code` text,
	`general_phone` text,
	`tech_support_phone` text,
	`court_website_link` text,
	`tech_support_website_link` text,
	`parking_info_link` text,
	`google_maps_link` text,
	`distance_from_office_mi` real,
	`projector_screen` integer DEFAULT false,
	`doc_camera` integer DEFAULT false
);
--> statement-breakpoint
CREATE TABLE `deposition_files` (
	`file_id` text PRIMARY KEY NOT NULL,
	`deposition_id` text NOT NULL,
	`file_type` text,
	`file_url` text,
	`notes` text,
	FOREIGN KEY (`deposition_id`) REFERENCES `depositions`(`deposition_id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `depositions` (
	`deposition_id` text PRIMARY KEY NOT NULL,
	`client_id` text,
	`case_id` text,
	`deponent_name` text,
	`depo_date` text,
	`edited_runtime` text,
	`notes` text,
	FOREIGN KEY (`client_id`) REFERENCES `clients`(`client_id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`case_id`) REFERENCES `cases`(`case_id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `equipment` (
	`equipment_id` text PRIMARY KEY NOT NULL,
	`equipment_name` text NOT NULL,
	`description` text,
	`type` text
);
--> statement-breakpoint
CREATE TABLE `firms` (
	`firm_id` text PRIMARY KEY NOT NULL,
	`firm_name` text NOT NULL,
	`address` text,
	`phone` text,
	`website` text
);
--> statement-breakpoint
CREATE TABLE `trial_equipment_junction` (
	`trial_id` text NOT NULL,
	`equipment_id` text NOT NULL,
	`quantity_used` integer,
	`notes` text,
	PRIMARY KEY(`trial_id`, `equipment_id`),
	FOREIGN KEY (`trial_id`) REFERENCES `trials`(`trial_id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`equipment_id`) REFERENCES `equipment`(`equipment_id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `trials` (
	`trial_id` text PRIMARY KEY NOT NULL,
	`case_id` text NOT NULL,
	`trial_name_description` text,
	`start_date` text,
	`end_date` text,
	`court_id` text,
	`judge` text,
	`outcome` text,
	FOREIGN KEY (`case_id`) REFERENCES `cases`(`case_id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`court_id`) REFERENCES `courts`(`court_id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `users` (
	`user_id` text PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`full_name` text,
	`role` text,
	`contact_info` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);--> statement-breakpoint
CREATE TABLE `workflow_steps` (
	`step_id` text PRIMARY KEY NOT NULL,
	`step_name` text NOT NULL,
	`description` text,
	`step_order` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `workflow_steps_step_name_unique` ON `workflow_steps` (`step_name`);