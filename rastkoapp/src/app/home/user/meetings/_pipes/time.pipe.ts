import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'shorttime'
})
export class TimePipe implements PipeTransform{

  transform(value: string | undefined) {
    return value?.substring(0,5);
  }

}
