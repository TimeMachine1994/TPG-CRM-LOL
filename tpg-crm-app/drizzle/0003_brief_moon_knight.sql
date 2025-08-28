ALTER TABLE `cases` ADD `is_archived` integer DEFAULT false;--> statement-breakpoint
ALTER TABLE `courts` ADD `is_archived` integer DEFAULT false;--> statement-breakpoint
ALTER TABLE `depositions` ADD `is_archived` integer DEFAULT false;