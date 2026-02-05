import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { db, pool } from './index';

console.log('Running migrations...');
try {
  await migrate(db, { migrationsFolder: './drizzle' });
  console.log('Migrations complete.');
} catch (error) {
  console.error('Migration failed:', error);
  process.exit(1);
} finally {
  await pool.end();
}
