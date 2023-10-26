import { Component, OnInit } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getAuth } from 'firebase/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private store: AngularFirestore){}
  loadedFeature = 'recipe';

  ngOnInit() {
    const app = initializeApp(environment.firebaseConfig);
    const auth = getAuth(app);
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
