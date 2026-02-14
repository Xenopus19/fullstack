import axios from 'axios'
import type { DiaryEntry, NewDiaryEntry } from '../types'

const baseUrl: string = 'http://localhost:3000/api/diaries'

const getAll = () => {
    return axios.get<DiaryEntry[]>(baseUrl).then(response => response.data)   
}

const addNew = (newDiary: NewDiaryEntry) => {
    return axios.post<DiaryEntry>(baseUrl, newDiary).then(response => response.data)
}

export default {getAll, addNew}