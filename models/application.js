var mongoose = require( 'mongoose' );

var appSchema = mongoose.Schema({
  AppName : String,
  Domain : String,
  date : { type : Date, default : Date.now },
  IsActive : Boolean,
  PrivateKey : String,
  PublicKey : String
});

var Application = mongoose.model('Application', appSchema);

module.exports = Application;
