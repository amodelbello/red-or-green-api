module.exports.validObjectId = '4b14b27d3450501de43d2f98';
module.exports.validBusinessId = '5b14b27d3450501de43d2f98';
module.exports.validCategoryId = '5b199079e968472545119302';
module.exports.validRatingId = '5b1aa0ad461efe7b09d9f7ed';
module.exports.validUserId = '5b1eb192a51c029d33a1da0a';
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
  "user": "5b1b6b19e766177dd91399bc",
  "business": "5b14b30e3450501de43d2f9a",
  "category": "2b176acb1f80de5885a7e96c",
  "comments": "These are the comments of the rating"
};

module.exports.fakeRatingEdit = {
  "user": "5b1b6b19e766177dd91399bc",
  "business": "5b14b30e3450501de43d2f9a",
  "category": "2b176acb1f80de5885a7e96c",
  "comments": "These are the comments of the rating edited"
};

module.exports.fakeUser = {
	"username": "amodel2",
	"email": "amodel@lalala1.com",
	"password": "password3"
};

module.exports.fakeAdminUser = {
  "username": "adminuser",
  "email" : "adminuser@lalala.com",
  "password": "password1"
}

module.exports.fakeUserEdit = {
  "role": "default",
  "username": "testuser",
  "email": "testuser@lalala.com",
};

module.exports.fakeUserCredentials = {
  "email": "testuser@lalala.com",
  "password": "password1"
};

module.exports.fakeUserCredentialsInvalidUsername = {
  "email": "xxx11zamodelbello@lalala.com",
  "password": "password1"
};

module.exports.fakeUserCredentialsInvalidPassword = {
  "email": "testuser@lalala.com",
  "password": "no"
};

module.exports.fakeUserPayload = {
  _id: "5b1e9f045709738a31e3149d",
  email: "v2vbg115v1zavmodelbello@lalala.com",
  expiration: 1531325444,
  iat: 1528733444,
  role: "default",
  username: "v2vvb1gv511zamodelbello"
};

module.exports.fakeAdminUserPayload = {
  _id:"5b1f4efdb44bd1fe2a5dea79",
  email:"adminuser@lalala.com",
  expiration:1531370965,
  iat:1528778965,
  role:"admin",
  username:"adminuser"
};

module.exports.validJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjFlYjE5MmE1MWMwMjlkMzNhMWRhMGEiLCJlbWFpbCI6InRlc3R1c2VyQGxhbGFsYS5jb20iLCJ1c2VybmFtZSI6InRlc3R1c2VyIiwicm9sZSI6ImRlZmF1bHQiLCJleHBpcmF0aW9uIjoxNTMxMzMwODQ2LCJpYXQiOjE1Mjg3Mzg4NDZ9.FnQp8aWbj0tS7JB8hOAMWIDHu38lhYeo7TlOdD296ac';

module.exports.validAdminJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjFmNGVmZGI0NGJkMWZlMmE1ZGVhNzkiLCJlbWFpbCI6ImFkbWludXNlckBsYWxhbGEuY29tIiwidXNlcm5hbWUiOiJhZG1pbnVzZXIiLCJyb2xlIjoiYWRtaW4iLCJleHBpcmF0aW9uIjoxNTMxMzcwOTY1LCJpYXQiOjE1Mjg3Nzg5NjV9.qp4aZLcQ6SPHvijsFnWPiNJW8DUkVaUgWvgTEbkVWmg';

module.exports.invalidJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjFiNmIxOWU3NjYxNzdkZDkxMzk5YmMiLCJlbWFpbCI6IjExemFtb2RlbGJlbGxvQGxhbGFsYS5jb20iLCJ1c2VybmFtZSI6IjExemFtb2RlbGJlbGxvIiwiZXhwaXJhdGlvbiI6MTUzMTE3Mjg3NiwiaWF0IjoxNTI4NTgwODc2fQ.JXIe3WpUJHPnMofR9Qc_8DKuziWuVV7iA9klsjwM9DM';
