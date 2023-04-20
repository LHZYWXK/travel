import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import 'react-native-url-polyfill/auto';

const client = createClient({
  projectId: "a32maoil",
  dataset: "production",
  useCdn: false,
  apiVersion: "2021-10-21",
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => {
  return builder.image(source);
};


export default client;
