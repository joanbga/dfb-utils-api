import {Router} from 'express';
import mapToolsRouter from './mapTools';

const router = Router();
router.use('/maptools', mapToolsRouter);

export default router;