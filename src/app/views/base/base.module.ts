import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule }  from '@angular/forms';
// CoreUI Modules
import {
  AccordionModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonModule,
  CardModule,
  CarouselModule,
  CollapseModule,
  DropdownModule,
  FormModule,
  GridModule,
  ListGroupModule,
  NavModule,
  PaginationModule,
  PlaceholderModule,
  PopoverModule,
  ProgressModule,
  SharedModule,
  SpinnerModule,
  TableModule,
  TabsModule,
  TooltipModule,
  UtilitiesModule
} from '@coreui/angular';

import { IconModule } from '@coreui/icons-angular';

// utils
import { DocsComponentsModule } from '@docs-components/docs-components.module';

// views
import { DatabaseComponent } from './database/database.component';
import { TablesComponent } from './tables/tables.component';

// Components Routing
import { BaseRoutingModule } from './base-routing.module';
import { FonctionsComponent } from './functions/fonctions.component';
import { AddfonctionComponent } from './addfunction/addfonction.component';
import { EditfonctionComponent } from './editfunction/editfonction.component';
import { FilterComponent } from './filter/filter.component';
import { HistoriqueComponent } from './history/historique.component';


@NgModule({
  imports: [
    CommonModule,
    BaseRoutingModule,
    AccordionModule,
    BadgeModule,
    BreadcrumbModule,
    ButtonModule,
    CardModule,
    CollapseModule,
    GridModule,
    UtilitiesModule,
    SharedModule,
    ListGroupModule,
    FormsModule,
    IconModule,
    ListGroupModule,
    PlaceholderModule,
    ProgressModule,
    SpinnerModule,
    TabsModule,
    NavModule,
    TooltipModule,
    CarouselModule,
    FormModule,
    ReactiveFormsModule,
    DropdownModule,
    PaginationModule,
    PopoverModule,
    TableModule,
    DocsComponentsModule
  ],
  declarations: [
    DatabaseComponent,
    TablesComponent,
    FonctionsComponent,
    AddfonctionComponent,
    EditfonctionComponent,
    FilterComponent,
    HistoriqueComponent
  ],
})
export class BaseModule {}
