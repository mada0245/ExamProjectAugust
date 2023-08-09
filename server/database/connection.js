//calling the required depencie
import { MongoClient } from 'mongodb';

//here we insert the s´mongoDB url and create a new instance of the MongoClient with it
const url = 'mongodb://0.0.0.0:27017';
const usersClient = new MongoClient(url);

export async function connect() {
  try {
    //here we connect to the AuthSysstemDB
    await usersClient.connect();
    return usersClient.db('AuthSystemDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    throw error;
  }
}

//here we close the connection
export function close() {
  return usersClient.close();
}