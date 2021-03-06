import { Component, Input, OnInit } from '@angular/core';
import { NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { NgxGalleryImage } from '@kolkov/ngx-gallery/lib/ngx-gallery-image';
import { NgxGalleryOptions } from '@kolkov/ngx-gallery/lib/ngx-gallery-options';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';
import { PresenceService } from 'src/app/_services/presence.service';

@Component({
  selector: 'app-member-cards',
  templateUrl: './member-cards.component.html',
  styleUrls: ['./member-cards.component.css']
})
export class MemberCardsComponent implements OnInit {



  @Input() member: Member
  constructor(private memberService: MembersService, private toaster: ToastrService , public presence :PresenceService) { }

  ngOnInit(): void {

  }


  addLike(member: Member) {
    this.memberService.addLike(member).subscribe(() => {
      this.toaster.success("you have liked " + member.knownAs);
    })
  }


}
