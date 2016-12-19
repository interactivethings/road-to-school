import React, { Component} from 'react';

// FIXME: these will need a hash tag and say that it's a project from us.
const TWITTER_TEXTS = [
  "The Syrian conflict is robbing millions of children of their right to education.",
  "2.1 million Syrian school-aged children did not go to school today.",
  "Every hour, one Syrian child has to give up on school.",
  "“There are people using books and notebooks for cooking.”"
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
