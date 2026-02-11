import exppress from "express";
import { rateLimitter } from "./src/middleware/raterLimitter.ts";
import AuthRoutes from "./src/routes/user.routes.ts";
import ContactRoutes from "./src/routes/contacts.routes.ts";
import { authenticate } from "./src/middleware/authenticate.ts";
import cors from "cors";

const app = exppress();
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(exppress.json());
app.use(rateLimitter);
app.use("/auth", AuthRoutes);
app.use("/contacts", authenticate, ContactRoutes);




export default app;