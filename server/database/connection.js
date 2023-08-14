import { MongoClient } from 'mongodb';

const url = 'mongodb://0.0.0.0:27017';
const usersClient = new MongoClient(url);

export async function connect() {
  try {
    await usersClient.connect();
    return usersClient.db('AuthSystemDB');


  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    throw error;
  }
}


export function close() {
  return usersClient.close();
}