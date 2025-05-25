import { Router } from 'express';
import mapToolsRouter from './mapTools';
import worldgraphToolsRouter from './worldgraphTools';

const router = Router();
router.use('/maptools', mapToolsRouter);
router.use('/worldgraphtools', worldgraphToolsRouter);


export default router;