const Log = { }

Log.debug = (...args) => {
    if (DEVELOPMENT)
        console.log(...args)
}

export default Log