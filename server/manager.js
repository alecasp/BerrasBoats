const Boat = require('./model');
const mongoose = require("mongoose");

module.exports = {
    cleanDb: async () => {
        await Boat.deleteMany({});
    },
    import: () => {
        return new Promise((resolve, reject) => {
            [
                {"model": "Abukuma", "year": 1925, "price": 5088, "sail": "No", "motor": "No"},
                {"model": "Alabama", "year": 1942, "price": 35000, "sail": "No", "motor": "No"},
                {"model": "Bismarck", "year": 1940, "price": 41700, "sail": "No", "motor": "No"},
                {"model": "Biter", "year": 1942, "price": 8200, "sail": "No", "motor": "Yes"},
                {"model": "Blair", "year": 1943, "price": 1250, "sail": "No", "motor": "Yes"},
                {"model": "Cardiff", "year": 1917, "price": 4290, "sail": "No", "motor": "Yes"},
                {"model": "Card", "year": 1942, "price": 9800, "sail": "No", "motor": "Yes"},
                {"model": "Drazki", "year": 1907, "price": 97, "sail": "No", "motor": "Yes"},
                {"model": "Durban", "year": 1921, "price": 4850, "sail": "No", "motor": "Yes"},
                {"model": "Yamoto", "year": 1941, "price": 74170, "sail": "No", "motor": "Yes"},
                {"model": "Yorktown", "year": 1943, "price": 19900, "sail": "No", "motor": "Yes"},
                {"model": "Zulu", "year": 1938, "price": 2020, "sail": "Yes", "motor": "Yes"},
                {"model": "Zodiac", "year": 1944, "price": 1830, "sail": "Yes", "motor": "Yes"},
                {"model": "Kaga", "year": 1929, "price": 38200, "sail": "Yes", "motor": "Yes"},
                {"model": "Boxer", "year": 1945, "price": 30800, "sail": "Yes", "motor": "Yes"},
                {"model": "Hornet", "year": 1943, "price": 27100, "sail": "No", "motor": "Yes"},
                {"model": "Intrepid", "year": 1943, "price": 27100, "sail": "Yes", "motor": "Yes"},
                {"model": "Musashi", "year": 1941, "price": 74170, "sail": "No", "motor": "Yes"},
                {"model": "Barg", "year": 1942, "price": 2460, "sail": "No", "motor": "Yes"},
                {"model": "Rampur", "year": 1945, "price": 529, "sail": "No", "motor": "Yes"},
            ].forEach(async boat => {
                await new Boat({
                    model: boat.model,
                    year: boat.year,
                    price: boat.price,
                    sail: boat.sail === "Yes" ? true : false,
                    motor: boat.motor === "Yes" ? true : false
                }).save();
            });
            resolve();
        });
    },
    getById: async id => {
        let t = await Boat.findById(id);
        return t ? t : false;
    },
    create: async data => {
        let t = new Boat({...data});
        t = await t.save();
        return t ? t : false;
    },
    list: async keyword => {
        if (isNaN(keyword) || keyword.length === 0)
            return await Boat.find({
                model: {$regex: keyword, $options: 'i'}
            }).sort({price: 1});

        return await Boat.find({
            price: {$lte: keyword}
        }).sort({price: 1});
    },
    update: async (id, data) => {
        let t = await Boat.findByIdAndUpdate(id, {...data});
        return t ? t : false;
    },
    delete: async id => {
        let t = await Boat.findByIdAndDelete(id);
        return t ? true : false;
    }
}