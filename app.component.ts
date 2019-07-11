import { Component } from '@angular/core';
import {AppService} from './app.service';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';



const subject1=new Subject<number>();
const subject2=new Subject<[string,number]>();
const replay=new ReplaySubject<string>(3);
const behave=new BehaviorSubject<string>("Hey! I am the default value");

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
private subscription:Subscription=new Subscription();
  title = 'app';

constructor(private service:AppService,private router:Router){}

destroy()
{
this.router.navigate(['/new']);
}

  createIntervalObservable()
{
const interobsv=this.service.createIntervalObservable().subscribe(
    next=>{
        console.log(next);
    },
    err=>{
        console.log(err);
    },()=>{
      //executed once all the values are emitted.
        console.log("interval completed");
        //console.log(interobsv.closed); //This can be used to check if the observable is unsubscribed or not. false-not unsubscribed.
        this.subscription.add(interobsv);
    }
)



}

createOFObservable()
{
const ofobsv=this.service.createOFObservable().subscribe(

  next=>{
console.log(next);
  },
  err=>{
      console.log(err);
  },
  ()=>{
    //executed once all the values are emitted.
        console.log("OF completed");
        //console.log(ofobsv.closed);
         this.subscription.add(ofobsv);
  }
)



}

createFromObservable()
{
const fromobsv=this.service.createFromObservable().subscribe(
    next=>{
        console.log(next);
    },
    err=>{
        console.log(err);
    },()=>{
      //executed once all the values are emitted.
        console.log("from completed");
        //console.log(fromobsv.closed);
        this.subscription.add(fromobsv);
    }
)

}

createRangeObservable()
{
const rangeobsv=this.service.createRangeObservable().subscribe(
    next=>{
        console.log(next);
    },
    err=>{
        console.log(err);
    },()=>{
      //executed once all the values are emitted.
        console.log("range completed");
         //console.log(rangeobsv.closed);
        this.subscription.add(rangeobsv);
    }
)

}

createTimerObservable()
{
const timersubs=this.service.createTimerObservable().subscribe(
    next=>{
        console.log(next);
    },
    err=>{
        console.log(err);
    },()=>{
      //executed once all the values are emitted.
        console.log(" timer completed");
        //console.log(timersubs.closed);
       this.subscription.add(timersubs);
    }
)

}

creatingZipObservable()
{
const zipsub=subject2.subscribe(data=>
{
console.log("zipped observable:"+data[0].toUpperCase());

 this.subscription.add(zipsub);
});

const zipsub1=this.service.creatingZipObservable().subscribe(subject2);
this.subscription.add(zipsub1);
}

createColdObservable()
{
const coldobsv2=this.service.createColdObservable().subscribe(
    next=>{
        console.log(next);
    },
    err=>{
        console.log(err);
    },()=>{
      //executed once all the values are emitted.
        console.log("cold 2 completed");
        this.subscription.add(coldobsv2);
    }
)



const coldobsv1=this.service.createColdObservable().subscribe(
    next=>{
        console.log(next);
    },
    err=>{
        console.log(err);
    },()=>{
      //executed once all the values are emitted.
        console.log("cold 1 completed");
        this.subscription.add(coldobsv1);
    }
)



}

createHotObservable()
{
const hot=this.service.createHotObservable();
const hotobsv=hot.subscribe(
    next=>{
        console.log(next);
    },
    err=>{
        console.log(err);
    },()=>{
      //executed once all the values are emitted.
        console.log("hot 1 completed");
        this.subscription.add(hotobsv);
    }
)



const hotobsv1=hot.subscribe(
    next=>{
        console.log(next);
    },
    err=>{
        console.log(err);
    },()=>{
      //executed once all the values are emitted.
        console.log("hot 2 completed");
        //console.log(hotobsv1.closed);
        this.subscription.add(hotobsv1);
    }
)

}

