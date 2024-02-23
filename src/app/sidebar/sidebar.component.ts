import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { CanvasComponent } from "../canvas/canvas.component";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent {
  @Input() canvasComponent!: CanvasComponent;

  fractalForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.fractalForm = formBuilder.group({
      realModifier: [0],
      imaginaryModifier: [0],
      threshold: [50],
      width: [640],
      height: [480],
      pixelColor: ['#FFFFFF'],
      backgroundColor: ['#000000']
    });
  }

  generateFractal(): void {
    const formData = this.fractalForm.value;

    // CALL API WITH FORM DATA
  }

  saveFile(event: Event) {
    // const input = event.target as HTMLInputElement;
    // if(!input.files || !input.files[0]) {
    //   return;
    // }
    //
    // const file = input.files[0];
    // const reader = new FileReader();
    // reader.onload = () => {
    //   const canvas = this.canvasComponent.canvasElement.nativeElement
    //   const dataURL = canvas.toDataURL("image/png");
    //   const link = document.createElement("a");
    //   link.href = dataURL;
    //   link.download = file.name;
    //   link.click();
    // }
    //
    // reader.readAsDataURL(file);

  }
}
