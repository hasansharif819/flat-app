import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { bookingServices } from "./booking.service";

const getBooking = catchAsync(async (req, res) => {
  const result = await bookingServices.getBooking();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking requests retrieved successfully!",
    data: result,
  });
});

const getMyBookings = catchAsync(async (req, res) => {
  const { userId } = req.user;

  const result = await bookingServices.getMyBookings(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking requests retrieved successfully!",
    data: result,
  });
});

const bookingRequest = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const { flatId } = req.body;

  const result = await bookingServices.bookingRequest(userId, flatId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking requests submitted successfully!",
    data: result,
  });
});

const updateBooking = catchAsync(async (req, res) => {
  const { bookingId } = req.params;

  const result = await bookingServices.updateBooking(bookingId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking request updated successfully!",
    data: result,
  });
});

export const bookingControllers = {
  bookingRequest,
  getBooking,
  updateBooking,
  getMyBookings,
};
