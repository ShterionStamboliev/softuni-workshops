const db = require('../catdb.json');
const fs = require('fs');
const path = require('path');

class Cat {
    constructor(name, description, imageUrl, breed) {
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.breed = breed;
    }

    static save(cat) {
        db.cats.push(cat);
        const jsonData = JSON.stringify(db, null, 2);
        fs.writeFileSync(path.resolve(__dirname, '../catdb.json'), jsonData);
    }
}

module.exports = Cat;