const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    path: {
      type: String,
    },
  },
  { timestamps: true }
);

// Compiling the schema into a model
// module.exports = mongoose.model('patientInfo', schema);
module.exports = mongoose.model("image", schema);
