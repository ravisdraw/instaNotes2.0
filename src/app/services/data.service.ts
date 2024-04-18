import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { addDoc, collection } from 'firebase/firestore';

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

  // Fetch documents starting from a given index
  getMasterListStartingFromIndex(
    startIndex: number,
    batchSize: number
  ): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      if (this.masterRef)
        this.masterRef.ref
          .orderBy('__name__') // Order documents by their IDs (assuming IDs are auto-generated)
          .startAt(startIndex.toString()) // Convert startIndex to a string
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
