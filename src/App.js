import React from "react";
import { db } from "./firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

import { useState, useEffect } from "react";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const userCollectionRef = collection(db, "users");
    getDocs(userCollectionRef).then((querySnapShot) => {
      setUsers(
        querySnapShot.docs.map((docs) => ({ ...docs.data(), id: docs.id }))
      );
    });
  }, []);

  const userDocRef = doc(db, "users", "H4Tjx8FaXpG8rIz3eVtc");
  getDoc(userDocRef).then((docSnapShot) => {
    if (docSnapShot.exists()) {
      console.log(docSnapShot.data(), "これはあるよ");
    } else {
      console.log("これはないよ");
    }
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email } = event.target.elements;
    console.log(name.value, email.value);

    const collectionRef = collection(db, "users");
    const docRef = await addDoc(collectionRef, {
      name: name.value,
      email: email.value,
      timestamp: serverTimestamp(),
    });
    console.log(docRef);
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>名前</label>
            <input name="name" type="text" placeholder="名前" />
          </div>
          <div>
            <label>メールアドレス</label>
            <input name="email" type="email" placeholder="メールアドレス" />
          </div>
          <button>送信</button>
        </form>
      </div>
      <h1>ユーザー一覧</h1>
      <div>
        {users.map((user) => (
          <div key={user.id}>{user.name}</div>
        ))}
      </div>
    </>
  );
}

export default App;
