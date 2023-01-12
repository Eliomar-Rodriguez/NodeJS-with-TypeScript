import diaryData from './diaries.json';
import { DiaryEntry, NewDiaryEntry, NonSensitiveInfoDiaryEntry, ResponseRequest } from "../types";

const diaries: DiaryEntry[] = diaryData as DiaryEntry[];

export const getEntries = (): DiaryEntry[] => diaries;

export const findById = (id: number): NonSensitiveInfoDiaryEntry | undefined => {
    const entry = diaries.find(d => d.id === id)

    return entry;
}
export const getEntriesWithoutSensitiveInfo = (): NonSensitiveInfoDiaryEntry[] => {
    return diaries.map(({ id, date, weather, visibility }) => {
        return {
            id,
            date,
            weather,
            visibility
        }
    })
};

export const addDiaryEntry = (newDiaryEntry: NewDiaryEntry): DiaryEntry => {
    const newDiary = {
        id: Math.max(...diaries.map(d => d.id)) + 1,
        ...newDiaryEntry
    }
    diaries.push(newDiary);
    return newDiary;
};

export const deleteDiaryEntry = (id: number): ResponseRequest => {
    let deletedStatus = false
    diaries.some((diary, diaryIndex) => {
        if (diary.id === id) {
            diaries.splice(diaryIndex, 1);
            deletedStatus = true;
            return;
        }
    })
    return {
        code: !deletedStatus ? 404 : 200,
        status: deletedStatus,
        message: !deletedStatus ? 'Record not found' : 'Record deleted successfuly'
    }
}

export const updateDiaryEntry = (updatedDiaryEntry: DiaryEntry): ResponseRequest => {
    let updatedStatus = false;
    diaries.map(diary => {
        if (diary.id === updatedDiaryEntry.id) {
            diary.date = updatedDiaryEntry.date
            diary.visibility = updatedDiaryEntry.visibility
            diary.weather = updatedDiaryEntry.weather
            diary.comment = updatedDiaryEntry.comment
            updatedStatus = true;
        }
    })
    return {
        code: !updatedStatus ? 404 : 200,
        status: updatedStatus,
        message: !updatedStatus ? 'Record not found' : 'Record updated successfuly'
    }
}