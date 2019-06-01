import firebase from "firebase";
import shortid from 'shortid';

const putFiles = (files) => {
  var ref = firebase.storage().ref();
  return Promise.all(
    Object.values(files).map(function (file) {
      return ref
        .child(`${shortid.generate()}-${file.name}`)
        .put(file)
        .then((r) => r.ref.getDownloadURL());
    }),
  );
};

const init = (config) => firebase.initializeApp(config);


const auth = () => firebase.auth()

const referenceField = (model, _id) => {
  const db = firebase.firestore();
  return db.doc(`${model}/${_id}`)
}

const collection = (collectionName) => {
  const db = firebase.firestore();
  const firebaseCollection = db.collection(collectionName);

  const getAll = async () => {
    const data = [];
    const query = await firebaseCollection.get();
    query.forEach(doc => {
      const snapshot = doc.data()
      snapshot._id = doc.id
      data.push(snapshot);
    });
    return data;
  }


  const count = async (res) => {
    const r = await res.get();
    return r.docs.length;
  }

  const paginate = async (pageNumber, perPage, query, populate = "") => {
    const data = [];
    const queryValue = [];
    let res = firebaseCollection;

    for (let key in query) {
      res = res.orderBy(key);
      queryValue.push(query[key]);
    }

    if (queryValue.length > 0) {
      res = res
        .startAt(...queryValue)
        .endAt(...queryValue)
    }

    const total = await count(res)

    res = await res
      .limit(perPage * pageNumber)
      .get();

    let i = 0;
    res.forEach(doc => {
      if (i >= (pageNumber - 1) * perPage) {
        const snapshot = doc.data();
        snapshot._id = doc.id;
        data.push(snapshot);
      }
      i += 1;
    });
    if (populate) {
      populate.map(async populatePath => {
        for (let i = 0; i < data.length; i++) {
          if (data[i][populatePath]) {
            const child = await data[i][populatePath].get()
            data[i][populatePath] = child.data();
          };
        };
      });
    }
    return { data, total }
  }

  const _get = async (_id) => {
    let data;
    await firebaseCollection.doc(_id).get().then(query => {
      data = { ...query.data(), _id: query.id }
    });
    return data
  }

  const getOne = (_id, populate = "") => {
    return new Promise(async (resolve, reject) => {
      let data = await _get(_id);
      if (populate) {
        populate.map(async populatePath => {
          if (data[populatePath]) {
            const child = await data[populatePath].get();
            data[populatePath] = child.data();
          }
        });
        resolve(data);
      }
      resolve(data);

    });
  }

  const create = (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        await firebaseCollection.doc().set(data);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }


  const update = (_id, data) => {
    return new Promise(async (resolve, reject) => {
      try {
        await firebaseCollection.doc(_id).update(data);
        const res = await getOne(_id);
        resolve(res)
      } catch (error) {
        reject(error)
      }
    })
  };


  const destroy = (_id) => {
    return new Promise(async (resolve, reject) => {
      try {
        await firebaseCollection.doc(_id).delete()
        resolve({ success: 1 })
      } catch (error) {
        reject(error)
      }
    });
  }


  const saveWithId = (_id, data) => {
    return new Promise(async (resolve, reject) => {
      try {
        await firebaseCollection.doc(_id).set(data);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }
  return {
    getAll,
    getOne,
    update,
    destroy,
    paginate,
    create,
    saveWithId,
  };
};

export {
  init,
  putFiles,
  collection,
  referenceField,
  auth
};