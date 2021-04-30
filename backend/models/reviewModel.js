const mongoose = require('mongoose');
// const bootcampModel = require('./productModel');
const reviewSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add a title for the review'],
    maxlength: 100,
  },
  text: {
    type: String,
    require: [true, 'Please add some text'],
  },

  rating: {
    type: Number,
    min: 1,
    max: 10,
    require: [true, 'Please add a rating between 1-10'],
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
});

// Prevent user from submiting more than one review per bootcamp
// reviewSchema.index({ bootcamp: 1, user: 1 }, { unique: true });

//static method to get average of rating
// reviewSchema.statics.getAverageRating = async function (bootcampId) {
//   const obj = await this.aggregate([
//     {
//       $match: { bootcamp: bootcampId },
//     },
//     {
//       $group: {
//         _id: '$bootcamp',
//         averageRating: { $avg: '$rating' },
//       },
//     },
//   ]);
//   try {
//     await this.model('Bootcamp').findByIdAndUpdate(bootcampId, {
//       averageRating: obj[0].averageRating,
//     });
//   } catch (err) {
//     console.error(err);
//   }
// };

//call getAverageRating after save
// reviewSchema.post('save', function () {
//   this.constructor.getAverageRating(this.bootcamp);
// });

//call getAverageRating before remove
// reviewSchema.pre('remove', function () {
//   this.constructor.getAverageRating(this.bootcamp);
// });
const Review = mongoose.model('Review', reviewSchema);

export default Review;
