/**import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ToastrModule } from 'ngx-toastr';

import { FeedService } from '../../services/feed.service';
import { FeedListPage } from './feed-list.page';

describe('FeedListPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        InfiniteScrollModule,
        ToastrModule.forRoot(),
      ],
      declarations: [FeedListPage],
      providers: [FeedService],
    }).compileComponents();
  });

  it('should create the feed list page', () => {
    const fixture = TestBed.createComponent(FeedListPage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should fill feeds after call ngOnInit method', () => {
    TestBed.overrideComponent(FeedListPage, {
      set: { providers: [{ provide: FeedService, useClass: MockFeedService }] },
    });
    const feedListPage = TestBed.createComponent(FeedListPage);
    const instance = feedListPage.componentInstance;
    instance.ngOnInit();
    expect(instance.page).toEqual(1);
    expect(instance.pageCount).toEqual(1);
    expect(instance.total).toEqual(1);
    expect(instance.feeds.length).toEqual(1);
  });

  it('should fill main_title and main_link attribute to feeds', () => {
    TestBed.overrideComponent(FeedListPage, {
      set: { providers: [{ provide: FeedService, useClass: MockFeedService }] },
    });
    const feedListPage = TestBed.createComponent(FeedListPage);
    const instance = feedListPage.componentInstance;
    instance.ngOnInit();
    expect(instance.feeds.length).toEqual(1);
    const feed = instance.feeds[0];
    expect(feed.main_link).toEqual('http://bit.ly/2A0wK6O');
    expect(feed.main_title.trim()).toEqual(
      'EPA open #data under threat by #Trump'
    );
  });
});

@Injectable()
export class MockFeedService extends FeedService {
  getFeeds(page: number): {
    data: any[];
    page: number;
    total: number;
    pageCount: number;
  } {
    return {
      page: page,
      pageCount: 1,
      total: 1,
      data: [
        {
          last_modification_ts: 1511330402,
          creation_ts: 1511311742,
          deleted_ts: null,
          etc: {
            reactions: {
              LIKE: {
                count: 1,
                users: [['820532348061526', 'Paul Bell']],
              },
            },
            author_name: 'PageFreezer',
            likes: [['820532348061526', 'Paul Bell']],
            created_time: 1511311742,
            message:
              'EPA open #data under threat by #Trump __PF:fe12548f53efc58030e4',
            story: null,
            from: {
              picture: {
                data: {
                  url: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/12795552_1104941502878026_2211372332743011468_n.png?oh=ac5bf87ff149cdf56a60a0b510648e53&oe=5A9CF830',
                  width: 50,
                  height: 50,
                },
              },
              cover: {
                source:
                  'https://scontent.xx.fbcdn.net/v/t1.0-0/p320x320/22366488_1624902320881939_2205380514175623995_n.png?oh=a1dd34d112f7aa0e00c61bceed4ed70a&oe=5A9048A2',
                cover_id: '1624902320881939',
                offset_x: 0,
                offset_y: 11,
              },
              name: 'PageFreezer',
            },
            privacy: {
              value: 'EVERYONE',
              deny: '',
              friends: '',
              description: 'Public',
              allow: '',
            },
            type: 'link',
            status_type: 'shared_story',
            picture: '__PF:303103af71aa4dee9f3b',
            description:
              'The United States Environmental Protection Agency (EPA) was created in 1970 to protect human health and the environment through creation and enforcement of',
            full_picture: '__PF:303103af71aa4dee9f3b',
            link: '__PF:fe12548f53efc58030e4',
            name: 'EPA open data under threat by Trump',
            updated_time: 1511330402,
            caption: 'greenprophet.com',
            author_id: '432721040100079',
          },
          changed_history: {
            '1511330402': ['misc'],
          },
          signature:
            'Lorem ipsum — dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation',
          urls_mapping: {
            '__PF:303103af71aa4dee9f3b': {
              target_url:
                'https://external.xx.fbcdn.net/safe_image.php?d=AQAY0aRlnjs7cJnP&w=130&h=130&url=https%3A%2F%2Fwww.greenprophet.com%2Fwp-content%2Fuploads%2FTrumpEPAairquality.jpg&cfs=1&_nc_hash=AQAS6lSey8HRo-mg',
              internal_url: '',
              source_url:
                'https://external.xx.fbcdn.net/safe_image.php?d=AQAY0aRlnjs7cJnP&w=130&h=130&url=https%3A%2F%2Fwww.greenprophet.com%2Fwp-content%2Fuploads%2FTrumpEPAairquality.jpg&cfs=1&_nc_hash=AQAS6lSey8HRo-mg',
              downloaded: true,
              state: 3,
              location: 'cdn1',
              path: 'accounts_res/I_sm_social/P_9zSLdhy7jsYHujEcC9XjS/FB/AFBpg_19S178GKt9_OoWMhbsQvIN/__PF:303103af71aa4dee9f3b',
              type: '',
            },
            '__PF:fe12548f53efc58030e4': {
              target_url:
                'https://www.greenprophet.com/2017/03/epa-open-data-under-threat-by-trump/?utm_content=63196929&utm_medium=social&utm_source=facebook',
              internal_url: '',
              source_url: 'http://bit.ly/2A0wK6O',
              downloaded: false,
              state: -3,
              location: 'cdn1',
              path: 'accounts_res/I_sm_social/P_9zSLdhy7jsYHujEcC9XjS/FB/AFBpg_19S178GKt9_OoWMhbsQvIN/__PF:fe12548f53efc58030e4',
              type: '',
            },
          },
          activity_type: 'ST',
        },
      ],
    };
  }
}
**/
