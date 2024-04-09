import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeLoadingPageComponent } from './welcome-loading-page.component';

describe('WelcomeLoadingPageComponent', () => {
  let component: WelcomeLoadingPageComponent;
  let fixture: ComponentFixture<WelcomeLoadingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WelcomeLoadingPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WelcomeLoadingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
