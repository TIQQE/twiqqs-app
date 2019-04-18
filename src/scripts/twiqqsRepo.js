export const getTwiqqs = async () => {
  const response = await fetch('https://3882ls4880.execute-api.eu-west-1.amazonaws.com/test/twiqqs/something')
  const data = await response.json()
  return data
}

export const getTopics = async () => {
  const response = await fetch('https://3882ls4880.execute-api.eu-west-1.amazonaws.com/test/topics')
  const data = await response.json()
  return data
}
