import { readable, writable } from "svelte/store";

export const BASE_URL = readable("http://localhost:8000");
export const savedToken = writable(null);
export const authorisation = writable(false);
