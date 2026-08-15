import { defineConfig } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },

  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      {
        name: "post",
        label: "Blog Posts",
        path: "content/blog",
        format: "mdx",

        ui: {
          filename: {
            slugify: (values) => {
              const date = values.date
                ? new Date(values.date).toISOString().slice(0, 10)
                : new Date().toISOString().slice(0, 10);

              const slug = values.title
                ? values.title
                    .toLowerCase()
                    .trim()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/^-+|-+$/g, "")
                : "untitled";

              return `${date}--${slug}/index`;
            },
          },
        },

        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true,
          },

          {
            type: "string",
            name: "slug",
            label: "Slug",
            required: true,

            ui: {
              parse: (value) => value?.toLowerCase(),
            },
          },

          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
          },

          {
            type: "datetime",
            name: "date",
            label: "Published Date",
            required: true,
          },

          {
            type: "datetime",
            name: "lastUpdated",
            label: "Last Updated",
            required: true,
          },

          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
          },

          {
            type: "string",
            name: "image",
            label: "Image",
          },

          {
            type: "boolean",
            name: "searchIndex",
            label: "Include in search",
          },

          {
            type: "rich-text",
            name: "body",
            label: "Content",
            isBody: true,
          },
        ],
      },
    ],
  },
});