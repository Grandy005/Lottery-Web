let h3 = document.getElementById("doNotDisplay");

function isDuplicateElement(array) {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length; j++) {
            if (array[i] == array[j] && i != j) {
                return true;
            }
        }
    }
    return false;
}

function isInCorrectRange(array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] > 90 || array[i] < 1) {
            return false;
        }
    }
    return true;
}

function preventDuplication() {
    let userNumbers = [];
    let currentNum = 0;
    let isCorrectLength = true;
    let counter = 0;
    let duplicateFlag = false;
    let rangeFlag = false;

    for (let i = 1; i < 6; i++) {
        currentNum = parseInt(document.getElementById(`num${i}`).value);
        userNumbers.push(currentNum);
        if (isDuplicateElement(userNumbers) == true) {
            duplicateFlag = true;
            document.getElementById(`num${i}`).value = "";
            userNumbers.pop();
            i --;
        }
        else if (isInCorrectRange(userNumbers) == false) {
            rangeFlag = true;
            document.getElementById(`num${i}`).value = "";
            userNumbers.pop();
            i --;
        }
    }
    for (let i = 0; i < userNumbers.length; i++) {
        if (isNaN(userNumbers[i]) == true) {
            isCorrectLength = false;
            counter++;
        }
    }

    if (isCorrectLength == true) return userNumbers;
    else if (counter != userNumbers.length && duplicateFlag == true) {
        h3.innerHTML = "Egy számot csak egyszer adhatsz meg!";
        h3.style.display = "unset";
        h3.style.marginTop = "1em";
        document.getElementsByTagName("h3")[0].style.display = "none";
    }
    else if (counter != userNumbers.length && duplicateFlag == false && rangeFlag == false) {
        if (counter == 1) {
            h3.innerHTML = "Add meg az utolsó számot!"
        }
        else {
            h3.innerHTML = `Add meg a másik ${counter} számot!`;
        }
        h3.style.display = "unset";
        h3.style.marginTop = "1em";
        document.getElementsByTagName("h3")[0].style.display = "none";
    }
    else if (0 < counter < userNumbers.length && rangeFlag == true) {
        h3.innerHTML = "1 és 90 közötti számot adj meg!";
        h3.style.display = "unset";
        h3.style.marginTop = "1em";
        document.getElementsByTagName("h3")[0].style.display = "none";
    }
}

function getData() {

    let userNumbers = preventDuplication();

    if (isInCorrectRange(userNumbers) == true) {
        Lottery(userNumbers);
    }
}

function Lottery(userNumbers) {

    function writeData(totalMatches, randomNumbers) {
        let outNumbers = "";

        for (let i = 0; i < randomNumbers.length; i++) {
            if (i != randomNumbers.length-1) outNumbers += randomNumbers[i] + ", ";
            else outNumbers += randomNumbers[i];
        }

        document.getElementsByTagName("h3")[0].innerHTML = `Találatok száma: ${totalMatches}`;
        document.getElementsByTagName("h3")[0].style.display = "unset";
        h3.innerHTML = `A gép által sorsolt számok: ${outNumbers}`
        h3.style.display = "unset";
        h3.style.marginTop = "0px";
    }

    let randomNumbers = [];
    let randomNum = 0;
    let totalMatches = 0;

    for (let i = 0; i < 5; i++) {
        randomNum = Math.floor(Math.random() * (90 - 1) + 1);
        randomNumbers.push(randomNum);
        if (isDuplicateElement(randomNumbers) == true) {
            randomNumbers.pop();
            i--;
        }
    }

    for (let i = 0; i < userNumbers.length; i++) {
        for (let j = 0; j < userNumbers.length; j++) {
            if (userNumbers[i] == randomNumbers[j]) {
                totalMatches++;
            }
        }
    }

    writeData(totalMatches, randomNumbers);
}