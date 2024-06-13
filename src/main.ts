import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { NZ_I18N, es_ES } from 'ng-zorro-antd/i18n';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';
import { PlusOutline, EditOutline, DeleteOutline } from '@ant-design/icons-angular/icons';

// Importa solo los íconos necesarios
const icons = [
  PlusOutline,
  EditOutline,
  DeleteOutline,
];

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withFetch()),
    importProvidersFrom(BrowserAnimationsModule, NzIconModule),
    { provide: NZ_I18N, useValue: es_ES },
    { provide: NZ_ICONS, useValue: icons }
  ]
});
