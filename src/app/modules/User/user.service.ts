import * as bcrypt from "bcrypt";
import prisma from "../../utils/prisma";
import { Prisma, User, UserProfile } from "@prisma/client";
import { TUserData } from "./user.interface";
import APIError from "../../errors/APIError";
import httpStatus from "http-status";
import config from "../../config/config";

const createUser = async (data: TUserData) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      username: data.username,
    },
  });

  if (existingUser) {
    throw new APIError(httpStatus.CONFLICT, "Username is already taken");
  }

  const hashedPassword: string = await bcrypt.hash(data.password, 12);

  const userData = {
    username: data.username,
    email: data.email,
    role: data.role,
    password: hashedPassword,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    const createdUserData = await transactionClient.user.create({
      data: userData,
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    const userId = createdUserData.id;

    await transactionClient.userProfile.create({
      data: {
        userId: userId,
      },
    });

    return createdUserData;
  });

  return result;
};

const getUser = async (id: string) => {
  const result = await prisma.user.findUniqueOrThrow({
    where: {
      id: id,
    },
    select: {
      id: true,
      email: true,
      role: true,
      username: true,
    },
  });

  return result;
};

const getAllUser = async (currentUserEmail: string) => {
  const result = await prisma.user.findMany({
    where: {
      email: {
        notIn: [config.superAdmin.super_admin_email, currentUserEmail],
      },
    },
  });

  return result;
};

const getUserWithProfile = async (id: string) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: id,
    },
    select: {
      id: true,
      email: true,
      role: true,
      username: true,
    },
  });

  const profile = await prisma.userProfile.findUniqueOrThrow({
    where: {
      userId: user.id,
    },
  });
  return {
    ...user,
    ...profile,
  };
};

const getUserProfile = async (id: string) => {
  const result = await prisma.userProfile.findUniqueOrThrow({
    where: {
      userId: id,
    },
  });
  return result;
};

const updateUser = async (
  id: string,
  userData: Partial<UserProfile> & { username?: string; email?: string }
) => {
  const { email, username, ...profileData } = userData;

  // Retrieve the current user
  const existingUser = await prisma.user.findUniqueOrThrow({
    where: {
      id: id,
    },
  });

  // Check if the username or email is being updated
  if (username && username !== existingUser.username) {
    const existingUsername = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    if (existingUsername) {
      throw new APIError(httpStatus.CONFLICT, "Username is already taken");
    }
  }

  if (email && email !== existingUser.email) {
    const existingEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (existingEmail) {
      throw new APIError(httpStatus.CONFLICT, "Email is already taken");
    }
  }

  // Update user
  const result = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      username: username || existingUser.username,
      email: email || existingUser.email,
    },
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  // Update user profile
  const updatedProfile = await prisma.userProfile.update({
    where: {
      userId: id,
    },
    data: profileData,
  });

  return {
    ...result,
    ...updatedProfile,
  };
};

//  update user status
const updateUserStatus = async (
  userId: string,
  updatedData: Partial<Prisma.UserUpdateInput>
) => {
  const result = await prisma.user.update({
    where: { id: userId },
    data: updatedData,
  });
  return result;
};

export const userServices = {
  createUser,
  getUser,
  getUserProfile,
  updateUser,
  getUserWithProfile,
  getAllUser,
  updateUserStatus,
};
