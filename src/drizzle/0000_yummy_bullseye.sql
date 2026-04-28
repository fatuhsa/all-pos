CREATE TABLE `products` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`price` real NOT NULL,
	`barcode` text,
	`image` text,
	`unit` text DEFAULT 'pcs',
	`created_at` integer DEFAULT '"2026-04-28T02:58:46.248Z"'
);
