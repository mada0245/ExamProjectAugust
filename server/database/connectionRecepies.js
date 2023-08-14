import { MongoClient } from 'mongodb';


const url = 'mongodb://0.0.0.0:27017';
const recepiesClient = new MongoClient(url);

export async function connect() {
  try {

    await recepiesClient.connect();
    return recepiesClient.db('RecepiesDB');
  } catch (error) {
    console.error('Failed to connect to token MongoDB', error);
    throw error;
  }
}


export function close() {
  return recepiesClient.close();
}