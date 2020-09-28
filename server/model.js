const mongoose = require("mongoose");

const options = {
    toObject: {virtuals: true},
    toJSON: {virtuals: true}
};

const schema = new mongoose.Schema(
    {
        model: { type: String, require: true },
        year: { type: Number, require: true, default: 2020 },
        price: { type: Number, require: true, default: 0 },
        sail: { type: Boolean, require: true, default: 0 },
        motor: { type: Boolean, require: true, default: 0 },
    },
    options
);

const Boat = mongoose.model("Boat", schema);

module.exports = Boat;
