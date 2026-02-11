import { Router } from "express";
import { createContact, deleteContact, getContacts, getSingleContact, updateContact } from "../controllers/conracts.controller";
import { validate } from "../middleware/validate";
import { createContactSchema } from "../validators/contact.validator";

const router = Router();

router.post("/", validate(createContactSchema), createContact);
router.get("/", getContacts);
router.get("/:id", getSingleContact);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);


export default router;