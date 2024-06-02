export function randomText(length) {
    let string = '';
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < length; i++) {
        string += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return string;
}