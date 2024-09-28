import express from "express";
import auth from "../../middlewares/auth";
import { bookingControllers } from "./booking.controller";
import { bookingValidationSchemas } from "./booking.validation";
import validateRequest from "../../middlewares/validateRequest";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.get(
  "/booking-requests",
  auth(UserRole.ADMIN),
  bookingControllers.getBooking
);

router.get(
  "/my-bookings",
  auth(UserRole.ADMIN, UserRole.USER),
  bookingControllers.getMyBookings
);

router.post(
  "/booking-applications",
  auth(UserRole.ADMIN, UserRole.USER),
  validateRequest(bookingValidationSchemas.bookingRequestSchema),
  bookingControllers.bookingRequest
);

router.put(
  "/booking-requests/:bookingId",
  auth(UserRole.ADMIN),
  validateRequest(bookingValidationSchemas.updateBookingSchema),
  bookingControllers.updateBooking
);

export const bookingRoutes = router;
