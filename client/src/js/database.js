import { openDB } from 'idb';

const initdb = async () =>

  // new DB created called 'jate' which is being held in version 1 of the database
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }

      // creating a new object store for the data - this is what is being stored in the IndexedDB storage - very similar to local storage
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (id, content) => {
  console.log('PUT to the databoase.')

  try {
    // creating a variable and connecting to the correct database and version we are wanting to use
    const contentDB = await openDB('jate', 1);

    // transaction and data privelage
    const tx = contentDB.transaction('jate', 'readwrite');

    // open the object store
    const store = tx.objectStore('jate');

    // pass the parameters into the DB
    const request = store.put({id: id, content: content})

    // confirm
    const result = await request;
    console.log(`Data save to the DB!`, result)

  } catch (err) {
    console.error('putDb not implemented');
  }

};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {

  try {

    // basically the same syntax as above and just changing over to a readonly
        // creating a variable and connecting to the correct database and version we are wanting to use
        const contentDB = await openDB('jate', 1);
        const tx = contentDB.transaction('jate', 'readonly');
        const store = tx.objectStore('jate');
        const request = store.getAll()
        const result = await request;
        console.log(`GetDB Result:`, result)

  } catch (err) {
    console.error('getDb not implemented');
  }

} 

initdb();
