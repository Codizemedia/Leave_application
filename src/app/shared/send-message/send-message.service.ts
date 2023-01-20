import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sms } from 'src/app/models/sms.model';

@Injectable({
  providedIn: 'root'
})
export class SendMessageService {

  constructor(private http: HttpClient) { }

  config = {
    headers: new HttpHeaders({
      "Accept": "application/json",
      "apikey": "B56ZCKXU4001MOCD1WTWG3QDBRUQR542TF815PE7"
    })
  }

  sendMessage(message: any){
    const url = "http://sms.herndevs.com/index.php/api/v1/sms/send";
    const headers = {
      "Accept": "application/json",
      "apikey": "B56ZCKXU4001MOCD1WTWG3QDBRUQR542TF815PE7",
    }
    const res = this.http.post(url, message, this.config);
    res.subscribe((response)=>{
      console.log("see reponse", response);
    })
  }
}
