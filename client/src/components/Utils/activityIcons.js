import React from 'react';

import { ReactComponent as RunIcon } from '../../assets/icons/activity/run.svg';
import { ReactComponent as HikeIcon } from '../../assets/icons/activity/hike.svg';
import { ReactComponent as BikeIcon } from '../../assets/icons/activity/bike.svg';
import { ReactComponent as CrossfitIcon } from '../../assets/icons/activity/crossfit.svg';
import { ReactComponent as GolfIcon } from '../../assets/icons/activity/golf.svg';
import { ReactComponent as KayakIcon } from '../../assets/icons/activity/kayak.svg';
import { ReactComponent as KitesurfIcon } from '../../assets/icons/activity/kitesurf.svg';
import { ReactComponent as DownhillSkiIcon } from '../../assets/icons/activity/ski.svg';
import { ReactComponent as NordicSkiIcon } from '../../assets/icons/activity/ski.svg';
import { ReactComponent as SnowBoardIcon } from '../../assets/icons/activity/snowboard.svg';
import { ReactComponent as SnowShoeIcon } from '../../assets/icons/activity/snowshoe.svg';
import { ReactComponent as SoccerIcon } from '../../assets/icons/activity/soccer.svg';
import { ReactComponent as SwimIcon } from '../../assets/icons/activity/swim.svg';
import { ReactComponent as TennisIcon } from '../../assets/icons/activity/tennis.svg';
import { ReactComponent as YogaIcon } from '../../assets/icons/activity/yoga.svg';
import { ReactComponent as DefaultIcon } from '../../assets/icons/activity/default.svg';


const ActivityIcon = ({ activityType }) => {
    let icon;

    switch (activityType) {
        case 'Run':
            icon = <RunIcon />;
            break;
        case 'Hike':
            icon = <HikeIcon />;
            break;
        case 'Bike':
            icon = <BikeIcon />;
            break;
        case 'Crossfit':
            icon = <CrossfitIcon />;
            break;
        case 'Golf':
            icon = <GolfIcon />;
            break;
        case 'Kayak':
            icon = <KayakIcon />;
            break;
        case 'Kitesurf':
            icon = <KitesurfIcon />;
            break;
        case 'Downhill Ski':
            icon = <DownhillSkiIcon />;
            break;
        case 'Nordic Ski':
            icon = <NordicSkiIcon />;
            break;
        case 'Snowboard':
            icon = <SnowBoardIcon />;
            break;
        case 'Snowshoe':
            icon = <SnowShoeIcon />;
            break;
        case 'Soccer':
            icon = <SoccerIcon />;
            break;
        case 'Swim':
            icon = <SwimIcon />;
            break;
        case 'Tennis':
            icon = <TennisIcon />;
            break;
        case 'Yoga':
            icon = <YogaIcon />;
            break;
        default:
            icon = <DefaultIcon />;
            break;
    }

    return (
        <div
            className="activity-icon"
            title={activityType}
        >
            {icon}
        </div>
    );
};

export default ActivityIcon;