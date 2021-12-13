# Jakob Compressed Palette Text (jcpt)

## Layout

---

The first bytes of the file will be how many bits are used for each data.

The second byte will be how many characters will in the palette.

Next will be the palette. The palette is just a string encoded in UTF-16.

Last will be the data. The data does not have a predefined length. A data byte is incoded with the index for the palette
to get.

---

## Plans

I want to make the palette not encode just characters but strings and numbers.

I want to make a vscode extention for read and write for the file type.

Maybe come up with a better name.

---
