import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBillComponent } from './components/bill/add-bill/add-bill.component';
import { BillComponent } from './components/bill/bill.component';
import { EditBillComponent } from './components/bill/edit-bill/edit-bill.component';
import { AddClientComponent } from './components/client/add-client/add-client.component';
import { ClientComponent } from './components/client/client.component';

const routes: Routes = [
  {
    path: 'bill',
    component: BillComponent,
  },
  {
    path: 'client',
    component: ClientComponent,
  },
  {
    path: 'add-client',
    component: AddClientComponent,
  },
  {
    path: 'add-bill',
    component: AddBillComponent,
  },
  {
    path: 'edit-bill',
    component: EditBillComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
