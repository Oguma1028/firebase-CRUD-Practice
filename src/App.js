import React from "react";
import { db } from "./firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

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

  return (
    <>
      <div>
        {users.map((user) => (
          <div key={user.id}>{user.name}</div>
        ))}
      </div>
    </>
  );
}

export default App;
