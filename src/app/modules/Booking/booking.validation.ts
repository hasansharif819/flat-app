import { z } from "zod";

const bookingRequestSchema = z.object({
  body: z.object({
    flatId: z.string({
      required_error: "Flat Id  is required",
    }),
  }),
});

const updateBookingSchema = z.object({
  body: z.object({
    status: z.string({
      required_error: "status  is required",
    }),
  }),
});

export const bookingValidationSchemas = {
  bookingRequestSchema,
  updateBookingSchema,
};
