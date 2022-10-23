export interface ResponseObjectProps {
  error?: {
    type: string,
    errorAt: string | undefined,
    message: string
  },
  value: string
}

export interface ResponseObjectValidationInputProps {
  object: ResponseObjectProps,
  input: string,
  err?: string
}

export interface ResponseObjectValidationFunctionProps {
  ( res: ResponseObjectValidationInputProps ) : ResponseObjectProps | undefined | Promise<ResponseObjectProps>
}

export interface StringValidationFunctionProps {
  ( input: string ) : Promise<ResponseObjectProps> | ResponseObjectProps
}