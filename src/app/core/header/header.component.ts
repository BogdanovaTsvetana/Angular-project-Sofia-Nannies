import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { MessageBusService } from '../message-bus.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  currentUser$: Observable<any> = this.authService.currentUser$;
  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;
  message: any;
  subscription: Subscription;
  
  constructor(
    public authService: AuthService, 
    private router: Router, 
    private messageBusService: MessageBusService,) { }

  ngOnInit(): void {
    this.subscription = this.messageBusService.message$.subscribe(m => {
      this.message = m;

      if(this.message){
        setTimeout(() =>{
          this.messageBusService.clearMessage()
        }, 3000)
      }
     
   })
  }

  logoutHandler(): void {

    this.authService.logout$().subscribe({
      next: args => {
        console.log(args);
      },
      complete: () => {
        this.router.navigate(['nannies']);
        this.messageBusService.notifyForMessage({text: `Successfully logged out`, type: 'success'})
      },
      error: (err) => {
        console.log(err.message);
      }
    });

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
