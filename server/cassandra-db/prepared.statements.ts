import { client } from '../cassandra-db';

//keyspaces
export const devKeyspace: string = `CREATE KEYSPACE IF NOT EXISTS dev WITH REPLICATION = { 
    'class' : 'SimpleStrategy',
    'replication_factor' : 1
  };`;
export const testKeyspace: string = `CREATE KEYSPACE IF NOT EXISTS dev WITH REPLICATION = { 
    'class' : 'SimpleStrategy',
    'replication_factor' : 1
  };`;

// create tables
export const usersTable: string = `CREATE TABLE IF NOT EXISTS users (
    id uuid,
      email text,
      created timestamp,
      password text,
      salt text,
      facebook text,
      firstname text,
      github text,
      google text,
      lastname text,
      middlename text,
      role text,
      username text,
      PRIMARY KEY (email)
  );`;

// delete tables
export const truncateUsers: string = `TRUNCATE users`;