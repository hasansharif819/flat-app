import express from "express";
import auth from "../../middlewares/auth";
import { flatControllers } from "./flat.controller";
import validateRequest from "../../middlewares/validateRequest";
import { flatValidationSchemas } from "./flat.validation";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.get("/flats", flatControllers.getFlats);

router.get("/flats/:flatId", flatControllers.getSingleFlat);

router.get(
  "/my-flats",
  auth(UserRole.USER, UserRole.ADMIN),
  flatControllers.getMyFlats
);

router.post(
  "/flats",
  auth(UserRole.USER, UserRole.ADMIN),
  validateRequest(flatValidationSchemas.createFlatSchema),
  flatControllers.createFlat
);

router.put(
  "/flats/:flatId",
  auth(UserRole.ADMIN, UserRole.USER),
  validateRequest(flatValidationSchemas.updateFlatSchema),
  flatControllers.updateFlat
);

router.delete(
  "/flats/:flatId",
  auth(UserRole.ADMIN, UserRole.USER),
  flatControllers.deleteFlat
);

export const flatRoutes = router;
