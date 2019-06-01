# Mindx edu firebase
## User guide

### install

```
npm install mx-firebase
```

### init mx-firebase
```

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

<!-- ### Producer
```
import { RbProducer } from 'tk-queue';
// Initialize
const rbUserProducer = RbProducer('user');

// Send message when connection is ready
rbUserProducer('upsert', <new user data>);
```

### Consumer
```
// Initialize
import { RbConsumer } from 'tk-queue';

const rbUserConsumer = new RbConsumer(
  "tk-lm",
  "user",
  (data) => new Promise((resolve, reject) => {
    // Upsert user here
    resolve();
  }),
  (_id) => new Promise((resolve, reject) => {
    // Delete user here
    resolve();
  })

// Listen when connection is ready
rbUserConsumer.listen();
``` -->

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