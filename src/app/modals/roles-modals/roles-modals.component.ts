import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { User } from 'src/app/_models/user';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-roles-modals',
  templateUrl: './roles-modals.component.html',
  styleUrls: ['./roles-modals.component.css']
})
export class RolesModalsComponent implements OnInit {

  @Input() updatedSelectedRoles = new EventEmitter();
  user: User;
  roles: any[];

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {

  }

  updateRoles() {
    this.updatedSelectedRoles.emit(this.roles);
    this.bsModalRef.hide();
  }

}
