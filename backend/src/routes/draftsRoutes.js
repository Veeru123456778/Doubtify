import express from 'express';
import { UpdateDraft, addDraft,getDrafts ,removeDraft} from '../controllers/draftController.js';

const draftRouter = express.Router();

draftRouter.post('/add',addDraft);
draftRouter.get('/get/:userId',getDrafts);
draftRouter.delete('/remove/:draftId',removeDraft);
draftRouter.post('/update',UpdateDraft);

export default draftRouter;