import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

//Below are the operators to create cold observables
import {interval} from 'rxjs/observable/interval';
import {of} from 'rxjs/observable/of';
import {from} from 'rxjs/observable/from';
import {range} from 'rxjs/observable/range';
import {timer} from 'rxjs/observable/timer';
import {zip} from 'rxjs/observable/zip';

//Below are the operators that are applied on the values emmitted from the above observables

import {take,map,filter} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';

//Subject imports

import {Subject} from 'rxjs/Subject';


const subject= new Subject<number>();


@Injectable()



export class AppService

{

createColdObservable()
{
//creating a custom cold observable by adding the data producer inside the observable function.
//so new data is getting produced each time an instance of the observable is created

    return new Observable<number>(observer=>{
        try
        {
          observer.next(Math.random());
          observer.complete();
        }
        catch(err){
          observer.error(err);

        }
    })
}

createHotObservable()
{
var data=Math.random();
return new Observable(observer=>{

try
{
    observer.next(data);
    observer.complete();
}
catch(err)
{
    observer.error(err);
}

})

}

SubjectEmmittingData()
{
subject.next(Math.random());
}

gettingSubject():Observable<number>
{
    return subject.asObservable();
}

SubjectAsDataConsumer()
{
return new Observable<number>(observer=>{
    try
    {
        observer.next(Math.random());
        //observer.complete();
    }
    catch(err)
    {
        observer.error(err);
    }
})
}

createReplayObservable1()
{
    return new Observable<string>(observer=>{
try
{
    observer.next("A");
    observer.next("B");
    observer.next("C");
    observer.next("D");
    //observer.complete();
}
catch(err)
    {
        observer.error(err);
    }

    })
}


createIntervalObservable()
{
console.log("interval obsv service called");
//return interval(1000); Keeps returning values from 0,1,2, etc every 1sec

return interval(1000).pipe(take(5)); //Returns the first 5 values of the interval observable

//return interval(1000).pipe(take(5),map(val =>val + 10)); //map is used to perform some modifications to each of the emmitted values

//Before using map and take or any other operator on the source observable ,you need to use pipe
//We have combined map and take operators inside pipe.We are taking only the first 5 values and mapped it to val=>val+10

}

createOFObservable()
{

//return of("Apple","Orange","Mango"); //of observable returns the sequence of values entered as argument

return of({name:"A",age:25},{name:"B",age:35},{name:"C",age:45}).pipe(filter(val=>val["age"] >25 ));

//filter operator can be used to give some conditions based on which value will be emmitted.
//We are filtering based on the age property in the sequence of objects

}

createFromObservable()
{

return from([25,45,78,99]);
//converts an array,promise or an interable into an observable

}

createRangeObservable()
{

    return range(1,10);
    //emits all numbers in the specified range
}

createTimerObservable()
{

    return timer(1000,2000).pipe(take(5));
    //returns 0 after 1 sec in first argument. Then all subsequent values will be emmitted in an interval given in
    //2nd argument
}

creatingZipObservable()
{
//It combines multiple Observable sources, then combines the values emitted by all the sources into an array
return zip(from(['Hot Dog', 'Pizza', 'Hamburger']),interval(1000));
}



}
