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

router.post('/', (req, res) => {
  const { date, weather, visibility, comment } = req.body;
  const newDiaryEntry = diaryServices.addDiaryEntry({date, weather, visibility, comment})

  res.json(newDiaryEntry);
});

export default router