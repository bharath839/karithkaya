// src/app/services/config.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: any;

  constructor(private http: HttpClient) { }

  loadConfig() {
    const timestamp = new Date().getTime();
    return this.http.get(`./assets/config.json?t=${timestamp}`)
      .toPromise()
      .then(data => {
        this.config = data;
      });
  }

  get api_url() {
    if (!this.config) {
      throw Error('Config file not loaded!');
    }
    return this.config.api_url;
  }

  get image_url() {
    if (!this.config) {
      throw Error('Config file not loaded!');
    }
    return this.config.image_url;
  }

  get rabbitmq_url() {
    if (!this.config) {
      throw Error('Config file not loaded!');
    }
    return this.config.rabbitmq_url;
  }

  get upload_img_enabled() {
    if (!this.config) {
      throw Error('Config file not loaded!');
    }
    return this.config.upload_img_enabled;
  }
}
