
function keyPrepare(key) {
    key = key.toUpperCase().split("");
    key = key.filter(ch => {
        return ch !== " "
    })
    key = key.map(ch=> {
        return ch ==="J" ? ch = "I": ch;
    })
    key = key.filter((ch,index) => {
        return ch !== key[index + 1] ? ch :"";
    }).join("")

    return [...new Set(key)]
} 


let cipherKey = keyPrepare("yomna");
function matrixPrepare(cipherKey) {
    let matrix = new Array();
    let count = 0;
    let alpha = ["A","B","C","D","E","F","G","H","I","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
    for (let i = 0; i < 5; i++) {
        matrix[i] = [];
    }
    let alphabet = [];
    alphabet = cipherKey.split("");
    for (let i =  0 , j = cipherKey.length  ; i <  25; i++) {
        if(alphabet.indexOf(alpha[i]) === -1) alphabet.push(alpha[i])
    }

    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5 ; j++) {
            matrix[i][j] = alphabet[count++];
        }
    }
    return matrix
}

function wordPrepare(word) {
    word = word.split("").filter(ch => {
        return ch !== " "
    }).join("")
    word = word.toUpperCase()
    let result = [];
    for (let i = 0; i < word.length; i++) {
        if(word[i] === word[i+1]) {
        result.push(word[i],"X")
        }
        else result.push(word[i])
    }
    if(result.length % 2 !== 0) result.push("X")
    return result
}


function playfairEncryption(word,key) {
    let plainText = wordPrepare(word);
    let playfairKey = keyPrepare(key).join("");
    let cipherMatrix = matrixPrepare(playfairKey)
    console.log(cipherMatrix)
    let firstRow ,firstCol ,secondRow,secondCol;
    let cipherText = [];
    for (let i = 0; i < plainText.length; i+=2) {
        for (let j = 0; j < 5; j++) {
            for (let k = 0; k < 5; k++) {
                if(plainText[i] == cipherMatrix[j][k]){
                    firstRow = j
                    firstCol = k
                }
                else if(plainText[i+1] == cipherMatrix[j][k]) {
                    secondRow = j
                    secondCol = k
                }
            }
        }
        if(firstRow === secondRow ) {
            cipherText.push(cipherMatrix[firstRow][(firstCol + 1) % 5])
            cipherText.push(cipherMatrix[firstRow][(secondCol + 1) % 5])
        }
        else if(firstCol === secondCol ) {
            cipherText.push(cipherMatrix[(firstRow + 1) % 5][firstCol])
            cipherText.push(cipherMatrix[(secondRow + 1) % 5][secondCol])
        }
        else {
            cipherText.push(cipherMatrix[firstRow][secondCol])
            cipherText.push(cipherMatrix[secondRow][firstCol])
        }
    }
    let cipherTextTwo = cipherText.map(ch => {
        return ch === "I" ? ch = "J" : ch ;
    })
    console.log(cipherTextTwo.join(""))
    return cipherText.join("")
}

function playfairDecryption(cipherText,key) {
    let playfairKey = keyPrepare(key).join("");
    let cipherMatrix = matrixPrepare(playfairKey)
    let firstRow ,firstCol ,secondRow,secondCol;
    let plainText = [];
    console.log(cipherMatrix)
    for (let i = 0; i < cipherText.length; i+=2) {
        for (let j = 0; j < 5; j++) {
            for (let k = 0; k < 5; k++) {
                if(cipherText[i] == cipherMatrix[j][k]){
                    firstRow = j
                    firstCol = k
                }
                else if(cipherText[i+1] == cipherMatrix[j][k]) {
                    secondRow = j
                    secondCol = k
                }
            }
        }
        if(firstRow === secondRow ) {
            firstCol =  firstCol == 0 ? 5 : firstCol;
            secondCol = secondCol == 0 ? 5 : secondCol;
            plainText.push(cipherMatrix[firstRow][(firstCol - 1) % 5])
            plainText.push(cipherMatrix[firstRow][(secondCol - 1) % 5])
        }
        else if(firstCol === secondCol ) {
            plainText.push(cipherMatrix[(firstRow - 1) % 5][firstCol])
            plainText.push(cipherMatrix[(secondRow - 1) % 5][secondCol])
        }
        else {
            plainText.push(cipherMatrix[firstRow][secondCol])
            plainText.push(cipherMatrix[secondRow][firstCol])
        }
    }
    console.log(plainText)
    plainText = plainText.filter(ch =>{
        return ch !== "X"
    })
    let plainTextTwo = plainText.map(ch => {
        return ch === "I" ? ch = "J" : ch ;
    })
    console.log(plainTextTwo.join("").toLowerCase())
    return plainText.join("").toLowerCase()
}
