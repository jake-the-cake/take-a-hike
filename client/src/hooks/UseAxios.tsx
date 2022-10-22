import axios from "axios"

export interface AxiosCallProps {
  ( value: {
    path: string,
    method: string,
    data?: any
  }) : Promise<any>
}

const baseUrl = 'http://localhost:4200'

export const UseAxios: AxiosCallProps = async ({ path, method, data }) => {
  return await axios.request({
    method: method,
    url: baseUrl + path,
    data: data
  })
  // .then( ( res: any ) => res.data ).catch(( err: any ) => {
  //   console.error( err )
  //   return err.response.data.message 
  // })
}