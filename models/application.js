var mongoose= require('mongoose');

var appSchema = mongoose.Schema({
  appName: String,
  domain: String,
  apis: [{
    ApiID: String
  }],
  date:{ type: Date, default: Date.now},
  isActive: Boolean
});

var Application = mongoose.model('Application', appSchema);

module.exports = Application;
