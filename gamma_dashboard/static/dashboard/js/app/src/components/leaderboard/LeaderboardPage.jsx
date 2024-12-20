import React from 'react';

import LeaderboardTable from './LeaderboardTable';

import { gammaApi } from '../../api/ApiRequests';
import { addPositionInCompetitors, addPositionInTop10 } from '../../utility/utils';
import LogoDropdown from '../LogoDropdown';

import '../../styles/app/leaderboard/page.scss';

class LeaderboardPage extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      top10: [],
      competitors: [],
      rank: null,
      userUid: null,
      urlProfileImage: '',
      systemStatuses: [],
    };
  }

  componentDidMount() {
    gammaApi.leaderboard.getInfo((data) => {
      this.setState({
        top10: data.top10 || [],
        competitors: data.competitors || [],
        rank: data.rank || null,
        userUid: data.user_uid || null,
        urlProfileImage: data.url_profile_image || null,
        systemStatuses: data.system_statuses || [],
      });
    });
  }

  getLeaderboardTableProps(state) {
    const {
      top10, systemStatuses, rank, userUid, urlProfileImage, competitors,
    } = state;
    const profilesTop10 = addPositionInTop10(top10);
    const propsObj = {
      delimiter: null,
      rank,
      profiles: [],
      systemStatuses,
    };

    // The given delimiter is intended to separate the top 3 users
    // from the current user and their six closest competitors.
    const DELIMITER_POSITION_FOR_TOP_3 = 2;
    // This delimiter is intended to separate the first 9 users
    // from the current user who doesn't have a rank yet.
    const DELIMITER_POSITION_FOR_TOP_9 = 8;
    // there is a possibility that the total number of users will be less than 10.
    const delimiterPosition = profilesTop10.length < 10 ? profilesTop10.length - 1 : DELIMITER_POSITION_FOR_TOP_9;

    switch (true) {
      case top10.length === 0 && !userUid:
        // for the initial render
        break;
      case !rank: {
        // user is not ranked yet
        const profilesTop9 = profilesTop10.slice(0, 9);
        const currentUser = {
          user_uid: userUid,
          url_profile_image: urlProfileImage,
          signup_source: null,
          points: 0,
          badges: {},
          system_statuses: [],
          system_events: [],
          position: null,
        };
        propsObj.profiles = [...profilesTop9, currentUser];
        propsObj.delimiter = delimiterPosition >= 0 ? delimiterPosition : null;
        break;
      }
      case rank <= 10:
        // user in top 10
        propsObj.profiles = profilesTop10;
        break;
      default: {
        const profilesTop3 = profilesTop10.slice(0, 3);
        const competitorsList = addPositionInCompetitors(competitors, userUid, rank);
        propsObj.profiles = [...profilesTop3, ...competitorsList];
        propsObj.delimiter = DELIMITER_POSITION_FOR_TOP_3;
      }
    }
    return propsObj;
  }

  render() {
    const propsLeaderboardTable = this.getLeaderboardTableProps(this.state);

    return (
      <>
        <div className="gamification-title-wrapper d-flex justify-content-between align-items-center">
          <h1 className="LeaderboardTitle" data-testid="leaderboard-page-title">
            Leaderboard
          </h1>
          <LogoDropdown />
        </div>
        <LeaderboardTable
          delimiter={propsLeaderboardTable.delimiter}
          rank={propsLeaderboardTable.rank}
          profiles={propsLeaderboardTable.profiles}
          systemStatuses={propsLeaderboardTable.systemStatuses}
        />
      </>
    );
  }
}

export default LeaderboardPage;
