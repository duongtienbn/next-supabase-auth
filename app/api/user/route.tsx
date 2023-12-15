// Trong api/users.js
import { PrismaClient } from '@prisma/client';

export default async function handler({req, res}:any) {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany();

  res.status(200).json(users);
}
