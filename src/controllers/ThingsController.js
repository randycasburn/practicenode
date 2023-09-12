const express = require('express');
const ThingsDao = require('../dao/ThingsDao');

class ThingsController {
    thingsDao = new ThingsDao()
    getRoutes() {
        const routes = express.Router();
        routes.get('/things', this.getAllThings.bind(this));
        routes.get('/things/:id', this.getThingById.bind(this));
        routes.post('/things/', this.addThing.bind(this));
        routes.put('/things/', this.updateThing.bind(this));
        routes.delete('/things/:id', this.deleteThing.bind(this));
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
        let id = req.params.id;
        if(!req.params.id || isNaN(req.params.id)) {
            res.status(400).json({error: `The id: ${req.params.id} is invalid.`});
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
        if(!Object.values(req.body).filter(t=>t.length>0).length) {
            throw new Error("Invalid thing");
        }
        try {
            const count = this.thingsDao.addThing(req.body);
            !count
                ? res.status(400).send("thing not added.")
                : res.json({rowCount: count});
        } catch(err) {
            res.status(400).json({error: err.message});
        }
    }
    updateThing(req, res){
        if(!Object.values(req.body).filter(t=>t.length>0).length) {
            throw new Error("Invalid thing");
        }
        try {
            const count = this.thingsDao.updateThing(req.body);
            !count
              ? res.status(400).send("thing not updated.")
              : res.json({rowCount: count});
        } catch(err) {
            res.status(400).json({error: err.message});
        }
    }
    deleteThing(req, res) {
        let id = req.params.id;
        if(!req.params.id || isNaN(req.params.id)) {
            res.status(400).json({error: `The id: ${req.params.id} is invalid.`});
        }
        try {
            const count = this.thingsDao.deleteThing(id);
            count
              ? res.json({rowCount: count})
              : res.status(404);
        } catch (err) {
            res.status(500).json({error: err.message});
        }
    }
}

module.exports = new ThingsController();
