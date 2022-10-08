export const returnErrorOnTerminal = ( input: string ) => {
    return console.log(`\x1b[35m\x1b[46m -- ${ input } -- \x1b[0m`)
}