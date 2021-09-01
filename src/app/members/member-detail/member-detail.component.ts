import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryImage } from '@kolkov/ngx-gallery';
import { NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { Member } from 'src/app/_models/member';
import { NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { MembersService } from 'src/app/_services/members.service';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { MessageService } from 'src/app/_services/message.service';
import { Message } from 'src/app/_models/message';
import { PresenceService } from 'src/app/_services/presence.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {

  @ViewChild('memberTabs', { static: true }) memberTabs: TabsetComponent;


  member: Member;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  activeTab: TabDirective;

  messages: Message[] = [];

  constructor(private route: ActivatedRoute, private messageService: MessageService, public presence: PresenceService) { }

  ngOnInit(): void {

    this.route.data.subscribe(data => {
      this.member = data.member
    });

    this.route.queryParams.subscribe(params => {
      params.tab ? this.selectTab(params.tab) : this.selectTab(0);
    })



    this.galleryOptions = [
      {
        width: "500px",
        height: "500px",
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false

      }
    ];

    this.galleryImages = this.getImages();


  }

  // loadMember() {
  //   this.memberService.getMember(this.route.snapshot.paramMap.get('username')).subscribe(
  //     member => {

  //       this.member = member;

  //     }
  //   )

  // }


  getImages(): NgxGalleryImage[] {
    const imageUrls = [];
    for (let photo of this.member.photos) {
      imageUrls.push({
        small: photo?.url,
        medium: photo?.url,
        big: photo?.url
      })
    }
    return imageUrls
  }


  loadMessages() {
    this.messageService.getMessageThread(this.member.username || this.member.userName).subscribe(
      messages => {
        this.messages = messages;
      }
    )
  }

  selectTab(tabId: number) {

    this.memberTabs.tabs[tabId].active = true;

  }

  onTabActivited(data: TabDirective) {
    this.activeTab = data;
    if (this.activeTab.heading === "Messages" && this.messages.length === 0) {

      this.loadMessages();


    }
  }

}
