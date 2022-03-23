import {Pipe, PipeTransform} from '@angular/core'

@Pipe({
    name:'stringTransform'
})
export class StringTransformPipe implements PipeTransform{
    transform(value: any):string {
            if(value.length > 15){
                let newVal = value.slice(0, 14)
                return newVal + '...'

            }
            return value
    }
}