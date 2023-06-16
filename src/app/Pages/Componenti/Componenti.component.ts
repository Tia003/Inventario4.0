import { Component, OnInit } from '@angular/core';
import { Componenti } from '../Model/componenti';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';
import { MessagesService } from 'src/app/services/Messages/messages.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddComponenteComponent } from 'src/app/services/DialogAddComponente/DialogAddComponente.component';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { DialogAddFornituraComponent } from 'src/app/services/DialogAddFornitura/DialogAddFornitura.component';
import { DialogConfirmComponent } from 'src/app/services/DialogConfirm/DialogConfirm.component';

@Component({
  selector: 'app-Componenti',
  templateUrl: './Componenti.component.html',
  styleUrls: ['./Componenti.component.css']
})
export class ComponentiComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private data: DataService,
    private messages: MessagesService,
    public dialog: MatDialog
  ) { }

  showData: any
  componenti: Componenti[] = []
  componentiObj: Componenti = {
    Id: '',
    image: '',
    Nome: '',
    Descrizione: '',
    Codice: '',
    Qty: 0,
    Prezzo: 0
  }
  Indeterminate: ProgressSpinnerMode = "indeterminate"
  value: any

  ngOnInit() {
    this.getAllComponenti()
  }

  getAllComponenti() {
    this.value = true;
    this.data.getAllComponenti().subscribe(
      (res: any) => {
        this.showData = res.length == 0 ? false : true
        this.componenti = res.map((element: any) => {
          const data = element.payload.doc.data();
          data.Id = element.payload.doc.id;
          return data;
        });
        this.value = false;
      },
      (error: any) => {
        this.messages.openSnackBar("Impossibile caricare i componenti", true);
      }
    );
  }

  updateComponente(componente: any){
    //console.log('componente update: ', componente)

    const dialogUpdate = this.dialog.open(DialogAddFornituraComponent, {
      width: '450px',
      data: componente
    });

    dialogUpdate.afterClosed().subscribe((result: any) => {
      //console.log('result.data.value.Qty: ', result.data.value.Qty)
      //console.log('componente.Qty: ', componente.Qty)
      this.componentiObj.Nome = result.data.value.Nome
      this.componentiObj.Descrizione = result.data.value.Descrizione
      this.componentiObj.Codice = result.data.value.Codice
      this.componentiObj.Id = result.data.value.Id
      this.componentiObj.image = ''
      this.componentiObj.Prezzo = result.data.value.Prezzo
      this.componentiObj.Qty = result.data.value.Qty + componente.Qty
      this.data.updateComponente(this.componentiObj)
    })

    //console.log('Qty final: ', this.componentiObj.Qty )


    this.data.getAllComponenti()
  }

  deleteComponente(componente: Componenti){
    const dialogUpdate = this.dialog.open(DialogConfirmComponent, {
      width: '450px',
      data: {
        title: 'Eliminazione ' + componente.Nome,
        subtitle: 'Eliminazione della componente selezionata',
        content: 'Confermi di voler eliminare la componente selezionata?'
      }
    });

    dialogUpdate.afterClosed().subscribe((result: any) => {
      if (result) {
        this.data.deleteComponente(componente)
      }
    })
  }

  editComponente(componente: Componenti){

  }

  dialogAddComponente(){
    const dialogAdd = this.dialog.open(DialogAddComponenteComponent, {
      width: '450px'
    });

    dialogAdd.afterClosed().subscribe((result: any) => {
      this.componentiObj.Nome = result.data.value.Nome
      this.componentiObj.image = ''
      this.componentiObj.Descrizione = result.data.value.Descrizione
      this.componentiObj.Prezzo = result.data.value.Prezzo
      this.componentiObj.Qty = result.data.value.Qty
      this.componentiObj.Codice = result.data.value.Codice
      this.data.addComponente(this.componentiObj)
      this.getAllComponenti()
    });
  }

}
