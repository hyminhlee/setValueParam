const fs = require('fs')
const clipboardy = require('clipboardy');

const toTitleCase = (phrase) => {
    return phrase
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

fs.readFile('./input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err)
        return
    }

    let prefix = "cntrLotVO.set";
    let suffix = "(\"\");";

    console.log("Good luck!!!")
    var reSentence = /(\[[^\]]*\]|{([^}]*)})/gm;
    var matchObject;
    var result = new Set();
    while (matchObject = reSentence.exec(data))
        result.add(matchObject[1] || matchObject[2]);


    var file = fs.createWriteStream('output.txt');
    file.on('error', function(err) { /* error handling */ });
    var result2 = new Set();
    var clipboard = "";
    result.forEach(element => {
        element = element.replace("[", "");
        element = element.replace("]", "");
        element = element.replace("{", "");
        element = element.replace("}", "");
        element = element.replace(/_/g, " ");
        element = toTitleCase(element);
        element = element.replace(/ /g, "");
        result2.add(element);
    });

    result2.forEach(element => {
        file.write(prefix + element + suffix + '\n');
        clipboard = clipboard + prefix + element + suffix + '\n';
    })

    clipboardy.writeSync(clipboard);
    file.end();
})