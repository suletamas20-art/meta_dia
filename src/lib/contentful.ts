
import { createClient } from "contentful";

const space = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
const accessToken = import.meta.env.VITE_CONTENTFUL_DELIVERY_TOKEN;
const environment =
  import.meta.env.VITE_CONTENTFUL_ENVIRONMENT || "master";

function getClient() {
  if (!space || !accessToken) {
    throw new Error(
      "Hiányzik a Contentful konfiguráció. Ellenőrizd a .env.local fájlt.",
    );
  }

  return createClient({
    space,
    accessToken,
    environment,
  });
}

export async function getScreens() {
  const client = getClient();

  const response = await client.getEntries({
    content_type: "screen",
    limit: 1000,
  });

  return response.items;
}

export async function getScreenBySlug(slug: string) {
  const client = getClient();

  const response = await client.getEntries({
    content_type: "screen",
    "fields.slug": slug,
    limit: 1,
  });

  return response.items[0] ?? null;
}
