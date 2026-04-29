-- Create root folders with final slugs matching Nuxt folders
INSERT INTO "Folder" (id, name, slug, "updatedAt") VALUES 
('clnewslettersroot00000000', 'Les Bulletins', 'news', NOW()),
('cleventsroot0000000000000', 'Les Manifestations', 'events', NOW()),
('clthemesroot0000000000000', 'Les Thèmes', 'themes', NOW()),
('clpublicationsroot0000000', 'Les Publications', 'blog', NOW());

-- Create base about post
INSERT INTO "Post" (id, title, slug, content, author, "updatedAt") VALUES
('claboutpostroot0000000000', 'Présentation', 'about', 'Cette page n''a pas encore été mise à jour !', 'Admin', NOW());
