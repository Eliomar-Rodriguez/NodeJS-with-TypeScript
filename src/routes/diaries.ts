import express from "express";
import toNewDiaryEntry from "../utils";
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
  const newDiaryEntry = toNewDiaryEntry(req.body);
  const newDiaryEntryCreated = diaryServices.addDiaryEntry(newDiaryEntry)

  res.json(newDiaryEntryCreated);
});

router.put('/', (req, res) => {
  const response = diaryServices.updateDiaryEntry(req.body);
  res.json(response)
})

router.delete('/:id', (req, res) => {
  let response = diaryServices.deleteDiaryEntry(+req.params.id);
  res.json(response)
})

export default router