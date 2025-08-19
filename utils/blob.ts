import { list, put } from "@vercel/blob";

const token = process.env.BLOB_READ_WRITE_TOKEN;

export const saveJson = async (path: string, data: unknown) => {
  if (!token) {
    console.warn("BLOB_READ_WRITE_TOKEN not set");
    return null;
  }
  return put(path, JSON.stringify(data), {
    access: "public",
    contentType: "application/json",
    token,
  });
};

export const listBlobs = async (prefix?: string) => {
  if (!token) {
    console.warn("BLOB_READ_WRITE_TOKEN not set");
    return { blobs: [] };
  }
  return list({ token, prefix });
};
