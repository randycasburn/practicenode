const fs = require('fs');

class ThingsDao {
    things = [];
    constructor(){
        this.things = JSON.parse(fs.readFileSync(__dirname + '/mockthings.json', 'utf-8'));
    }
    getAllThings() {
        return this.things;
    }
    getThingById(id){
        return this.things.find(t=>t.id == id);
    }
    addThing(thing){
        let hasOne = this.getThingById(thing.id);
        if(hasOne) {
            throw new Error(`Thing with id: ${thing.id} already exists!`)
        }
        this.things.push(thing);
        return 1;
    }
    updateThing(thing){
        let hasOne = this.getThingById(thing.id);
        if(!hasOne) {
            throw new Error(`Thing with id: ${thing.id} doesn't exist to update!`)
        }
        let index = this.things.findLastIndex(t=>t.id==hasOne.id);
        this.things[index] = thing;
        return 1;
    }

    deleteThing(id) {
        let index = this.things.findLastIndex(t=>t.id==id);
        if(index < 0) {
            throw new Error(`Thing with id: ${id} doesn't exist to delete!`)
        }
        this.things[index] = null;
        this.things = this.things.filter(t=>t!==null);
        return 1;
    }

}
module.exports = ThingsDao;
