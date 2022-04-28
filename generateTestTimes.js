function generateTestTimes(userId) {
  const data = []

  for (let i = 0; i < 50; i++) {
    const maxStartTime = new Date()
    maxStartTime.setDate(maxStartTime.getDate() - 1)
    const startTime = randomDate(new Date(2021, 1, 1), maxStartTime)

    const maxWakeUp = new Date(startTime)
    maxWakeUp.setHours(maxWakeUp.getHours() + 12)
    const wakeUp = randomDate(startTime, maxWakeUp)

    data.push(
      {
        'startTime': startTime,
        'wakeupTime': wakeUp,
        'userId': userId,
        'addDate': wakeUp,
        'id': Math.random().toString()
      }
    )
  }

  console.log(data)
}


function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}


generateTestTimes('daedf56e-21d4-44df-a7e8-a6d35a30056c')
