import { Flat, Prisma } from "@prisma/client";
import prisma from "../../utils/prisma";
import { TPaginationOptions } from "../../interfaces/pagination";
import { paginationHelper } from "../../utils/paginationHelpers";
import { flatSearchableFields } from "./flat.constants";

const createFlat = async (flatData: Flat, userId: string) => {
  const data = {
    ...flatData,
    userId,
  };
  const result = await prisma.flat.create({
    data: data,
  });
  return result;
};

const getFlats = async (params: any, options: TPaginationOptions) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const {
    searchTerm,
    location,
    availability,
    minPrice,
    maxPrice,
    totalBedrooms,
    ...filterData
  } = params;
  // console.log(params);
  const andConditions: Prisma.FlatWhereInput[] = [];

  if (params.searchTerm) {
    andConditions.push({
      OR: flatSearchableFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  // Add condition for availability because it have boolean value
  if (availability) {
    const availabilityFilter = params.availability === "true" ? true : false;
    andConditions.push({
      availability: availabilityFilter,
    });
  }

  if (location) {
    andConditions.push({
      location: {
        contains: location,
        mode: "insensitive",
      },
    });
  }

  if (minPrice) {
    andConditions.push({
      rent: {
        gte: parseFloat(minPrice),
      },
    });
  }

  if (maxPrice) {
    andConditions.push({
      rent: {
        lte: parseFloat(maxPrice),
      },
    });
  }

  if (totalBedrooms) {
    andConditions.push({
      totalBedrooms: {
        equals: parseInt(totalBedrooms),
      },
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.FlatWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.flat.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });

  const total = await prisma.flat.count({
    where: whereConditions,
  });
  // console.log(result);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleFlat = async (flatId: string) => {
  const result = await prisma.flat.findUniqueOrThrow({
    where: {
      id: flatId,
      availability: true,
    },
  });
  return result;
};

const getMyFlats = async (userId: string) => {
  const result = await prisma.flat.findMany({
    where: {
      userId: userId,
      availability: true,
    },
  });
  return result;
};

const updateFlat = async (flatId: string, flatData: Partial<Flat>) => {
  const result = await prisma.flat.update({
    where: {
      id: flatId,
    },
    data: flatData,
  });
  return result;
};

const deleteFlat = async (flatId: string) => {
  const result = await prisma.flat.update({
    where: {
      id: flatId,
    },
    data: {
      availability: false,
    },
  });
  return result;
};

export const flatServices = {
  createFlat,
  getFlats,
  updateFlat,
  getSingleFlat,
  getMyFlats,
  deleteFlat,
};
