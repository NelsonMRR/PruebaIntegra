import { Component, OnInit } from '@angular/core';
import { ChartData, ChartDataset, ChartOptions } from 'chart.js';
import { Subject, takeUntil } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  resultadoHistorial = <any>[];
  titulo = ""; subtitulo = "";
  destructor: Subject<boolean> = new Subject<boolean>();

  //Inyectamos el dataservice
  constructor(private dataService: DataService) { }

  datos = []; arrayDatosConversiones =<any>[]; fechaActua =<any>[]; 
  nombresMonedas =<any>[];datosNum:Array<number> = []; labelsData:Array<any> = []; labels =<any>[];
  //Meotodo para obtener los datos de la api
  obtenerDatos(){ 
    this.datosNum=[];
    let respuesta=[]; let datosConver: never[]; this.labelsData = [];
    let fecha : never[]; this.arrayDatosConversiones = []; this.nombresMonedas =[];
    //Servicio que obtiene la solicitud get y la almacena en data
    this.dataService.EnviarGetSolicitud().pipe(takeUntil(this.destructor)).subscribe(data=>{
      //Convierte los datos a JSON que vienen de tipo text
      respuesta = JSON.parse(data);console.log(respuesta);
      this.titulo = respuesta['chartName'];
      this.subtitulo = respuesta['disclaimer']; 
      fecha= respuesta['time'];
      datosConver = respuesta['bpi'];
      //For in para convertir el json en array 
      for (const key in datosConver) {
        if (Object.prototype.hasOwnProperty.call(datosConver, key)) {
          this.arrayDatosConversiones.push(datosConver[key]);
          this.nombresMonedas.push(key);
        }
      }
      // For in para sacar las fechas del json
      for (const key in fecha) {
        if (Object.prototype.hasOwnProperty.call(fecha, key)) {
          this.fechaActua.push(fecha[key]);
        }
      }
      for (let i = 0; i < this.arrayDatosConversiones.length; i++) {
        this.labelsData.push({
          label:  this.arrayDatosConversiones[i]['code'],
          data: [this.arrayDatosConversiones[i]['rate_float']]
        });
        this.datosNum.push(this.arrayDatosConversiones[i]['rate_float'])
        //Agrego datos al array de historial.
        this.resultadoHistorial.push({
          codigo:  this.arrayDatosConversiones[i]['code'],
          tasa: [this.arrayDatosConversiones[i]['rate_float']],
          fecha: this.fechaActua[0]
        });
      }
      //Se resta 1 hora a la que se recibe actualmente 
      let fechaA = new Date(this.fechaActua[0]);
      let milisegundos = fechaA.getTime();
      fechaA.setTime(milisegundos - (1 * 3600000));
      
      //Se recorre el array para hacer una comparacion de fecha a con b y
      //asi eleminar los items que no esten en el rango de 1 hora.
      for (let i = 0; i < this.resultadoHistorial.length; i++) {
        let fechaB = new Date(this.resultadoHistorial[i]['fecha']);
        if(fechaB < fechaA){
          let aRemover = i;
          this.resultadoHistorial = this.resultadoHistorial.filter(function(item: number) {
              return item !== aRemover
          });
        }
      }
      console.log(this.datosNum);
    }); 
  }

  //graficas
  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Grafica de conversión',
      },
    },
  };
  salesData: ChartData<any> = {
    labels: ['USD', 'GBP', 'EUR'],
        datasets: [{
            label: 'Dollar',
            data: [this.datosNum],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
  };
  public nombres: string = "MF1";
  labeldat: ChartDataset[] = [
    { data: [85], label: 'usd' },
    { data: [85], label: 'usd' },
  ];

  ngOnInit(): void {
    this.obtenerDatos();
    //Ejecuta el llamado a obtener datos cada 30s
    setInterval(() => {
      this.obtenerDatos(); 
    }, 30000);
  }

  ngOnDestroy() {
    this.destructor.next(true);
    // Destruir la petición si falla.
    this.destructor.unsubscribe();
  }

}

