import type { Buffer } from 'node:buffer';

export default function readFileFormat(data: Buffer) {
    /** This is used for the offset of reading the data */
    let offset = 0; // It should always start a 0

    /** This is used to add offset for reading the data */
    const addOffset = (size: number, reveal = false) => (reveal ? (offset += size) : (offset += size) - size);

    /** How many bits to use for indexing the palette */
    const bitsPerEntry = data.readUInt8(addOffset(1)); // This will read the first byte of the data

    /** This is how long the palette is in bytes */
    const paletteLength = data.readUInt8(addOffset(1)) * 2; // It is times 2 because each entry takes 2 bytes

    /** This is used to map a number to a character */
    const palette = [
        '', // This is used for an empty space (Not the space key)
        ...data
            .slice(offset, addOffset(paletteLength, true)) // This will get all of the characters bytes
            .toString('utf16le') // This will convert the bytes to characters
            .split(''), // This converts the string into an array
    ];

    /** The text data converted to binary */
    const charactersBinary = data
        .slice(offset) // This will get all the remaning bytes
        .toJSON() // This is probably not a good way but its a way
        .data.map(value => value.toString(2).padStart(8, '0')) // This will make sure every byte has 8 bits
        .join(''); // This just combines the string for parseing

    /** The charactersBinary splited by the bitsPerEntry  */
    const characterNumbers: string[] = [];
    for (let charBits = 0; charBits < charactersBinary.length; charBits += bitsPerEntry)
        characterNumbers.push(charactersBinary.slice(charBits, charBits + bitsPerEntry)); // Splits it by the bitsPerEntry

    return characterNumbers.map(value => palette.at(parseInt(value, 2)) ?? '').join('');
}
