export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy'
export type visibility = 'great' | 'good' | 'ok' | 'poor'

export interface DiaryEntry {
  id: number,
  date: string,
  weather: Weather,
  visibility: visibility,
  comment: string
}

  