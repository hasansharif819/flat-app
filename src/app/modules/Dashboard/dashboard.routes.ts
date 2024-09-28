import express from "express";
import auth from "../../middlewares/auth";
import { dashboardControllers } from "./dashboard.controller";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.get(
  "/user-reg",
  auth(UserRole.ADMIN),
  dashboardControllers.getUserRegistrationTrends
);

router.get(
  "/user-month",
  auth(UserRole.ADMIN),
  dashboardControllers.monthlyTotalUsers
);

router.get(
  "/user-role",
  auth(UserRole.ADMIN),
  dashboardControllers.getUserByRole
);

router.get("/user-all", auth(UserRole.ADMIN), dashboardControllers.totalUser);

router.get(
  "/bookings-all",
  auth(UserRole.ADMIN),
  dashboardControllers.totalBookings
);

router.get(
  "/total-bookings-user",
  auth(UserRole.USER),
  dashboardControllers.totalBookingsByUser
);

router.get(
  "/bookings-user",
  auth(UserRole.USER),
  dashboardControllers.bookingsByUser
);

router.get(
  "/total-flats-user",
  auth(UserRole.USER),
  dashboardControllers.totalFlatPostByUser
);

router.get(
  "/flats-user",
  auth(UserRole.USER),
  dashboardControllers.flatPostByUser
);

export const dashboardRoutes = router;
