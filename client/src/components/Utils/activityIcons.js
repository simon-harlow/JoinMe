import React from 'react';

import { ReactComponent as RunIcon } from '../../assets/icons/activity/run.svg';
import { ReactComponent as HikeIcon } from '../../assets/icons/activity/hike.svg';
import { ReactComponent as BikeIcon } from '../../assets/icons/activity/bike.svg';
import { ReactComponent as DefaultIcon } from '../../assets/icons/activity/default.svg';

// TODO: add all icons to this list

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