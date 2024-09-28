import { z } from "zod";

const createFlatSchema = z.object({
  body: z.object({
    squareFeet: z
      .number({
        required_error:
          "Square feet is required and must be a positive integer less than 100000",
      })
      .int()
      .min(1)
      .max(99999),
    totalBedrooms: z
      .number({
        required_error:
          "Total bedrooms is required and must be a positive integer less than or equal to 4",
      })
      .int()
      .min(1)
      .max(4),
    totalRooms: z
      .number({
        required_error:
          "Total rooms is required and must be a positive integer less than or equal to 6",
      })
      .int()
      .min(1)
      .max(6),
    amenities: z.string({
      required_error: "Amenities description is required",
    }),
    title: z.string({
      required_error: "Flat title is required",
    }),
    location: z.string({
      required_error: "Location is required",
    }),
    description: z.string({
      required_error: "Description is required",
    }),
    rent: z
      .number({
        required_error:
          "Rent amount is required and must be a positive integer",
      })
      .int()
      .min(1),
    advanceAmount: z
      .number({
        required_error:
          "Advance amount is required and must be a positive integer",
      })
      .int()
      .min(1),
  }),
});

const updateFlatSchema = z.object({
  body: z.object({
    squareFeet: z.number().int().min(1).max(99999).optional(),
    totalBedrooms: z.number().int().min(1).max(4).optional(),
    totalRooms: z.number().int().min(1).max(6).optional(),
    utilitiesDescription: z.string().optional(),
    location: z.string().optional(),
    description: z.string().optional(),
    rent: z.number().int().min(1).optional(),
    advanceAmount: z.number().int().min(1).optional(),
  }),
});

export const flatValidationSchemas = {
  createFlatSchema,
  updateFlatSchema,
};
