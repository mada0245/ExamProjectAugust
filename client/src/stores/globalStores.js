import { readable, writable } from "svelte/store";

export const BASE_URL = readable("http://localhost:8000");
export const token = writable(null);
export const isLoggedIn = writable(false);

