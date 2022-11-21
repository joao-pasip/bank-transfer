import { Router } from 'express';
import TokenGlobal from '../middlewares/token.global';
import ExtractController from '../controllers/extract/extract.controller';

const extractRoute = Router();

extractRoute.get('/extract', TokenGlobal.validationToken, ExtractController.getExtractGeneral)

export default extractRoute;
