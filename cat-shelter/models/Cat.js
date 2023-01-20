const db = require('../catdb.json');
const fs = require('fs');
const path = require('path');

class Cat {
    constructor(name, description, image, breed) {
        this.name = name;
        this.description = description;
        this.image = image;
        this.breed = breed;
    }

    save() {
        this.id = db.cats[db.cats.length - 1].id + 1;
        db.cats.push(this);
        const json = JSON.stringify(db, null, 2);
        fs.writeFileSync(path.resolve(__dirname, '../catdb.json'), json);
    }
}

module.exports = Cat;