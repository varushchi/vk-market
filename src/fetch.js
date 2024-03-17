async function write(){
    let jsondata;    
    const response = await fetch('https://dummyjson.com/carts/1');
    jsondata = await response.json();
    
    const fs = require('fs');
    
    
    // write JSON string to a file
    fs.writeFile('./write.json', JSON.stringify(jsondata), (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON data is saved.");
    });
}

write()