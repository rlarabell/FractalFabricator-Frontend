import {Component, ElementRef, ViewChild, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})

export class CanvasComponent implements OnInit {
  @ViewChild('canvasElement', { static: true }) canvasElement!: ElementRef<HTMLCanvasElement>;

  constructor(private http: HttpClient) { }

  isDragging: boolean = false;
  lastX: number = 0;
  lastY: number = 0;
  left: number = 0;
  top: number = 0;

  ngOnInit(): void {
    this.getFractalImageData(3840, 2160);
  }

  ngAfterViewInit() {
    const canvas = this.canvasElement.nativeElement;
    canvas.addEventListener('mousedown', this.startDrag.bind(this))
    canvas.addEventListener('mousemove', this.drag.bind(this));
    canvas.addEventListener('mouseup', this.endDrag.bind(this));
    canvas.addEventListener('mouseleave', this.endDrag.bind(this));
  }

  startDrag(event: MouseEvent) {
    this.isDragging = true;
    this.lastX = event.clientX;
    this.lastY = event.clientY;
  }

  drag(event: MouseEvent) {
    if(!this.isDragging) return;

    const canvas = this.canvasElement.nativeElement;
    const deltaX = event.clientX - this.lastX;
    const deltaY = event.clientY - this.lastY;
    this.lastX = event.clientX;
    this.lastY = event.clientY;

    const canvasDiv = document.getElementById('canvasDiv');
    const computedStyle = getComputedStyle(canvasDiv!);
    const availableViewportHeight = document.documentElement.clientHeight - parseInt(computedStyle.paddingTop) - parseInt(computedStyle.paddingBottom);

    let newLeft = canvas.offsetLeft + deltaX;
    let newTop = canvas.offsetTop + deltaY;

    // TODO: This is gonnna depend on the size of the sidebar so we'll need to account for that - right now this is hardcoded as 300px
    // but that might change if we allow the sidebar to be collapsed
    let minimumLeft = canvas.width - window.innerWidth + 300;
    let minimumTop = canvas.height - availableViewportHeight;

    newLeft = Math.min(newLeft, 0);
    newTop = Math.min(newTop, 0);

    newLeft = Math.max(newLeft, minimumLeft * -1);
    newTop = Math.max(newTop, minimumTop * -1);

    this.left = newLeft;
    this.top = newTop;
  }


  endDrag(event: MouseEvent) {
    this.isDragging = false;
    console.log(`Left is: ${this.left}`);
    console.log(`Top is: ${this.top}`);
  }

  drawImage(pixelData: number[], width: number, height: number): void {
    const canvas = this.canvasElement.nativeElement;

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    const imageData = ctx!.createImageData(width, height);

    for (let i = 0; i < pixelData.length; i++) {
      imageData.data[i] = pixelData[i];
    }

    ctx!.putImageData(imageData, 0, 0);
  }

  getFractalImageData(width: number, height: number) {
    this.http.get<number[]>(`https://localhost:7194/get-fractal-image?width=${width}&height=${height}`).subscribe((data: any) => {
      console.log(data);
      this.drawImage(data, width, height);
    }), (error: any) => {
      console.error('Error fetching fractal image data:', error);
    };
  }
}



