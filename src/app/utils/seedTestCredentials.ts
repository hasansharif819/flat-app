// import { UserRole } from "@prisma/client";
// // import * as bcrypt from "bcrypt";
// import bcrypt from "bcrypt";
// import prisma from "./prisma";
// import config from "../config/config";

// export const seedTestCredentials = async () => {
//   try {
//     const isExistAdmin = await prisma.user.findFirst({
//       where: {
//         email: config.test.admin_email,
//         role: UserRole.ADMIN,
//       },
//     });

//     const isExistUser = await prisma.user.findFirst({
//       where: {
//         email: config.test.user_email,
//         role: UserRole.ADMIN,
//       },
//     });

//     if (isExistAdmin && isExistUser) {
//       return;
//     }

//     const adminHashedPassword = await bcrypt.hash(
//       config.test.admin_password as string,
//       12
//     );

//     const userHashedPassword = await bcrypt.hash(
//       config.test.user_password as string,
//       12
//     );

//     const adminData = {
//       email: config.test.admin_email as string,
//       password: adminHashedPassword,
//       role: UserRole.ADMIN,
//       username: config.test.admin_username as string,
//     };

//     const userData = {
//       email: config.test.user_email as string,
//       password: userHashedPassword,
//       role: UserRole.USER,
//       username: config.test.user_username as string,
//     };

//     if (!isExistAdmin) {
//       await prisma.$transaction(async (transactionClient: any) => {
//         const createdAdminData = await transactionClient.user.create({
//           data: adminData,
//         });

//         const adminUserId = createdAdminData.id;

//         await transactionClient.userProfile.create({
//           data: {
//             userId: adminUserId,
//           },
//         });

//         const createdUserData = await transactionClient.user.create({
//           data: userData,
//         });

//         const userId = createdUserData.id;

//         await transactionClient.userProfile.create({
//           data: {
//             userId: userId,
//           },
//         });
//       });
//     }
//   } catch (err) {
//     console.error(err);
//   } finally {
//     await prisma.$disconnect();
//   }
// };



import { UserRole } from "@prisma/client";
import bcrypt from "bcrypt";
import prisma from "./prisma";
import config from "../config/config";

export const seedTestCredentials = async () => {
  try {
    // Check if admin and user already exist
    const isExistAdmin = await prisma.user.findFirst({
      where: {
        email: config.test.admin_email,
        role: UserRole.ADMIN,
      },
    });

    const isExistUser = await prisma.user.findFirst({
      where: {
        email: config.test.user_email,
        role: UserRole.USER,  // Fix: Check for User role
      },
    });

    // If both admin and user exist, no need to seed them again
    if (isExistAdmin && isExistUser) {
      return;
    }

    // Ensure passwords are defined
    if (!config.test.admin_password || !config.test.user_password) {
      throw new Error("Admin or user password is not defined in the configuration.");
    }

    // Hash passwords with bcrypt
    const adminHashedPassword = await bcrypt.hash(
      config.test.admin_password as string,
      12
    );
    const userHashedPassword = await bcrypt.hash(
      config.test.user_password as string,
      12
    );

    // Prepare data for admin and user
    const adminData = {
      email: config.test.admin_email as string,
      password: adminHashedPassword,
      role: UserRole.ADMIN,
      username: config.test.admin_username as string,
    };

    const userData = {
      email: config.test.user_email as string,
      password: userHashedPassword,
      role: UserRole.USER,
      username: config.test.user_username as string,
    };

    // If admin does not exist, create both admin and user in a transaction
    if (!isExistAdmin) {
      await prisma.$transaction(async (transactionClient: any) => {
        // Create admin
        const createdAdminData = await transactionClient.user.create({
          data: adminData,
        });

        const adminUserId = createdAdminData.id;

        // Create profile for admin
        await transactionClient.userProfile.create({
          data: {
            userId: adminUserId,
          },
        });

        // Create user
        const createdUserData = await transactionClient.user.create({
          data: userData,
        });

        const userId = createdUserData.id;

        // Create profile for user
        await transactionClient.userProfile.create({
          data: {
            userId: userId,
          },
        });
      });
    }
  } catch (err) {
    console.error("Error seeding test credentials:", err);
  } finally {
    await prisma.$disconnect();
  }
};
