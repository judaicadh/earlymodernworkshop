import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "src/assets/images", // Where media files are stored
      publicFolder: "src/assets/images", // Public folder for images
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "years",
        label: "Years",
        label_singular: "Year",
        path: "src/content/years", // Folder for JSON files
        format: "json",
        fields: [
          {
            name: "year",
            label: "Year",
            type: "string",
          },
          {
            name: "title",
            label: "Title",
            type: "string",
          },
          {
            name: "description",
            label: "Description",
            type: "string",
            required: false,
          },
          {
            name: "slug",
            label: "Slug",
            type: "string",
          },
          {
            name: "thumbnail",
            label: "Thumbnail",
            type: "image",
            required: false,
          },
        ],
      },
      {
        name: "documents",
        label: "Documents",
        label_singular: "Document",
        path: "src/content/documents", // Folder for Markdown files
        format: "md",
        fields: [
          {
            name: "title",
            label: "Title",
            type: "string",
          },
          {
            name: "description",
            label: "Description",
            type: "string",
            required: false,
          },
          {
            name: "author",
            label: "Author",
            type: "string",
            required: false,
          },
          {
            name: "year",
            label: "Year",
            type: "string", // Use "string" instead of "relation" (manual input or validation later)
          },
          {
            name: "slug",
            label: "Slug",
            type: "string",
          },
          {
            name: "tags",
            label: "Tags",
            type: "string", // Use "string" for a comma-separated list (can parse later)
            required: false,
          },
          {
            name: "thumbnail",
            label: "Thumbnail",
            type: "image",
            required: false,
          },
          {
            name: "file",
            label: "File",
            type: "string", // Use "string" to store file paths
            required: false,
          },
        ],
      },
    ],
  },
});
