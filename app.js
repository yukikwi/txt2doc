// import library
const path = require('path');
const fs = require('fs');
const txt2doc = require('./util/txt2doc')

// config path
const directoryInput = path.join(__dirname, 'input');
const directoryOutput = path.join(__dirname, 'output');

// if output folder not exist -> create it
if (!fs.existsSync(directoryOutput)){
    fs.mkdirSync(directoryOutput);
}
else{
    // clean file in directoryOutput
    fs.readdir(directoryOutput, (err, files) => {
        if (err) throw err;
    
        files.forEach(function (file) {
            fs.unlink(path.join(directoryOutput, file), err => {
                if (err) throw err;
            });
        })
    });
}

//read file in directoryInput
fs.readdir(directoryInput, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 

    //listing all files using forEach
    files.forEach(function (file) {
        // Do whatever you want to do with the file
        console.log(file); 

        fs.readFile(`${directoryInput}/${file}`, 'utf8' , (err, data) => {
            if (err) {
              console.error(err)
              return
            }
            
            //convert to doc
            txt2doc(data, `${directoryOutput}/${file.replace('.txt', '')}`)
        })
    });
});
