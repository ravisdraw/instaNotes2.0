import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { getCountFromServer, getFirestore, collection, query, where } from 'firebase/firestore';


@Injectable({
  providedIn: 'root',
})
export class DataService {
  masterRef: AngularFirestoreCollection<any> | undefined;
  
  constructor(private firestore: AngularFirestore) {
    // this.masterRef = db.list(this.dbPath);
    this.masterRef = this.firestore.collection<any>('master');
  }

  getMasterList() {
    // return this.masterRef;
    return this.masterRef?.doc('z9bHsNjPxAp2XNfUzaWD');
  }

  deletePost(collectionId:string) {
    this.masterRef?.doc(collectionId).delete();
  }

  async getMasterListCount() {
    const firestore = getFirestore();
    const userCollectionReference = collection(firestore, "master");
    const userCollectionSnapshot = await getCountFromServer(userCollectionReference);
    return userCollectionSnapshot.data().count;
  }

  async getCategoryCount(category:string) {
    const firestore = getFirestore();
    const userCollectionReference = collection(firestore, "master");
    const categoryQuery = query(userCollectionReference, where('category', '==', category));
    const userCollectionSnapshot = await getCountFromServer(categoryQuery);
    return userCollectionSnapshot.data().count;
  }

  // Fetch documents starting from a given index
  getMasterListStartingFromIndex(
    startIndex: string,
    batchSize: number
  ): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      if (this.masterRef)
        this.masterRef.ref
          .orderBy('__name__') // Order documents by their IDs (assuming IDs are auto-generated)
          .startAfter(startIndex) // Convert startIndex to a string
          .limit(batchSize) // Limit the batch size
          .get()
          .then((querySnapshot) => {
            const documents = querySnapshot.docs.map((doc) => {
              return { collectionId: doc.id, ...doc.data() }; // Include document ID along with data
            });
            observer.next(documents);
            observer.complete();
          })
          .catch((error) => {
            observer.error(error);
          });
    });
  }

  getMasterListByCategory(startIndex: string, batchSize: number, category: string): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      if (this.masterRef) {
        this.masterRef.ref
          .where('category', '==', category) // Filter documents where the 'category' field equals the provided category
          .orderBy('__name__') // Order documents by their IDs (assuming IDs are auto-generated)
          .startAfter(startIndex) // Convert startIndex to a string
          .limit(batchSize) // Limit the batch size
          .get()
          .then((querySnapshot) => {
            const documents = querySnapshot.docs.map((doc) => {
              return { collectionId: doc.id, ...doc.data() }; // Include document ID along with data
            });
            observer.next(documents);
            observer.complete();
          })
          .catch((error) => {
            observer.error(error);
          });
      }
    });
  }
  

  updateDocument(documentId: string, newData: any): Promise<void> {
    const documentRef = this.firestore.collection('master').doc(documentId);
    return documentRef.update(newData);
  }

  addData() : void {
    let temp = {
      category: '',
      collectionId: '',
      id: '',
      keywords: '',
      note: '',
      title: 'Add post',
      url: '',
    };
    const res = this.masterRef?.add(temp);
    res?.then((res)=> {
      console.log(res);
    }).catch((error)=> {
      console.log(error)
    })
  }

  async addNewCollection(): Promise<any> {
    let temp = {
      category: '',
      collectionId: '',
      id: '',
      keywords: '',
      note: '',
      title: 'Add post',
      url: '',
    };
    // Add a new document with a generated id.
    const res = await this.firestore.collection('master').add(temp);
    console.log(res.id);
    return res.id;
  }

}
