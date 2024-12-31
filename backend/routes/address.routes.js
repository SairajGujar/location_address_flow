import { Router } from "express";
const router = new Router();

router.post('/save', saveAddress);
router.delete('/delete/:id', deleteAddress);
router.put('/edit/:id', editAddress);