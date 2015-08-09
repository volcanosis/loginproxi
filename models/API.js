var mongoose= require('mongoose');

var APISchema = mongoose.Schema({
  ApiName: String,
  baseUrl: String,
  Methods: {
    publicMethods: [{
      method: String
    }],
    privateMethods: [{
      method: String
    }]
  },
  date:{ type: Date, default: Date.now},
  isActive: Boolean
});

var API = mongoose.model('API', APISchema);

module.exports = API;
