import prisma from "../lib/prisma";
import fs from "fs/promises";
import path from "path";

export async function cleanup() {
  const UPLOADS_DIR = path.join(process.cwd(), "public/uploads");
  
  try {
    await fs.access(UPLOADS_DIR);
  } catch {
    console.log("Uploads directory not found, skipping cleanup.");
    return;
  }

  console.log("Fetching posts...");
  const posts = await prisma.post.findMany({
    select: { content: true }
  });

  const usedFilenames = new Set<string>();
  const regex = /\/uploads\/([a-zA-Z0-9.-]+)/g;

  posts.forEach(post => {
    if (!post.content) return;
    const matches = (post.content as string).matchAll(regex);
    for (const match of matches) {
      if (match[1]) {
        usedFilenames.add(match[1]);
      }
    }
  });

  console.log(`Found ${usedFilenames.size} referenced images.`);

  const files = await fs.readdir(UPLOADS_DIR);
  let deletedCount = 0;

  for (const file of files) {
    if (file === ".gitignore" || file === ".DS_Store") continue;
    
    if (!usedFilenames.has(file)) {
      try {
        await fs.unlink(path.join(UPLOADS_DIR, file));
        console.log(`Deleted: ${file}`);
        deletedCount++;
      } catch (err) {
        console.error(`Failed to delete ${file}:`, err);
      }
    }
  }

  console.log(`Cleanup complete. Deleted ${deletedCount} files.`);
  return deletedCount;
}

if (require.main === module || (process.argv[1] && process.argv[1].endsWith('cleanup-images.ts'))) {
  cleanup()
    .catch((e) => {
      console.error("Error during cleanup:", e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
