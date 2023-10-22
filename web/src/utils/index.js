export function shortenAddress({
    address
                               }) {
    if(!address) {
        return ''
    }
    return address.substring(0, 6) + '...' + address.slice(-4)
}