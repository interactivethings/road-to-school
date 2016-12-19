import React, { Component} from 'react';

// FIXME: these will need a hash tag and say that it's a project from us.
const TWITTER_TEXTS = [
  "The #SyriaCrisis is robbing millions of children of their right to education - a datavis project by @IXT",
  "2.1M Syrian children did not go to school today - a datavis project by @IXT about #Syria war's impact on education",
  "“Every hour, one Syrian child gives up school”- a datavis project by @IXT about #Syria war's impact on education"
];

function twitterUrl() {
  const text = TWITTER_TEXTS[Math.floor(Math.random() * (TWITTER_TEXTS.length - 1))];
  const url = "https://lab.interactivethings.com/road-to-school/";
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
}

class Share extends Component {
  render() {
    return (
      <div className="Share">
        <a className="Share-Twitter" ref="external" title="Share on Twitter" target="_blank" href={twitterUrl()} />
      </div>
    );
  }
}

export default Share;
