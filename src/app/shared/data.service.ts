import { Injectable } from '@angular/core';
import { AngularFirestore, combineChange } from '@angular/fire/compat/firestore';
import { Componenti } from '../Pages/Model/componenti';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private AFS: AngularFirestore) { }

  addComponente(componente: Componenti){
    componente.Id = this.AFS.createId()
    return this.AFS.collection('/Componenti').add(componente)
  }

  getAllComponenti(){
    ////console.log('getAll: ', this.AFS.collection('/Componenti').snapshotChanges())
    return this.AFS.collection('/Componenti').snapshotChanges()
  }

  deleteComponente(componente: Componenti){
    this.AFS.doc('/Componenti/' + componente.Id).delete()
  }

  updateComponente(componente: Componenti) {
    //console.log('componente change: ', componente)
    const componenteRef = this.AFS.doc('/Componenti/' + componente.Id);
    const updatedComponente = { ...componente }; // Create a copy of the component attributes

    delete (updatedComponente as any).Id; // Remove the 'Id' property from the document to be updated

    componenteRef.update(updatedComponente)
      .then(() => {
        ////console.log('Componente aggiornata con successo');
      })
      .catch((error) => {
        //console.log('Errore durante l\'aggiornamento della componente', error);
      });
  }




}
