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


blogCollection.create(blog).then( r => 
//... return created blog
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
***TBD***

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