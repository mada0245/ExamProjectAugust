import { MongoClient } from 'mongodb';

const url = 'mongodb://0.0.0.0:27017';
const tokenClient = new MongoClient(url);

export async function connect() {
  try {
    await tokenClient.connect();
    return tokenClient.db('TokenDB');


  } catch (error) {
    console.error('Failed to connect to token MongoDB', error);
    throw error;


  }
}


export function close() {
  return tokenClient.close();
}