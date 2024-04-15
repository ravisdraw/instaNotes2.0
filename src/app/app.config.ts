import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../app/environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom([
      AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFireAuthModule,
      AngularFireDatabaseModule,
      AngularFirestoreModule
    ]),
  ],
};
