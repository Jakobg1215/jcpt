import { Buffer } from 'node:buffer';

export default function writeFileFormat(text: string) {
    /** This is all the unique characters for the palette */
    const characters = [
        '', // This is used for an empty space (Not the space key)
        ...text
            .split('') // This splits the text into individual characters
            .filter((value, index, array) => array.indexOf(value) === index), // This will remove any duplicate characters
    ];

    /** How many bits to use for indexing the palette */
    const bitsPerEntry = (characters.length - 1).toString(2).length; // This converts the length of characters to binary then gets the length of the binary string

    /** The text input maped to the palette values in one binary string */
    const binaryDataString = text
        .split('') // This splits the text into individual characters
        .map(value => characters.indexOf(value).toString(2).padStart(bitsPerEntry, '0')) // This is will the index number for the character then convert it to binary
        .join(''); // This joins the string into one

    /** The binaryDataString converted to bytes */
    const data: number[] = [];
    for (let slice = 0; slice < binaryDataString.length; slice += 8)
        data.push(parseInt(binaryDataString.slice(slice, slice + 8).padStart(8, '0'), 2)); // This splits binaryDataString into bytes

    return Buffer.concat([
        Buffer.from([bitsPerEntry, characters.length - 1]), // This converts the bitsPerEntry and characters length to a buffer
        Buffer.from(characters.slice(1).join(''), 'utf16le'), // This converts the palette to a buffer
        Buffer.from(data),
    ]);
}
