import { Router } from "express";
import { getProductBySlug, listProducts } from "../controllers/productsController";
import { asyncHandler } from "../middleware/asyncHandler";
import { validateSlug } from "../middleware/validateSlug";

const router = Router();

router.get("/", asyncHandler(listProducts));
router.get("/:slug", validateSlug, asyncHandler(getProductBySlug));

export default router;