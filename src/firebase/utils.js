import { initializeApp } from "firebase/app";
import { get, ref, getDatabase, set, push } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDJSGMvO31sBO1R9A_EcNiuugi2tyEY260",
  authDomain: "grooper-3a040.firebaseapp.com",
  databaseURL: "https://grooper-3a040-default-rtdb.firebaseio.com",
  projectId: "grooper-3a040",
  storageBucket: "grooper-3a040.appspot.com",
  messagingSenderId: "19203214784",
  appId: "1:19203214784:web:059187517ca5f406944c25",
  measurementId: "G-E60B2NHQNY",
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

const getData = async (path) => {
  return await get(ref(database, path));
};

const setData = async (path, data) => {
  return await set(ref(database, path), data);
};

const pushData = async (path, data) => {
  return await push(ref(database, path), data);
};

export { getData, setData, pushData };
