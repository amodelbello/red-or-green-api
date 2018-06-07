const mongoose = require('mongoose');
const businessesImporter = require('./importBusinesses');
const categoriesImporter = require('./importCategories');

const run = async () => {
  try {
    await mongoose.connection.dropDatabase()
    await businessesImporter.run();
    await categoriesImporter.run();
  } catch(e) {
    console.log(e);
  }
};

module.exports.validObjectId = '4b14b27d3450501de43d2f98';
module.exports.validBusinessId = '5b14b27d3450501de43d2f98';
module.exports.validCategoryId = '5b19b39652e70a499c889123';
module.exports.valuesThatExist = [
  'hello',
  1233,
  false,
  true,
  '',
  {},
  { "field": "value" },
  [],
  ['one', 1 ],
];
module.exports.valuesThatDontExist = [
  null,
  undefined,
];
module.exports.valuesThatAreNumbers = [
  42,
  0,
  -4,
  4.88,
  0.9,
];
module.exports.valuesThatAreNotNumbers = [
  'hello',
  false,
  true,
  '',
  {},
  { "field": "value" },
  [],
  ['one', 1 ],
];
module.exports.validAddress = () => {
  return {
    street: "500 S Guadalupe St",
    city: "Santa Fe",
    state: "NM",
    zip: "87501",
  }
};
module.exports.next = ()=>{};
module.exports.run = run;