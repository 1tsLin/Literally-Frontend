import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../core/layout/header/header.component';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {}
