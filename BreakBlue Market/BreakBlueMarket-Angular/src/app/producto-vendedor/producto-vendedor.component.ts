import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-producto-vendedor',
  templateUrl: './producto-vendedor.component.html',
  styleUrls: ['./producto-vendedor.component.css']
})
export class ProductoVendedorComponent implements OnInit {

  constructor(private _router: Router, private httpClient: HttpClient) { }

  public selectedFile: File | any;
  receivedImageData: any;
  base64Data: any;
  convertedImage: any;
  message: string | any;
  imageName: any;
  url : any;

  ngOnInit(): void {
  }



  onselectFile(e:any){
    console.log(e);
    this.selectedFile = e.target.files[0];

    if(this.selectedFile){
      var reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = (event:any) =>  {
        this.url = this.selectedFile.result;
      }
    }
  }

  onUpload(){
    const uploadData = new FormData();
    uploadData.append("myFile", this.selectedFile, this.selectedFile.name);

  
    this.httpClient.post('http://127.0.0.1:5000/imagen/1', uploadData)
    .subscribe(
      (   res: any) => {console.log(res);
                        this.receivedImageData = res;
                        this.base64Data = this.receivedImageData.pic;
                        this.convertedImage = 'data:image/jpeg;base64,' + this.base64Data;},
      (   err: any) => console.log("Error ocurrido durante el guardado")
              );
  }

  mensajeBorrar(){
    Swal.fire({
      title: '¿Esás seguro/a?',
      text: "¡No podrás revertir los cambios!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar'
    }).then((result) => {
      if (result.isConfirmed) {
         this._router.navigate(["/homeVendedor"]);
        Swal.fire(
          '¡Producto borrado!',
          'Acción realizada con éxito',
          'success'
        )
      } else if (result.dismiss == Swal.DismissReason.cancel){
        this._router.navigate(["/informacionVendedor"])
      } 
    })
  }

  mensajeCerrar(){
    Swal.fire({
      text: "¿Está seguro de querer cerrar la sesión?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.isConfirmed) {
         this._router.navigate(["/"]);
        Swal.fire(
          'Sesión Cerrada',
          'Acción realizada con éxito',
          'success'
        )
      } else if (result.dismiss == Swal.DismissReason.cancel){
         this._router.navigate(["/informacionVendedor"])
      } 
    })
  }
  //Gets called when the user clicks on retieve image button to get the image from back end
  getImage() {
  //Make a call to Sprinf Boot to get the Image Bytes.
  // this.httpClient.get('http://127.0.0.1:5000/imagen/1')
  //   .subscribe(
  //       (res: any) => {
  //         this.retrieveResonse = res;
  //         this.base64Data = this.retrieveResonse.picByte;
  //         this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
  //         this.url = this.retrievedImage;
  //     }
  //   );
  }
}
