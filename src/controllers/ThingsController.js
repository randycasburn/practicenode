const express = require('express');
const ThingsDao = require('../dao/ThingsDao');

class ThingsController {
    thingsDao = new ThingsDao()
    getRoutes() {
        const routes = express.Router();
        routes.get('/things', this.getAllThings.bind(this));
        routes.get('/things/:id', this.getThingById.bind(this));
        return routes;
    }

    getAllThings(req, res) {
        try {
            const things = this.thingsDao.getAllThings();
            things.length
                ? res.json(things)
                : res.status(400);
        } catch (err) {
            res.status(500);
        }
    }
    getThingById(req, res) {
        if(isNaN(req.params.id)) {
            res.status(400).json({error: `The ${id} is invalid.`});
        }
        try {
            const thing = this.thingsDao.getThingById(id);
            thing 
                ? res.json(thing)
                : res.status(404);
        } catch (err) {
            res.status(500).json({error: err});
        }
    }

    addThing(req, res){
        if(Object.values(req.body).filter(t=>t).length) {
            throw new Error("Invalid thing")
        }
        res.json({rowCount: 1});
    }
    updateThing(req, res){
        res.json({rowCount: 1});
    }
    deleteThing(req, res) {
        res.json({rowCount: 1});
    }
}

module.exports = new ThingsController();