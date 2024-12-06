import { Router } from "express";
import { testRouter } from "../modules/boilerModule/test.route";
import { googleRouter } from "../modules/google/google.route";

const router = Router();

const routeArray = [
  {
    path: "/test",
    route: testRouter,
  },
  {
    path: "/google",
    route: googleRouter,
  },
];

routeArray.forEach((item) => {
  router.use(item.path, item.route);
});

export const MainRouter = router;
