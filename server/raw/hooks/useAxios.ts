import axios from 'axios'

// Types
interface RequestProps {
  method: string,
  url: string,
  data: any,
  config: any
}

// Variables
const baseURL = 'http://localhost:5500'

// Public requests
export const usePublicRequest: ( args: RequestProps ) => Promise<any> = async ({ method, url, data = null, config = null }) => {
  const response = await axios({
    method,
    url: `${ baseURL }${ url }`,
    data: data
  })
  return response
}