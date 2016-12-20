import React, { Component} from 'react';

const TWITTER_TEXTS = [
  "The #SyriaCrisis is robbing millions of children of their right to education - a datavis project by @IXT",
  "2.1M Syrian children didn't go to school today - a datavis project by @IXT on how #SyriaCrisis impacts education",
  "Every hour, a Syrian child has to give up school - a datavis project by @IXT on how #SyriaCrisis impacts education"
];

function twitterUrl() {
  const text = TWITTER_TEXTS[Math.floor(Math.random() * (TWITTER_TEXTS.length - 1))];
  const url = "https://lab.interactivethings.com/road-to-school/";
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
}

class Share extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div className="Share">
        <a className="Share-Twitter" ref="external" title="Share on Twitter" target="_blank" href={twitterUrl()} />
      </div>
    );
  }
}

export default Share;
