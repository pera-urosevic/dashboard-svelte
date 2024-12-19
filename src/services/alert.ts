export const alertError = (error: string) => {
  alert(error)
}

export const alertServerError = async (res: Response) => {
  const { error } = await res.json()
  alert(`${res.status}: ${error ?? res.statusText}`)
}
