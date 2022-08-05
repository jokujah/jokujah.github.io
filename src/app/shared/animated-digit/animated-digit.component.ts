import {
  Component,
  ElementRef,
  Input,
  AfterViewInit,
  ViewChild,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { NumberSuffix } from "src/app/utils/helpers";

@Component({
  selector: "animated-digit",
  templateUrl: "animated-digit.component.html",
  styleUrls: ["animated-digit.component.scss"]
})
export class AnimatedDigitComponent implements AfterViewInit, OnChanges {
  @Input() duration: number;
  @Input() digit: number;
  @Input() steps: number;
  @ViewChild("animatedDigit", {static: true}) animatedDigit: ElementRef;


  animateCount() {
    if (!this.duration) {
      this.duration = 1000;
    }

    if (typeof this.digit === "number") {
      this.counterFunc(this.digit, this.duration, this.animatedDigit);
    }
  }


  counterFunc(endValue, durationMs, element) {
    if (!this.steps) {
      this.steps = 10;
    }

    let isDone = false

    const stepCount = Math.abs(durationMs / this.steps);
    const valueIncrement = (endValue - 0) / stepCount;

    let currentValue = 0;

    function step() {

      element.nativeElement.textContent = NumberSuffix(Math.abs(Math.floor(currentValue)),2);

      
         currentValue = currentValue + valueIncrement

        if (currentValue < endValue){
          window.requestAnimationFrame(step)
        };
        if (currentValue == endValue){
          window.requestAnimationFrame(step)
          isDone = true
        }
        if (currentValue > endValue){
          currentValue = endValue
          window.requestAnimationFrame(step)
          isDone = true
        }
      
    }

    if (!isDone) {
      step()
    }
  }

  ngAfterViewInit() {
    if (this.digit) {
      this.animateCount();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["digit"]) {
      this.animateCount();
    }
  }
}
