import { pgTable, serial, varchar, boolean, timestamp, integer } from 'drizzle-orm/pg-core';

export const persoon = pgTable('persoon', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
});

export const on5 = pgTable('on5', {
  id: serial('id').primaryKey(),
  vrij: boolean('vrij'),
  datumTijdGewijzigd: timestamp('datum_tijd_gewijzigd'),
  gewijzigdDoor: integer('gewijzigd_door').references(() => persoon.id),
});
