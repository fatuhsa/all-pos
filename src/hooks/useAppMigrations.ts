import { useEffect, useState } from 'react';
import { db } from '../db/db';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from '../drizzle/migrations';

export function useAppMigrations() {
  const { success, error } = useMigrations(db, migrations);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (success) {
      setIsReady(true);
    }
  }, [success]);

  return { isReady, error };
}
