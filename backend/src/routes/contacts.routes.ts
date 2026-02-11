import { Router } from "express";
import { createContact, deleteContact, getContacts, getSingleContact, updateContact } from "../controllers/conracts.controller.ts";
import { validate } from "../middleware/validate.ts";
import { createContactSchema } from "../validators/contact.validator.ts";

const router = Router();

router.post("/", validate(createContactSchema), createContact);
router.get("/", getContacts);
router.get("/:id", getSingleContact);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);


export default router;