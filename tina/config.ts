import { defineConfig } from "tinacms";

// Dynamically determine the branch
const branch =
    process.env.NEXT_PUBLIC_TINA_BRANCH ||
    process.env.HEAD ||
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||
    "main";

// Export TinaCMS configuration
export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID, // Use environment variable for Tina client ID
  token: process.env.TINA_TOKEN, // Use environment variable for Tina token
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "posts",
        label: "Posts",
        path: "src/content/posts",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "posted",
            label: "Date Posted",
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
});