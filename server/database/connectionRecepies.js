import { MongoClient } from 'mongodb';


const url = 'mongodb://0.0.0.0:27017';
const client = new MongoClient(url);

export async function connect() {
  try {

    await client.connect();
    return client.db('RecepiesDB');
  } catch (error) {
    console.error('Failed to connect to token MongoDB', error);
    throw error;
  }
}


export function close() {
  return client.close();
}