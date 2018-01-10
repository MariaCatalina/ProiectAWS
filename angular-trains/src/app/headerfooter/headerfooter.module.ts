import { HeaderComponent } from './header.component';
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [HeaderComponent],
    providers: [
    ],

    exports: [
        HeaderComponent
    ],

})

export class HeaderFooterModule { }