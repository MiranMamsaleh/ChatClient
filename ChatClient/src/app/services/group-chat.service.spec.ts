import { TestBed, inject } from '@angular/core/testing';

import { GroupChatService } from './group-chat.service';

describe('GroupChatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroupChatService]
    });
  });

  it('should be created', inject([GroupChatService], (service: GroupChatService) => {
    expect(service).toBeTruthy();
  }));
});
