import { Router } from "express";
import {
  getProductsController,
  getProductController,
  postProductController,
  putProductController,
  deleteProductController,
  generateMockProductsController,
  getProductsFromUserController,
} from "../../controllers/productsControllers.js";
import { authorization } from "../../utils/auth.js";
import { passportCall } from "../../utils/passport.js";
import ErrorHandler from "../../services/errors/middlewares/index.js";

const ProductRouter = Router();

//Get mock products
ProductRouter.get("/mockingproducts", generateMockProductsController);

//Get products
ProductRouter.get(
  "/",
  passportCall("jwt"),
  authorization("admin"),
  getProductsController
);

//Get products from Premium User
ProductRouter.get(
  "/:uid",
  passportCall("jwt"),
  authorization(["admin","premium"]),
  getProductsFromUserController
);

//Get product
ProductRouter.get(
  "/:pid",
  passportCall("jwt"),
  authorization("admin"),
  getProductController
);

//Post product
ProductRouter.post(
  "/",
  passportCall("jwt"),
  authorization(["admin", "premium"]),
  postProductController
);

//Put product
ProductRouter.put(
  "/:pid",
  passportCall("jwt"),
  authorization(["admin", "premium"]),
  putProductController
);

//Delete product
ProductRouter.delete(
  "/:pid",
  passportCall("jwt"),
  authorization(["admin", "premium"]),
  deleteProductController
);

ProductRouter.use(ErrorHandler);

export { ProductRouter };
