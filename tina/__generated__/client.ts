import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '713dfc59693fb3c883b55271ffef2e48db98326e', queries,  });
export default client;
  