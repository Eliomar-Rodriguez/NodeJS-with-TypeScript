import express from "express";
import * as diaryServices from '../services/diaryService';
const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diaryServices.getEntriesWithoutSensitiveInfo())
})

router.get('/:id', (req, res) => {
  let ERROR_CODE = 404;
  const diary = diaryServices.findById(+req.params.id)
  return (diary !== null)
    ? res.send(diary)
    : res.sendStatus(ERROR_CODE);
})

router.post('/', (_req, res) => {
  res.send('Saving a diary')
});

export default router