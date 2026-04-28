import journal from './meta/_journal.json';

const m0000 = `CREATE TABLE \`products\` (
	\`id\` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	\`name\` text NOT NULL,
	\`price\` real NOT NULL,
	\`barcode\` text,
	\`image\` text,
	\`unit\` text DEFAULT 'pcs',
	\`created_at\` integer DEFAULT '"2026-04-28T02:58:46.248Z"'
);`;

const m0001 = `CREATE TABLE \`sale_items\` (
	\`id\` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	\`sale_id\` integer,
	\`product_id\` integer,
	\`quantity\` integer NOT NULL,
	\`price_at_sale\` real NOT NULL,
	FOREIGN KEY (\`sale_id\`) REFERENCES \`sales\`(\`id\`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE \`sales\` (
	\`id\` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	\`total_amount\` real NOT NULL,
	\`payment_method\` text NOT NULL,
	\`created_at\` integer DEFAULT '"2026-04-28T03:05:33.072Z"'
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE \`__new_products\` (
	\`id\` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	\`name\` text NOT NULL,
	\`price\` real NOT NULL,
	\`barcode\` text,
	\`image\` text,
	\`unit\` text DEFAULT 'pcs',
	\`created_at\` integer DEFAULT '"2026-04-28T03:05:33.069Z"'
);
--> statement-breakpoint
INSERT INTO \`__new_products\`("id", "name", "price", "barcode", "image", "unit", "created_at") SELECT "id", "name", "price", "barcode", "image", "unit", "created_at" FROM \`products\`;--> statement-breakpoint
DROP TABLE \`products\`;--> statement-breakpoint
ALTER TABLE \`__new_products\` RENAME TO \`products\`;--> statement-breakpoint
PRAGMA foreign_keys=ON;`;

export default {
  journal,
  migrations: {
    m0000,
    m0001,
  },
};
