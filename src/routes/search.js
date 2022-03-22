import { Router } from "express";
import { isAuthenticated } from "../middleware/auth.js";
import SearchControllers from "../controllers/search.js";

const routerSearch = Router();

routerSearch.use(isAuthenticated);
routerSearch.get("", SearchControllers.pesquisar);

export default routerSearch;
