import prisma from "../lib/prisma";

const folders: Record<string, string> = {
    "news": "Les Bultins",
    "themes": "Les Thèmes",
    "events": "Les Manifestations",
    "blog": "Les Publications"
};

const posts: Record<string, string> = {
    "about": "Présentation"
};

async function main() {
    for (const [key, value] of Object.entries(folders)) {
        console.log(`Checking if folder "${key}" exists...`);
        const folder = await prisma.folder.findUnique({
            where: {
                slug: key
            }
        });
        if (folder === null) {
            console.log(`The folder "${key}" does not exist. Creating...`);
            await prisma.folder.create({
                data: {
                    name: value,
                    slug: key
                }
            });
        } else console.log(`The folder "${key}" already exists`);
    }
    for (const [key, value] of Object.entries(posts)) {
        console.log(`Checking if post "${key}" exists...`);
        const post = await prisma.post.findUnique({
            where: {
                slug: key
            }
        });
        if (post === null) {
            console.log(`The post "${key}" does not exist. Creating...`);
            await prisma.post.create({
                data: {
                    title: value,
                    slug: key,
                    content: "Cette page n'a pas encore été mise à jour !",
                    author: "--"
                }
            });
        } else console.log(`The post "${key}" already exists`);
    }
}

main()
    .then(async () => await prisma.$disconnect())
    .catch(async (err) => {
        console.error(err);
        await prisma.$disconnect();
        process.exit(1);
    });