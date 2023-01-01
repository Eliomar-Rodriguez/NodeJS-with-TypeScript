import diaryData from './diaries.json';
import { DiaryEntry } from "../types";

const diaries: Array<DiaryEntry> = diaryData as Array<DiaryEntry>;

export const getEntries = ()=>diaryData

export const addEntry=()=>null