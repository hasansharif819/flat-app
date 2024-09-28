import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { dashboardServices } from "./dashboard.service";
// import { chartServices } from "../chart/chart.service";
// import { flatServices } from "../flat/flat.service";
// import { bookingServices } from "../booking/booking.service";

const getUserRegistrationTrends = catchAsync(async (req, res) => {
  const result = await dashboardServices.getUserRegistrationTrends();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Dashboard statistics retrieved successfully!",
    data: result,
  });
});

const monthlyTotalUsers = catchAsync(async (req, res) => {
  const result = await dashboardServices.monthlyTotalUsers();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Dashboard statistics retrieved successfully!",
    data: result,
  });
});

const getUserByRole = catchAsync(async (req, res) => {
  const result = await dashboardServices.getUserByRole();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Dashboard statistics retrieved successfully!",
    data: result,
  });
});

const totalUser = catchAsync(async (req, res) => {
  const result = await dashboardServices.totalUser();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Dashboard statistics retrieved successfully!",
    data: result,
  });
});

const totalBookings = catchAsync(async (req, res) => {
  const result = await dashboardServices.totalBookings();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Dashboard statistics retrieved successfully!",
    data: result,
  });
});

const totalBookingsByUser = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const result = await dashboardServices.totalBookingsByUser(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Dashboard statistics retrieved successfully!",
    data: result,
  });
});

const bookingsByUser = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const result = await dashboardServices.bookingsByUser(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Dashboard statistics retrieved successfully!",
    data: result,
  });
});

const totalFlatPostByUser = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const result = await dashboardServices.totalFlatPostByUser(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Dashboard statistics retrieved successfully!",
    data: result,
  });
});

const flatPostByUser = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const result = await dashboardServices.flatPostByUser(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Dashboard statistics retrieved successfully!",
    data: result,
  });
});

export const dashboardControllers = {
  getUserRegistrationTrends,
  monthlyTotalUsers,
  getUserByRole,
  totalUser,
  totalBookings,
  totalBookingsByUser,
  bookingsByUser,
  totalFlatPostByUser,
  flatPostByUser,
};
