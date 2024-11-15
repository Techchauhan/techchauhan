import React from 'react';
import { FiClipboard } from 'react-icons/fi'; // Clipboard icon from react-icons

const copyToClipboard = (code) => {
  navigator.clipboard.writeText(code).then(
    () => alert('Code copied to clipboard!'),
    (err) => alert('Failed to copy code: ', err)
  );
};

export default function NextJsFirestoreDatabase() {
  const addDocumentCode = `
import { getFirestore, collection, addDoc } from 'firebase/firestore'; 

const db = getFirestore();

const addDocument = async () => {
  try {
    const docRef = await addDoc(collection(db, 'users'), {
      name: 'John Doe',
      email: 'john.doe@example.com',
      age: 30,
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};
  `;

  const getDocumentCode = `
import { getFirestore, doc, getDoc } from 'firebase/firestore'; 

const db = getFirestore();

const getDocument = async (docId) => {
  try {
    const docRef = doc(db, 'users', docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
    } else {
      console.log('No such document!');
    }
  } catch (e) {
    console.error('Error getting document: ', e);
  }
};
  `;

  const updateDocumentCode = `
import { getFirestore, doc, updateDoc } from 'firebase/firestore'; 

const db = getFirestore();

const updateDocument = async (docId) => {
  try {
    const docRef = doc(db, 'users', docId);
    await updateDoc(docRef, {
      age: 31, // Update age
    });
    console.log('Document updated');
  } catch (e) {
    console.error('Error updating document: ', e);
  }
};
  `;

  const deleteDocumentCode = `
import { getFirestore, doc, deleteDoc } from 'firebase/firestore'; 

const db = getFirestore();

const deleteDocument = async (docId) => {
  try {
    const docRef = doc(db, 'users', docId);
    await deleteDoc(docRef);
    console.log('Document deleted');
  } catch (e) {
    console.error('Error deleting document: ', e);
  }
};
  `;

  const queryDocumentsCode = `
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore'; 

const db = getFirestore();

const queryDocuments = async () => {
  try {
    const q = query(collection(db, 'users'), where('age', '>=', 30));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data());
    });
  } catch (e) {
    console.error('Error querying documents: ', e);
  }
};
  `;

  return (
    <div>
      <h1 className='text-4xl'>Next.js Firestore Database Operations</h1>

      <div className="mt-6">
        <h2 className='text-2xl'>Add Document</h2>
        <div className="relative bg-black text-white p-4 rounded-lg">
          <FiClipboard 
            className="absolute top-2 right-2 cursor-pointer text-lg"
            onClick={() => copyToClipboard(addDocumentCode)} 
          />
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}><code>{addDocumentCode}</code></pre>
        </div>
      </div>

      <div className="mt-6">
        <h2 className='text-2xl'>Get Document</h2>
        <div className="relative bg-black text-white p-4 rounded-lg">
          <FiClipboard 
            className="absolute top-2 right-2 cursor-pointer text-lg"
            onClick={() => copyToClipboard(getDocumentCode)} 
          />
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}><code>{getDocumentCode}</code></pre>
        </div>
      </div>

      <div className="mt-6">
        <h2 className='text-2xl'>Update Document</h2>
        <div className="relative bg-black text-white p-4 rounded-lg">
          <FiClipboard 
            className="absolute top-2 right-2 cursor-pointer text-lg"
            onClick={() => copyToClipboard(updateDocumentCode)} 
          />
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}><code>{updateDocumentCode}</code></pre>
        </div>
      </div>

      <div className="mt-6">
        <h2 className='text-2xl'>Delete Document</h2>
        <div className="relative bg-black text-white p-4 rounded-lg">
          <FiClipboard 
            className="absolute top-2 right-2 cursor-pointer text-lg"
            onClick={() => copyToClipboard(deleteDocumentCode)} 
          />
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}><code>{deleteDocumentCode}</code></pre>
        </div>
      </div>

      <div className="mt-6">
        <h2 className='text-2xl'>Query Documents</h2>
        <div className="relative bg-black text-white p-4 rounded-lg">
          <FiClipboard 
            className="absolute top-2 right-2 cursor-pointer text-lg"
            onClick={() => copyToClipboard(queryDocumentsCode)} 
          />
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}><code>{queryDocumentsCode}</code></pre>
        </div>
      </div>
    </div>
  );
}
