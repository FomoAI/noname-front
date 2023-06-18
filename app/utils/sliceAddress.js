
export default (address) => {
    const addressLength = address.length

    return `${address.slice(0,5)}....${address.slice(addressLength - 5,addressLength)}`
}