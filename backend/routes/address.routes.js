import { Router } from "express";
import { deleteAddress, editAddress, getAddresses, saveAddress } from "../controllers/address.controller.js";

const router = new Router();

router.post('/save', saveAddress);
router.delete('/delete/:id', deleteAddress);
router.put('/edit/:id', editAddress);
router.get('/', getAddresses)

export default router;