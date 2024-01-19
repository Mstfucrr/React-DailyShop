export const emailRegex = () => {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
}

export const passwordRegex = () => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/
}
