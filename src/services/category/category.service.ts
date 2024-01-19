import { makeRequest } from '../base/base'

const fetchCategories = async () => await makeRequest<any>('Categories/GetList', 'GET')

export default {
  fetchCategories
}
