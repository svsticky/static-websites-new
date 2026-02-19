import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`company\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`slug\` text,
  	\`logo_id\` integer,
  	\`website\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`company_logo_idx\` ON \`company\` (\`logo_id\`);`)
  await db.run(sql`CREATE INDEX \`company_updated_at_idx\` ON \`company\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`company_created_at_idx\` ON \`company\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`company__status_idx\` ON \`company\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`company_locales\` (
  	\`name\` text,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`company\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`company_locales_locale_parent_id_unique\` ON \`company_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_company_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_slug\` text,
  	\`version_logo_id\` integer,
  	\`version_website\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`company\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_company_v_parent_idx\` ON \`_company_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_company_v_version_version_logo_idx\` ON \`_company_v\` (\`version_logo_id\`);`)
  await db.run(sql`CREATE INDEX \`_company_v_version_version_updated_at_idx\` ON \`_company_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_company_v_version_version_created_at_idx\` ON \`_company_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_company_v_version_version__status_idx\` ON \`_company_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_company_v_created_at_idx\` ON \`_company_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_company_v_updated_at_idx\` ON \`_company_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_company_v_snapshot_idx\` ON \`_company_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_company_v_published_locale_idx\` ON \`_company_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_company_v_latest_idx\` ON \`_company_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_company_v_locales\` (
  	\`version_name\` text,
  	\`version_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_company_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_company_v_locales_locale_parent_id_unique\` ON \`_company_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`company_contact\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`email\` text,
  	\`phone\` text,
  	\`company_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`company_id\`) REFERENCES \`company\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`company_contact_company_idx\` ON \`company_contact\` (\`company_id\`);`)
  await db.run(sql`CREATE INDEX \`company_contact_updated_at_idx\` ON \`company_contact\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`company_contact_created_at_idx\` ON \`company_contact\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`company_contact__status_idx\` ON \`company_contact\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_company_contact_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_name\` text,
  	\`version_email\` text,
  	\`version_phone\` text,
  	\`version_company_id\` integer,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`company_contact\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_company_id\`) REFERENCES \`company\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_company_contact_v_parent_idx\` ON \`_company_contact_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_company_contact_v_version_version_company_idx\` ON \`_company_contact_v\` (\`version_company_id\`);`)
  await db.run(sql`CREATE INDEX \`_company_contact_v_version_version_updated_at_idx\` ON \`_company_contact_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_company_contact_v_version_version_created_at_idx\` ON \`_company_contact_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_company_contact_v_version_version__status_idx\` ON \`_company_contact_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_company_contact_v_created_at_idx\` ON \`_company_contact_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_company_contact_v_updated_at_idx\` ON \`_company_contact_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_company_contact_v_snapshot_idx\` ON \`_company_contact_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_company_contact_v_published_locale_idx\` ON \`_company_contact_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_company_contact_v_latest_idx\` ON \`_company_contact_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`vacancy_type\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`vacancy\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`vacancy_type_order_idx\` ON \`vacancy_type\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`vacancy_type_parent_idx\` ON \`vacancy_type\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`vacancy\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`slug\` text,
  	\`company_id\` integer,
  	\`contact_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`company_id\`) REFERENCES \`company\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`contact_id\`) REFERENCES \`company_contact\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`vacancy_company_idx\` ON \`vacancy\` (\`company_id\`);`)
  await db.run(sql`CREATE INDEX \`vacancy_contact_idx\` ON \`vacancy\` (\`contact_id\`);`)
  await db.run(sql`CREATE INDEX \`vacancy_updated_at_idx\` ON \`vacancy\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`vacancy_created_at_idx\` ON \`vacancy\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`vacancy__status_idx\` ON \`vacancy\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`vacancy_locales\` (
  	\`title\` text,
  	\`summary\` text,
  	\`content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`vacancy\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`vacancy_locales_locale_parent_id_unique\` ON \`vacancy_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`vacancy_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`study_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`vacancy\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`study_id\`) REFERENCES \`study\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`vacancy_rels_order_idx\` ON \`vacancy_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`vacancy_rels_parent_idx\` ON \`vacancy_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`vacancy_rels_path_idx\` ON \`vacancy_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`vacancy_rels_study_id_idx\` ON \`vacancy_rels\` (\`study_id\`);`)
  await db.run(sql`CREATE TABLE \`_vacancy_v_version_type\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_vacancy_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_vacancy_v_version_type_order_idx\` ON \`_vacancy_v_version_type\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_vacancy_v_version_type_parent_idx\` ON \`_vacancy_v_version_type\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_vacancy_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_slug\` text,
  	\`version_company_id\` integer,
  	\`version_contact_id\` integer,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`vacancy\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_company_id\`) REFERENCES \`company\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_contact_id\`) REFERENCES \`company_contact\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_vacancy_v_parent_idx\` ON \`_vacancy_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_vacancy_v_version_version_company_idx\` ON \`_vacancy_v\` (\`version_company_id\`);`)
  await db.run(sql`CREATE INDEX \`_vacancy_v_version_version_contact_idx\` ON \`_vacancy_v\` (\`version_contact_id\`);`)
  await db.run(sql`CREATE INDEX \`_vacancy_v_version_version_updated_at_idx\` ON \`_vacancy_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_vacancy_v_version_version_created_at_idx\` ON \`_vacancy_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_vacancy_v_version_version__status_idx\` ON \`_vacancy_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_vacancy_v_created_at_idx\` ON \`_vacancy_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_vacancy_v_updated_at_idx\` ON \`_vacancy_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_vacancy_v_snapshot_idx\` ON \`_vacancy_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_vacancy_v_published_locale_idx\` ON \`_vacancy_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_vacancy_v_latest_idx\` ON \`_vacancy_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_vacancy_v_locales\` (
  	\`version_title\` text,
  	\`version_summary\` text,
  	\`version_content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_vacancy_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_vacancy_v_locales_locale_parent_id_unique\` ON \`_vacancy_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_vacancy_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`study_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_vacancy_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`study_id\`) REFERENCES \`study\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_vacancy_v_rels_order_idx\` ON \`_vacancy_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_vacancy_v_rels_parent_idx\` ON \`_vacancy_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_vacancy_v_rels_path_idx\` ON \`_vacancy_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_vacancy_v_rels_study_id_idx\` ON \`_vacancy_v_rels\` (\`study_id\`);`)
  await db.run(sql`CREATE TABLE \`study\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`abbreviation\` text NOT NULL,
  	\`order\` numeric NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`study_updated_at_idx\` ON \`study\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`study_created_at_idx\` ON \`study\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`study_locales\` (
  	\`name\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`study\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`study_locales_locale_parent_id_unique\` ON \`study_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`company_id\` integer REFERENCES company(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`company_contact_id\` integer REFERENCES company_contact(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`vacancy_id\` integer REFERENCES vacancy(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`study_id\` integer REFERENCES study(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_company_id_idx\` ON \`payload_locked_documents_rels\` (\`company_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_company_contact_id_idx\` ON \`payload_locked_documents_rels\` (\`company_contact_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_vacancy_id_idx\` ON \`payload_locked_documents_rels\` (\`vacancy_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_study_id_idx\` ON \`payload_locked_documents_rels\` (\`study_id\`);`)
  await db.run(sql`ALTER TABLE \`main_stats_stats_locales\` ADD \`unit\` text;`)
  await db.run(sql`ALTER TABLE \`main_stats_stats\` DROP COLUMN \`unit\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`company\`;`)
  await db.run(sql`DROP TABLE \`company_locales\`;`)
  await db.run(sql`DROP TABLE \`_company_v\`;`)
  await db.run(sql`DROP TABLE \`_company_v_locales\`;`)
  await db.run(sql`DROP TABLE \`company_contact\`;`)
  await db.run(sql`DROP TABLE \`_company_contact_v\`;`)
  await db.run(sql`DROP TABLE \`vacancy_type\`;`)
  await db.run(sql`DROP TABLE \`vacancy\`;`)
  await db.run(sql`DROP TABLE \`vacancy_locales\`;`)
  await db.run(sql`DROP TABLE \`vacancy_rels\`;`)
  await db.run(sql`DROP TABLE \`_vacancy_v_version_type\`;`)
  await db.run(sql`DROP TABLE \`_vacancy_v\`;`)
  await db.run(sql`DROP TABLE \`_vacancy_v_locales\`;`)
  await db.run(sql`DROP TABLE \`_vacancy_v_rels\`;`)
  await db.run(sql`DROP TABLE \`study\`;`)
  await db.run(sql`DROP TABLE \`study_locales\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	\`person_id\` integer,
  	\`faq_question_id\` integer,
  	\`supermentor_id\` integer,
  	\`ad_id\` integer,
  	\`board_message_id\` integer,
  	\`quote_id\` integer,
  	\`main_news_item_id\` integer,
  	\`main_committee_id\` integer,
  	\`main_board_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`person_id\`) REFERENCES \`person\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`faq_question_id\`) REFERENCES \`faq_question\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`supermentor_id\`) REFERENCES \`supermentor\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`ad_id\`) REFERENCES \`ad\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`board_message_id\`) REFERENCES \`board_message\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`quote_id\`) REFERENCES \`quote\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`main_news_item_id\`) REFERENCES \`main_news_item\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`main_committee_id\`) REFERENCES \`main_committee\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`main_board_id\`) REFERENCES \`main_board\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "users_id", "media_id", "person_id", "faq_question_id", "supermentor_id", "ad_id", "board_message_id", "quote_id", "main_news_item_id", "main_committee_id", "main_board_id") SELECT "id", "order", "parent_id", "path", "users_id", "media_id", "person_id", "faq_question_id", "supermentor_id", "ad_id", "board_message_id", "quote_id", "main_news_item_id", "main_committee_id", "main_board_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_person_id_idx\` ON \`payload_locked_documents_rels\` (\`person_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_faq_question_id_idx\` ON \`payload_locked_documents_rels\` (\`faq_question_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_supermentor_id_idx\` ON \`payload_locked_documents_rels\` (\`supermentor_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_ad_id_idx\` ON \`payload_locked_documents_rels\` (\`ad_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_board_message_id_idx\` ON \`payload_locked_documents_rels\` (\`board_message_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_quote_id_idx\` ON \`payload_locked_documents_rels\` (\`quote_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_main_news_item_id_idx\` ON \`payload_locked_documents_rels\` (\`main_news_item_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_main_committee_id_idx\` ON \`payload_locked_documents_rels\` (\`main_committee_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_main_board_id_idx\` ON \`payload_locked_documents_rels\` (\`main_board_id\`);`)
  await db.run(sql`ALTER TABLE \`main_stats_stats\` ADD \`unit\` text;`)
  await db.run(sql`ALTER TABLE \`main_stats_stats_locales\` DROP COLUMN \`unit\`;`)
}
