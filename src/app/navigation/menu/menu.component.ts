import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  @Input()
  title: string;

  public isCollapsed: boolean;

  constructor() {
    this.isCollapsed = true;
  }

  getBgColor(): string {
    let bgColor: string = "";
    switch (environment.name) {
      case "Production": bgColor = "environmentColorProd"; break;
      case "Staging": bgColor = "environmentColorStage"; break;
      case "Development": bgColor = "environmentColorDev"; break;
    }
    return bgColor;
  }

  nav: Nav[] = [
    {
      link: '/home',
      Name: 'Home',
      exact: true,
      admin: false
    },
    {
      link: '/gender/list',
      Name: 'Genders',
      exact: false,
      admin: false
    },
    {
      link: '/author/list',
      Name: 'Authors',
      exact: false,
      admin: false
    },
    {
      link: '/book/list',
      Name: 'Books',
      exact: true,
      admin: false
    }
  ];
}

interface Nav {
  link: string,
  Name: string,
  exact: boolean,
  admin: boolean
}