const prefix = () => {
    const timestamp = new Date( Date.now() )
    return `\x1b[31mServer Log || \x1b[37m${ timestamp.toDateString() } @ ${ timestamp.toLocaleTimeString()}\n**`
}

export const returnErrorOnTerminal = ( input: string ) => {
    return console.log(`${ prefix() } \x1b[35m\x1b[40m ${ input } \x1b[0m`)
}

export const returnInfoOnTerminal = ( input: string ) => {
    return console.log(`${ prefix() }\x1b[33m ${ input } \x1b[0m`)
}