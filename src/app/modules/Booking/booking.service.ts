import { Booking } from "@prisma/client";
import prisma from "../../utils/prisma";
import APIError from "../../errors/APIError";
import httpStatus from "http-status";

const getBooking = async () => {
  const result = await prisma.booking.findMany({
    include: {
      flat: {
        select: {
          title: true,
          location: true,
          rent: true,
        },
      },
    },
  });
  return result;
};

const getMyBookings = async (userId: string) => {
  const result = await prisma.booking.findMany({
    where: { userId: userId },
    include: {
      flat: {
        select: {
          title: true,
          location: true,
          rent: true,
        },
      },
    },
  });
  return result;
};

const bookingRequest = async (userId: string, flatId: string) => {
  const bookingRequestData = {
    userId,
    flatId,
  };

  const checkRequest = await prisma.booking.findFirst({
    where: { userId: userId, flatId: flatId },
  });

  if (checkRequest) {
    throw new APIError(
      httpStatus.ALREADY_REPORTED,
      "You have already booked this flat!"
    );
  }

  const result = await prisma.booking.create({
    data: bookingRequestData,
  });
  return result;
};

const updateBooking = async (
  bookingId: string,
  bookingData: Partial<Booking>
) => {
  const result = await prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: bookingData,
  });
  return result;
};

export const bookingServices = {
  bookingRequest,
  getBooking,
  updateBooking,
  getMyBookings,
};
