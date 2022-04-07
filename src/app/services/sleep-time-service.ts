import axios from 'axios'
import {ISleepTime} from "../interfaces/isleep-time.Interface";

export async function addSleepTime(sleepTime: ISleepTime) {
  let data;
  await axios.post('sleepTimes', sleepTime).then((response) => {
    data = response.data
  })

  return data ? data as ISleepTime : null
}

export async function getUserSleepTimes(id: string, options = {}) {
  let data;
  const params = new URLSearchParams(options).toString()
  await axios.get(`sleepTimes?userId=${id}${params !== '' ? "&" + params : ''}`).then((response) => {
    data = response.data
  })

  return data ? data as ISleepTime[] : null
}
