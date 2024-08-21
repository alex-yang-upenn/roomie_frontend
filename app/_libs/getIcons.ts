'use server'

import fs from 'fs/promises';
import path from 'path';

export default async function getIcons() {
  const publicDir = path.join(process.cwd(), "public", "FrontPageIcons");
  const files = await fs.readdir(publicDir);

  return files.map(file => ({
    src: `/FrontPageIcons/${file}`,
    title: file.replace(".jpg", "")
  }));
}