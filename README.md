# Mindx edu firebase
## User guide

### Install

``` 
npm install mx-firebase
```

### Init Firebase
``` js

import mxfirebase from 'mx-firebase';

const config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
};

mxfirebase.init(config)

```

### Firebase auth
``` js
// same as firebase.auth()
mxfirebase.auth()

```

### Firestore basic
``` js
// Create / access to collection
const blogCollection = mxfirebase.collection("blogs")

// create new blog

const newBlog = {
  title: "new blog",
  description: "a blog",
  //...
}


blogCollection.create(newBlog).then( r => 
// return created blog
)

// get all blog

blogCollection.getAll().then(//...)

// get one blog

blogCollection.getOne(blogId).then(//...)

// edit a blog

editedBlog = {
  title: "edited",
  //...
}

blogCollection.update(blogId, editedBlog).then(//...)


// delete a blog

blogCollection.destroy(blogId).then(//... return success code)

```

### Firestore advance

``` js
// reference

// create new blog which have field refer to author
const authorCollection = mxfirebase.collection('authors')


const blogCollection = mxfirebase.collection("blogs")

// 

const newBlog = {
  title: "new blog",
  author: mxfirebase.referenceField('authors', authorId) // authors is collection name
}

// get blog and populate author

blogCollection.getOne(blogId, ['author']) // author is reference field in blog collection


// pagination

blogCollection.paginate(pageNumber, itemPerPage).then(
  // return total items and paginated data
)

// paginate and filter

blogCollection.paginate(pageNumber, itemPerPage, query).then(
  // return total items and paginated data
)

// populate when get many

blogCollection.paginate(pageNumber, itemPerPage, query, ['reference field you want to populate']).then(
  // return total items and paginated data
)

```

## Firebase storage

``` js
// upload multiple file to firebase storage 

mxfirebase.putFiles(files).then(
// return array of url
)

```

## Developer guide
### Develop
`index.js`: The whole lib
### Publish
- Change version in [package.json](package.json) file:
```
{
  "name": "mx-firebase",
  "version": "x.x.x",
  ...
}
```
- Build
`npm run build`

- Publish
`npm publish`