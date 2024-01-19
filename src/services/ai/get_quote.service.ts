// flask apiye bağlantı
import axios from 'axios'

const base_url = 'http://127.0.0.1:5000'

export const get_quote = async (data: any) => {
  const response: any = await axios.post(`${base_url}/get_quote`, {
    data: data
  })
  return await response.data
}
