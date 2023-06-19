import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Componenti } from '../Pages/Model/componenti';
import { AngularFireStorage } from '@angular/fire/compat/storage'
import { Image } from '../Pages/Model/image';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private AFS: AngularFirestore,
    private AS: AngularFireStorage
  ) { }


  //COMPONENTI ACTIONS

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


  //IMAGE ACTIONS

  saveMetaDataOfFile(fileObj: Image){
    const fileMeta = {
      id: '',
      name: fileObj.name,
      url: fileObj.url,
      size: fileObj.size
    }

    fileMeta.id = this.AFS.createId();

    this.AFS.collection('/Upload').add(fileMeta)
  }

  getAllFiles(){
    this.AFS.collection('/Uploads').snapshotChanges();
  }

  deleteFile(fileMeta: Image){
    this.AFS.collection('/Uploads').doc(fileMeta.id).delete();
    this.AS.ref('/Uploads/' + fileMeta.name).delete();
  }


}
