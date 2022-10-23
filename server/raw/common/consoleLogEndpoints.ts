import { returnInfoOnTerminal } from "./consoleLogTerminal"

export const consoleLogEndpoints = ( object: object, endpoint: string, method: string ) => {
  const PREFIX = `'${ endpoint }' accessed via ${ method.toUpperCase() } request.\n\x1b[0m-- `
  if ( Object.keys( object ).length === 0 ) {
    returnInfoOnTerminal( `${ PREFIX }No data received.` )
  }
  else returnInfoOnTerminal( `${ PREFIX }data: ${ JSON.stringify( object ) }`)
}