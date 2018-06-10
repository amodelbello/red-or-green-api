module.exports.validObjectId = '4b14b27d3450501de43d2f98';
module.exports.validBusinessId = '5b14b27d3450501de43d2f98';
module.exports.validCategoryId = '5b19b39652e70a499c889123';
module.exports.validRatingId = '5b1aa0ad461efe7b09d9f7ed';
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
module.exports.fakeBusiness = {
  "name": "Tomasita's",
  "address": {
    "street": "500 S Guadalupe St",
    "street2": "Apt 4",
    "city": "Santa Fe",
    "state": "NM",
    "zip": "87501"
  },
  "rating": 4
};

module.exports.fakeBusinessEdit = {
  "name": "Tomasita's2",
  "address": {
    "street": "501 N Buadalupe St",
    "street2": "Apt 4",
    "city": "Santa Fe2",
    "state": "WA",
    "zip": "98109"
  },
  "rating": 3,
};

module.exports.fakeCategory = {
  "name": "Chile",
  "description": "This is chile."
};

module.exports.fakeCategoryEdit = {
  "name": "Chile2",
  "description": "This is chile2."
};

module.exports.fakeRating = {
  "businessId": "1b176acb1f80de5885a7e96c",
  "categoryId": "2b176acb1f80de5885a7e96c",
  "comments": "These are the comments of the rating"
}

module.exports.fakeRatingEdit = {
  "businessId": "1b176acb1f80de5885a7e96c",
  "categoryId": "2b176acb1f80de5885a7e96c",
  "comments": "These are the comments of the rating edited"
}

module.exports.fakeUser = {
	"username": "amodel2",
	"email": "amodel@lalala1.com",
	"password": "password3"
}

module.exports.fakeUserCredentials = {
  "email": "11zamodelbello@lalala.com",
  "password": "password1"
}

module.exports.fakeUserCredentialsInvalidUsername = {
  "email": "xxx11zamodelbello@lalala.com",
  "password": "no"
}

module.exports.fakeUserCredentialsInvalidPassword = {
  "email": "11zamodelbello@lalala.com",
  "password": "no"
}

module.exports.validJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjFiNmIxOWU3NjYxNzdkZDkxMzk5YmMiLCJlbWFpbCI6IjExemFtb2RlbGJlbGxvQGxhbGFsYS5jb20iLCJ1c2VybmFtZSI6IjExemFtb2RlbGJlbGxvIiwiZXhwaXJhdGlvbiI6MTUzMTE3Mjg3NiwiaWF0IjoxNTI4NTgwODc2fQ.JXIe3WpUJHPnMofR9Qc_8DKuziWuVV7iA9klsjwMbDM';

module.exports.invalidJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjFiNmIxOWU3NjYxNzdkZDkxMzk5YmMiLCJlbWFpbCI6IjExemFtb2RlbGJlbGxvQGxhbGFsYS5jb20iLCJ1c2VybmFtZSI6IjExemFtb2RlbGJlbGxvIiwiZXhwaXJhdGlvbiI6MTUzMTE3Mjg3NiwiaWF0IjoxNTI4NTgwODc2fQ.JXIe3WpUJHPnMofR9Qc_8DKuziWuVV7iA9klsjwM9DM';
