const fs = require('fs');

class ThingsDao {
    things = [];
    constructor(){
        this.things = JSON.parse(fs.readFileSync('src/dao/mockthings.json', 'utf-8'));
    }
    getAllThings() {
        return this.things;
    }
    getThingById(id){
        return this.things.filter(t=>t.id == id)[0] || undefined;
    }
}
module.exports = ThingsDao;