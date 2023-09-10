import {
  collection,
  doc,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import "firebase/firestore";
import { IAlbum } from "../types";

const firebaseConfig = {
  apiKey: "AIzaSyCdBbm2gYtpL92Zll_b6v-OWpIBG2ZBDC4",
  authDomain: "upvoter-v2.firebaseapp.com",
  projectId: "upvoter-v2",
  storageBucket: "upvoter-v2.appspot.com",
  messagingSenderId: "1064974369703",
  appId: "1:1064974369703:web:ca286e100d782052196c82",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getAlbums = async (): Promise<IAlbum[]> => {
  const querySnapshot = await getDocs(collection(db, "ALBUMS"));
  const albumsData = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    title: doc.data().title,
    band: doc.data().band,
    cover: doc.data().cover,
    picks: doc.data().picks,
    votes: doc.data().votes,
    link: doc.data().link,
    genre: doc.data().genre,
  }));
  return albumsData;
};

export const pickAlbum = async (album: IAlbum): Promise<any> => {
  console.log(album);
  const docRef = doc(db, "ALBUMS", album.id);
  await updateDoc(docRef, {
    picks: album.picks + 1,
  });
};

export const voteAlbum = async (album: IAlbum): Promise<any> => {
  const docRef = doc(db, "ALBUMS", album.id);
  await updateDoc(docRef, {
    picks: album.picks + 1,
    votes: album.votes + 1,
  });
};
