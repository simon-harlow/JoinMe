function timeAgoDate(date) {
    const commentTime = new Date(date);
    const nowTime = new Date();

    const timeDifference = (nowTime - commentTime);
    let timeAgo = "";

    if (timeDifference < 5000) {
        timeAgo = "just now";
    } else if (timeDifference < 60000){
        timeAgo = `${Math.round(timeDifference / 1000)} seconds ago`;
    } else if (timeDifference < 120000){
        timeAgo = `a minute ago`;
    } else if (timeDifference < 3600000) {
        timeAgo = `${Math.round(timeDifference / 60000)} minutes ago`;
    } else if (timeDifference < 7200000) {
        timeAgo = `an hour ago`;
    } else if (timeDifference < 86400000) {
        timeAgo = `${Math.round(timeDifference / 3600000)} hours ago`;
    } else {
        timeAgo = commentTime.toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'});
    }
    return timeAgo;
}

export default timeAgoDate;