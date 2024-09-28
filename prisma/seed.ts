import { UserRole } from "@prisma/client";
import * as bcrypt from "bcrypt";
import prisma from "../src/app/utils/prisma";

export const seedSuperAdmin = async () => {
  try {
    const isExistSuperAdmin = await prisma.user.findFirst({
      where: {
        role: UserRole.ADMIN,
      },
    });

    if (isExistSuperAdmin) {
      // console.log("Super admin already exists!");
      return;
    }

    const hashedPassword = await bcrypt.hash("SuperAdmin", 12);

    const superAdminData = await prisma.user.create({
      data: {
        email: "hs.sharif819@gmail.com",
        password: hashedPassword,
        role: UserRole.ADMIN,
        username: "SharifHasan",
      },
    });

    // console.log("Super Admin Created Successfully!", superAdminData);
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
};
