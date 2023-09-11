const express = require('express');
const thingsController = require('../src/controllers/ThingsController');

class ThingsApplication {
    static main(){
        const app = express();
        const router = express.Router();
        app.use(express.json());
        app.use(thingsController.getRoutes());
        app.use('/', router);
        app.listen(3000, ()=>console.log('3000'));
    }
}

ThingsApplication.main();

