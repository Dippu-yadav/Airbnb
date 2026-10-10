const { default: mongoose } = require("mongoose");
const Favourite = require("./favourite");

const homeSchema  = mongoose.Schema({
  housename : {type : String , required : true},
  price : {type : Number , required : true},
  rating : {type : Number , required : true},
  location : {type : String , required : true},
  photoUrl : String ,
  description : String ,
})

// homeSchema.pre('findOneAndDelete', async function (next) {
//   const homeid = this.getQuery()._id;
//   await Favourite.deleteMany({
//     homeid: homeid
//   });
// })

module.exports = mongoose.model('Home',homeSchema);