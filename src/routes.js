import apiRouter from "@tabdigital/connect-router";
import s from "strummer";
import customerLists from "./controllers/customer";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const routes = () => {
  const router = apiRouter({
    errorHandler: (err, req, res, next) => {
      if (err) {
        console.log("Invalid payload error", err);
        res.status(400);
        res.send(err);
      }
      next();
    },
  });

  router.post({
    path: {
      name: "update-status-get-list",
      discoveryName: "venue-connect:update-status-get-list",
      path: "/v1/service-venue-connect/:accountNumber/customer-details",
    },
    validate: {
      headers: s({
        "content-type": s.enum({ values: ["application/json"] }),
      }),
      body: s({
        venueId: "number",
        active: "boolean",
      }),
    },
    handlers: [customerLists],
  });

  return router;
};

export default routes;
