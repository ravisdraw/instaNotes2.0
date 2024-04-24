import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

import { arrayUnion } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class KeywordsService {

  keywordRef: AngularFirestoreCollection<any> | undefined;

  constructor(private firestore: AngularFirestore) { 
    this.keywordRef = this.firestore.collection<any>('keywords');
  }

  getKeywordList(): Observable<any> {
    // return this.masterRef;
    return this.firestore.collection<any>('keywords').doc('gY3F3auqnCGdaXOoldaw').valueChanges();
  }

  addValueToDataArray(valueToAdd: any) {
    this.keywordRef?.doc('gY3F3auqnCGdaXOoldaw').update({ data: arrayUnion(valueToAdd) });
  }

}
