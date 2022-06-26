import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss']
})
export class EmptyStateComponent implements OnInit {

  deptOrPde

  constructor() {
    let checkIfSuperAdmin = localStorage.getItem('isSuperAdmin');

    let roles = checkIfSuperAdmin == 'true' ? 'super-admin' : 'pde-admin'

    let checkIfPdeOrDept = (roles == 'super-admin') ? 'PDE' : 'Department'

    this.deptOrPde = checkIfPdeOrDept
   }


  ngOnInit(): void {
  }

}
