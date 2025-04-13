import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Hash passwords
  const passwordHash = await bcrypt.hash('password123', 10);

  console.log('Start Seeding...');

  // Create Users
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      username: 'admin',
      email: 'admin@libapi.com',
      password: passwordHash,
      role: 'ADMIN',
    },
  });

  const user = await prisma.user.create({
    data: {
      name: 'Regular User',
      username: 'regular user',
      email: 'user@libapi.com',
      password: passwordHash,
      role: 'USER',
    },
  });

  // Authors, Genres, Publishers
  const author = await prisma.author.create({ data: { name: 'J.K. Rowling' } });
  const genre = await prisma.genre.create({ data: { name: 'Fantasy' } });
  const publisher = await prisma.publisher.create({
    data: { name: 'Bloomsbury' },
  });

  // Books
  const book = await prisma.book.create({
    data: {
      name: "Harry Potter and the Sorcerer's Stone",
      description: 'A magical fantasy book.',
      authorId: author.id,
      genreId: genre.id,
      publisherId: publisher.id,
    },
  });

  // Reviews
  await prisma.review.create({
    data: {
      rating: 5,
      comment: 'Amazing book!',
      userId: user.id,
      bookId: book.id,
    },
  });

  // Favorites
  await prisma.favorite.create({
    data: {
      userId: user.id,
      bookId: book.id,
    },
  });

  console.log('✅ Seeding complete');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
