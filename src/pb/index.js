import PocketBase from 'pocketbase';

const client = new PocketBase(import.meta.env.VITE_PB_URL);

export default client;