SubjectAsDataConsumer()
{
//Subjects as data consumers
const subconsu1=subject1.subscribe(data=>
{console.log("subject1 as data consumer:"+data);
});
const subconsu2=subject1.subscribe(data=>
{console.log("subject2 as data consumer:"+data);

});

const subcon=this.service.SubjectAsDataConsumer().subscribe(subject1);

const subconsus3=subject1.subscribe(data=>
{console.log("subject3 as data consumer:"+data);
/*
This subscription wont receive the data from the subject since it has subscribed to the subject after subject
receives data from the observable.
*/

});
//console.log(subcon.closed);
this.subscription.add(subconsu1);
this.subscription.add(subconsu2);
this.subscription.add(subconsus3);
this.subscription.add(subcon);


}

createReplaySubject()
{
//Replay Subjects
const replaysub1=replay.subscribe(data=>{
  console.log("replay subject1:"+data);}); //Will receive only the last 3 emitted values that the subject has subject has subscribed to:B,C,D

const replaysub2=replay.subscribe(data=>{
  console.log("replay subject2:"+data);

});

const subrep=this.service.createReplayObservable1().subscribe(replay); //subject will receive the values A,B,C,D

const replaysub3=replay.subscribe(data=>{
  console.log("replay subject3:"+data);

});
  //Will receive only the last 3 emitted values that the subject has subject has subscribed to:B,C,D
  /*
In case of a normal subject, since the subscription to the subject is done after the subject recieves data from the observable,
this subscription would not have received any data from the subject.
Since this subject is a ReplaySubject, it keeps a buffer of the previous n values you mention when creating the
replaySubject. These n values alone are received by the subscription

The first 2 subscriptions to the subject is done before the subject subscribes to the observable.Always note that
a subject maintains an internal list of its subscriptions and then iterates the value/s it receives from the observable/
any other source over each of its internal subscriptions.
So the first 2 subscriptions receive all the values:A,B,C,D

  */


this.subscription.add(replaysub1);
this.subscription.add(replaysub2);
this.subscription.add(replaysub3);
this.subscription.add(subrep);

}

createBehaviorSubject()
{
//Behavior Subjects

const behavesub1=behave.subscribe(data=>{
  console.log("behavior subject1:"+data);}); 

const behavesub2=behave.subscribe(data=>{
  console.log("behavior subject2:"+data);

});

const subbeh=this.service.createReplayObservable1().subscribe(behave); //subject will receive the values A,B,C,D

const behavesub3=behave.subscribe(data=>{
  console.log("behavior subject3:"+data); //Will receive only D

  /**
   * this subscription is made after the subject receives data from the observable, under normal cases it will
   * not receive any value from subject.
   * Since this is a behaviorsubject, it will receive either the default value(when creating subject) OR
   * the last value emitted by the subject to its subscribers.
   * If no value emitted by the subject at all then the default value of subject will be received by the subscriber.
   * 
   */
})


this.subscription.add(behavesub1);
this.subscription.add(behavesub2);
this.subscription.add(behavesub3);
this.subscription.add(subbeh);
}

SubjectAsDataProducer()
{
//Subject as data producer
const produsub1=this.service.gettingSubject().subscribe(
  next=>{
   console.log("subject 1 as data producer:"+next);
})
const produsub2=this.service.gettingSubject().subscribe(
  next=>{
   console.log("subject 2 as data producer:"+next);
  })

this.service.SubjectEmmittingData();

this.subscription.add(produsub1);
this.subscription.add(produsub2);
}

  ngOnInit()
  {

/**
 * Important note on Subjects:
 * If the subject is producing the data(i.e calling next()) then we can subscribe to the data only as
 * long as the subject doesnt complete/errors out. Once complete() or error() method called on the subject instance/
 * subject-converted-into-observable instance you cannot reuse it to subscribe again or call next() on it.
 * 
 * Similarly,if subject is consuming data from observable(i.e observable function calling next() and subject is subscribing
 * to the returned observable instance) even in that case, once the observer.complete() is called inside the observable
 * function, the subject can no longer can subscribe to the observable's data and the subject's internal subscribers
 * too cannot subscribe to that data(since the subject itself has not received it from the observable)
 * 
 * This is the reason observer.complete() is commented out in createReplayObservable1 function in service class.
 */

  }

  ngOnDestroy()
  {

this.subscription.unsubscribe(); //unsubscribe from all subscriptions
console.log(this.subscription["_subscriptions"]);//This will be null after unsubscribe
  }
}
