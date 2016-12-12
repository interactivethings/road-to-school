import React, {Component} from 'react';
import * as d3 from 'd3';
import './App.css';
import {voronoiContentMap, findTextforVoronoi} from './VoronoiContentMap';

var letters = [
{
  name: 'book',
  LETTER_PATH: 'M29.303 11.03c0 .484-.076.84-.228 1.067-.038.06-.336.09-.895.09h-6.868v-1.563h5.233c.76 0 1.14-.052 1.14-.155 0-.18-.682-.895-2.044-2.14-1.35-1.256-2.126-1.88-2.332-1.88-.043.052-.098.233-.163.543-.114-.098-.253-.224-.42-.38-.164-.153-.356-.334-.573-.54-.4-.396-.6-.778-.6-1.147 0-.38.186-.88.56-1.498.21-.337 2.597-1.433 7.154-3.288l-.79 1.945L22.81 4.39c.092.087.215.193.37.318.154.125.346.268.574.43 1.28.978 2.366 1.9 3.26 2.772.89.87 1.598 1.694 2.118 2.47.114.168.17.385.17.65zm-6.3 1.156H16.2v-1.562h4.165c.086 0 .13-.073.13-.22 0-.108-.034-.264-.102-.468-.068-.203-.15-.405-.248-.606-.098-.2-.2-.377-.305-.53-.105-.15-.196-.227-.272-.227l.74-1.717c.36.407.665 1 .92 1.782.255.744.383 1.405.383 1.986h1.394v1.562zm-2.28-7.893l-1.708-1.09.716-1.156 1.72 1.025-.724 1.22zm-4.1-.977l.69-1.204 1.702 1.09-.7 1.132-1.693-1.018zm1.266 8.87h-1.867c-.526 0-.958-.06-1.297-.183-.34-.122-.59-.314-.75-.578-.16-.263-.24-.728-.24-1.395V1.673l1.22-1.53v9.887c0 .396.186.594.555.594h2.377v1.562zm-6.467-2.156c0 .998-.193 1.65-.578 1.953-.146.114-.4.22-.765.317-.362.098-.837.198-1.423.3-.57.093-1.116.163-1.64.21-.523.045-1.032.068-1.525.068-3.494 0-5.24-.914-5.24-2.742 0-.445.113-.88.34-1.302.077-.14.335-.51.774-1.107-.233.75-.35 1.275-.35 1.58 0 .894.616 1.485 1.847 1.773.304.07.696.123 1.176.158.48.036 1.052.053 1.72.053.38 0 .79-.01 1.232-.033.442-.025.926-.064 1.453-.118 1.443-.143 2.164-.35 2.164-.628 0-.32-.268-.82-.805-1.496l.748-1.636c.58.944.87 1.828.87 2.653zm-4.46 5.126l-.748 1.278-1.83-1.066.707-1.278 1.872 1.066z'
},
{
  name: 'school',
  LETTER_PATH: 'M26.295 7.66c0 .59-.296.884-.89.884-.303 0-.678-.072-1.123-.217-.48-.155-.804-.33-.97-.52-.134.434-.45.65-.945.65h-1.345v-1.04c1.273 0 1.97-.044 2.09-.13.064-.056.172-.273.324-.652.11-.272.213-.498.312-.68.1-.184.2-.33.298-.443.1-.112.204-.193.312-.242.11-.048.226-.073.353-.073.41 0 .78.317 1.13.95.15.282.27.548.35.8.08.25.12.49.11.713zm-.678-.374c0-.116-.032-.24-.095-.375-.063-.13-.14-.25-.23-.37-.09-.11-.192-.21-.304-.28-.112-.07-.22-.11-.326-.11-.07 0-.152.03-.25.09-.097.06-.19.13-.28.22-.092.083-.17.17-.235.26-.065.09-.097.17-.097.24 0 .03.027.07.08.11.055.045.126.09.213.134.086.047.182.09.287.134.105.046.208.084.31.116.1.032.195.06.28.08.088.02.16.033.213.033.29 0 .434-.087.434-.26zm-3.474 1.172H20.9c-.043.097-.413.193-1.11.287-.58.076-1.02.114-1.325.114-.405 0-.685-.05-.84-.13-.214-.13-.32-.38-.32-.75 0-.07.01-.18.034-.32.02-.14.05-.28.08-.42.03-.14.07-.26.11-.37.04-.11.08-.16.12-.16l.02.002v.4c0 .276.03.43.08.467.174.096.474.145.9.145.15 0 .31-.008.484-.02.174-.01.363-.035.57-.06.553-.078.83-.18.83-.317 0-.18-.123-.617-.37-1.308-.25-.72-.43-1.095-.53-1.124l.607-1.257c.385.94.685 2.19.9 3.76h.984v1.05zm-5.627-.277c0 .93-.366 1.72-1.096 2.37-.63.56-1.237.84-1.823.84-.74 0-1.465-.48-2.17-1.46.06.05.14.1.24.15.234.1.474.18.72.24s.497.09.754.1c1.18 0 2.1-.63 2.76-1.89.05-.09.07-.18.07-.27 0-.49-.36-.992-1.09-1.51l.47-1.022c.18.11.33.255.48.43.15.176.27.375.38.597.1.224.18.458.24.704.058.245.086.492.086.742zm-3.69-1.26c0 .55-.034 1-.1 1.34-.31.2-.58.3-.807.3-.85 0-1.55-.14-2.11-.43-.53.25-1.04.376-1.51.376-.72 0-1.35-.11-1.89-.33-.17.2-.6.303-1.29.303H3.91V7.42c.025.015.12.023.28.023 1.224 0 1.894-.07 2.01-.2.06-.065.087-.217.087-.455 0-.14-.014-.28-.05-.418L7 5.55c.01.063.015.15.02.253.006.105.01.23.01.374 0 .053-.01.134-.03.24l-.06.334c-.024.12-.044.23-.06.32-.02.1-.03.16-.03.2.01.02.048.04.11.06.3.1.717.16 1.252.16h.31c.72 0 1.106-.04 1.16-.123.04-.05.06-.197.06-.443 0-.24-.012-.4-.038-.49l.792-.8c-.01.2-.023.4-.038.604-.016.205-.034.416-.056.633-.014.115-.047.255-.097.417l-.006.02c0 .14.29.21.86.21.56 0 .85-.14.85-.426 0-.4-.08-.674-.25-.826l.82-.736c.15.465.23.93.23 1.4zM4.63 8.46h-.85c-.384 0-.64-.093-.77-.277-.203-.3-.305-.75-.305-1.35 0-.13.01-.23.027-.295l-.678.683H2c-.22 0-.53-.13-.928-.39-.43-.27-.645-.51-.645-.71 0-.12.068-.31.206-.57.315-.61.78-1.02 1.394-1.23.253-.08.436-.13.548-.13v-.55l.618-.81v3.95c.008.44.158.65.45.65h.988v1.04zM2.65 5.523c0-.594-.02-.905-.06-.933-.36.387-.82.657-1.377.81.004.08.053.163.147.254.094.09.205.176.333.257.13.09.262.15.4.21.137.06.25.09.336.09.14 0 .22-.22.22-.67zm.516-3.65l-1.14-.728.48-.77 1.143.683-.49.813zM.432 1.22l.46-.8 1.135.727-.466.754-1.12-.68z'
},
{
  name: 'scientist',
  LETTER_PATH: 'M16.226 7.286L15.81 8.29l-2.085.168H10.65V7.416h1.388c-.322-.438-.483-.787-.483-1.047 0-.44.407-.98 1.22-1.63.23-.176.49-.26.782-.26.2 0 .387.04.564.12.18.08.34.19.48.325.14.14.256.305.35.496.095.19.16.398.2.62-.05-.063-.127-.123-.232-.183-.104-.06-.22-.114-.35-.16-.127-.048-.26-.085-.392-.11-.133-.03-.256-.043-.37-.043-.606 0-1.036.26-1.29.78l-.005.036c0 .076.04.17.125.287.082.116.203.243.363.38.16.134.3.233.42.3.12.064.223.096.307.096l2.51-.148zm-4.45 1.172h-1.242c-.35 0-.64-.04-.866-.123-.226-.08-.392-.21-.5-.385-.105-.175-.16-.485-.16-.93V1.448l.815-1.02V7.02c0 .264.123.396.37.396h1.583v1.042zM7.483 2.083l-.445.9V8.29l-.277.168H4.65V7.416h1.578V2.5L5.94 1.383 6.893.43l.08 1.114.51.537zm-1.71 6.375H4.545c-.07 0-.178-.002-.328-.006-.15-.004-.307-.01-.47-.016-.162-.007-.32-.013-.47-.016-.153-.004-.265-.006-.338-.006-1.41 0-2.12.116-2.12.347l.04.21c.013.044.04.138.07.28l.135.584c.112.506.2.96.263 1.367s.092.766.084 1.085c0 .39-.14.83-.423 1.324-.06-.65-.14-1.26-.233-1.833-.095-.57-.205-1.11-.33-1.61C.34 9.82.273 9.53.23 9.29c-.04-.244-.06-.43-.06-.57 0-.48.145-.805.44-.97.164-.092.536-.178 1.115-.262.51-.076.875-.113 1.096-.113.08 0 .14.007.18.02L2.09 6.37.9 6.986.91 6.6c.005-.122.204-.375.598-.76.39-.382.65-.573.78-.573.197 0 .495.264.896.792.496.64.932 1.09 1.308 1.35h1.28v1.04z'
},
{
  name: 'engineer',
  LETTER_PATH: 'M29.65 5.66c0 .59-.295.884-.888.884-.304 0-.678-.072-1.123-.217-.49-.155-.81-.33-.98-.52-.14.434-.45.65-.95.65h-1.34v-1.04c1.27 0 1.97-.044 2.09-.13.06-.056.17-.273.32-.652.11-.272.21-.498.31-.68.1-.184.2-.33.3-.443.1-.112.2-.193.31-.242.11-.048.23-.073.35-.073.4 0 .78.317 1.12.95.15.282.27.548.35.8.08.25.12.49.11.713zm-.677-.374c0-.116-.03-.24-.095-.375-.063-.13-.14-.25-.23-.37-.09-.11-.192-.21-.304-.28-.112-.07-.22-.11-.326-.11-.068 0-.15.03-.25.09-.097.06-.19.13-.28.22-.092.09-.17.17-.234.26-.066.09-.098.17-.098.24 0 .03.027.07.08.11.056.05.126.09.213.14.08.05.18.09.28.14.1.05.21.09.31.12s.19.06.28.08c.08.02.15.04.21.04.29 0 .43-.082.43-.26zM25.5 6.458h-2.55c.036.04.132.112.287.217.015.05.022.126.022.227 0 .387-.05.834-.13 1.34-.12.684-.29 1.026-.51 1.026-.53 0-.96-.27-1.3-.81-.23-.36-.42-1.028-.56-2h-1.33V5.416h1.55c-.01-.007-.01-.015-.02-.024 0-.01-.01-.018-.01-.025 0-.29.25-.87.76-1.74.53-.905.91-1.358 1.16-1.358.25 0 .37.55.37 1.67 0 .64-.02.99-.06 1.04-.05.04-.1.1-.17.17l-.23.23c.01.01.9.02 2.67.02v1.04zm-2.67 1.28c0-.174-.033-.34-.1-.497-.067-.15-.16-.29-.28-.41-.12-.12-.256-.21-.412-.28-.155-.07-.32-.11-.493-.11h-.136c-.04 0-.07.02-.09.06 0 .25.14.59.44 1.03.31.46.59.69.82.69.16 0 .24-.15.24-.46zm-.054-2.995c0-.795-.087-1.193-.26-1.193-.12 0-.33.26-.635.78-.28.496-.43.836-.46 1.02.03.03.06.044.1.044.04 0 .1-.007.18-.02.08-.016.18-.04.29-.07.11-.03.23-.073.36-.127.13-.054.27-.12.41-.2.03-.033.04-.11.04-.234zm-2.21 1.715H16.03V5.416h2.778c.058 0 .087-.05.087-.147 0-.08-.022-.18-.068-.32-.045-.14-.1-.27-.165-.41-.065-.14-.133-.25-.203-.35-.08-.1-.14-.15-.19-.15l.49-1.15c.24.27.44.66.61 1.18.17.5.25.94.25 1.32h.92v1.05zM18.988.728l-.5.852-1.22-.71.472-.852 1.248.71zm-1.836 5.73H15.91c-.044.097-.414.193-1.112.287-.58.076-1.02.114-1.324.114-.405 0-.685-.05-.84-.13-.214-.13-.32-.38-.32-.75 0-.07.01-.18.034-.32s.053-.28.087-.42c.034-.14.072-.26.114-.37.04-.11.08-.16.12-.16h.02v.4c0 .27.02.43.08.46.17.09.47.14.9.14.14 0 .31-.01.48-.02.17-.01.36-.04.57-.06.55-.08.83-.18.83-.32 0-.18-.13-.62-.37-1.31-.26-.72-.43-1.1-.53-1.13l.6-1.26c.38.94.68 2.19.9 3.76h.98v1.05zm-5.855-1.302c0 .842-.05 1.27-.152 1.28-.098.01-.22.02-.364.03-.14.01-.31.013-.52.013-.4 0-.76-.03-1.07-.09-.31-.06-.61-.15-.88-.27-.19.16-.41.25-.67.29-.09.01-.34.01-.75.01 0 .8-.39 1.47-1.18 2.02-.8.51-1.61.77-2.44.77-.44 0-.83-.04-1.15-.1-.33-.07-.6-.17-.81-.31-.21-.14-.37-.32-.47-.53-.1-.21-.16-.47-.16-.76 0-.43.14-.95.41-1.55.35-.75.63-1.21.85-1.39-.08.11-.15.25-.23.42-.07.17-.14.36-.2.55-.06.19-.1.38-.14.57-.03.18-.05.35-.05.48 0 1.05.68 1.58 2.04 1.58.25-.01.48-.03.71-.07.23-.05.45-.1.65-.16.2-.07.38-.14.55-.21.168-.08.31-.15.436-.22s.22-.13.29-.18c.07-.06.115-.09.13-.11.076-.1.114-.28.114-.53-.008-.18-.027-.36-.06-.54-.033-.18-.08-.36-.14-.53-.063-.17-.14-.33-.23-.49-.09-.154-.2-.295-.33-.42l.843-.99c.27.52.46 1.023.568 1.52.04.133.26.2.67.2.34 0 .56-.05.65-.15.08-.087.12-.31.12-.67 0-.14-.013-.236-.05-.29L9 3.59c.008.07.01.168.014.286v.42c0 .367-.05.676-.16.93-.01.014-.01.032-.01.05 0 .128.24.19.728.19.19 0 .35-.004.47-.015.13-.01.22-.03.3-.052.07-.02.12-.06.15-.11.03-.04.04-.1.04-.17 0-.39-.1-.66-.3-.82l.9-.79c.14.11.21.65.21 1.64z'
},
{
  name: 'doctor',
  LETTER_PATH: 'M53.198 8.458h-7.46V7.416h5.144c0-.033-.037-.097-.112-.193-.074-.096-.17-.2-.293-.31-.12-.11-.257-.22-.41-.33-.15-.11-.3-.205-.45-.285-.415-.22-.804-.33-1.166-.33-.27 0-.74.133-1.41.4.28-.502.48-.826.61-.97.26-.282.61-.423 1.03-.423.64 0 1.38.378 2.24 1.133.3.26.64.5 1.02.717.38.217.8.414 1.27.59V8.46zm-6.333 0h-1.242c-.35 0-.64-.04-.865-.123-.226-.08-.393-.21-.5-.385-.106-.175-.16-.485-.16-.93V1.448l.814-1.02V7.02c0 .264.123.396.37.396h1.583v1.042zm-4.33-.798c0 .59-.297.884-.89.884-.304 0-.68-.072-1.123-.217-.48-.155-.805-.33-.97-.52-.135.434-.45.65-.945.65H37.26v-1.04c1.274 0 1.97-.044 2.09-.13.065-.056.173-.273.325-.652.11-.272.213-.498.312-.68.1-.184.2-.33.3-.443.098-.112.202-.193.31-.242.11-.048.227-.073.353-.073.405 0 .78.317 1.123.95.152.282.27.548.35.8.08.25.12.49.11.713zm-.68-.374c0-.116-.03-.24-.094-.375-.06-.13-.14-.25-.23-.37-.09-.11-.19-.21-.3-.28-.11-.07-.22-.11-.32-.11-.06 0-.15.03-.25.09s-.19.13-.28.22c-.09.09-.17.17-.23.26s-.09.17-.09.24c0 .03.03.07.08.11.06.05.13.09.22.14.09.05.18.09.29.14.11.05.21.09.31.12.11.03.2.06.29.08.09.02.16.04.22.04.29 0 .436-.085.436-.26zm-3.478 1.172h-1.35c-.088.607-.478 1.128-1.173 1.562-.63.398-1.273.597-1.93.597-.348 0-.664-.06-.948-.177-.284-.117-.528-.28-.732-.488-.204-.208-.362-.457-.472-.746-.11-.29-.165-.607-.165-.955 0-.5.095-1 .287-1.49.087-.22.164-.39.23-.49.068-.1.123-.15.166-.15 0 .07-.01.17-.027.31-.018.14-.04.28-.062.43-.02.15-.04.3-.06.43-.01.14-.02.24-.02.31 0 .72.22 1.24.65 1.57.48.36.95.53 1.41.53.19 0 .38-.03.58-.11.21-.07.4-.17.58-.3.18-.12.35-.26.49-.43.15-.16.26-.33.34-.5V1.45l.86-1.02v6.988h1.35V8.46zm-9.35-.673c0 .16-.013.288-.036.388-.02.1-.07.183-.16.252-.08.07-.21.126-.39.17-.17.046-.41.092-.72.14-.51.075-.97.113-1.39.113-.43 0-.72-.045-.86-.136-.2-.12-.3-.383-.3-.792 0-.06.01-.16.03-.295.03-.136.05-.27.09-.402s.07-.247.11-.347c.05-.1.09-.15.13-.15.01 0 .02.003.03.006v.402c0 .275.03.43.08.466.18.098.48.147.9.147.15 0 .31-.006.48-.02.18-.012.37-.033.57-.062.56-.075.83-.18.83-.314 0-.18-.12-.61-.37-1.3-.25-.72-.43-1.09-.53-1.12l.61-1.26c.07.02.24.55.51 1.59.28 1.12.42 1.96.42 2.54zm-4.755-.098c0 .322-.05.56-.152.71-.026.04-.224.06-.597.06h-4.58v-1.04h3.49c.506 0 .76-.035.76-.104 0-.12-.455-.595-1.363-1.427-.9-.835-1.42-1.253-1.556-1.253-.03.036-.066.157-.11.363-.075-.065-.168-.15-.278-.252l-.383-.36c-.267-.265-.4-.52-.4-.766 0-.253.123-.585.373-.998.14-.224 1.73-.955 4.77-2.19l-.528 1.295-3.775 1.535c.06.058.143.13.246.212.1.083.23.18.38.287.85.65 1.58 1.26 2.17 1.84.59.58 1.06 1.13 1.41 1.64.07.11.11.25.11.43zm-4.2.77h-4.536v-1.04h2.777c.058 0 .087-.05.087-.148 0-.08-.023-.18-.068-.32-.045-.14-.1-.27-.165-.41-.065-.14-.133-.25-.204-.35-.07-.1-.13-.15-.18-.15l.492-1.15c.24.27.443.66.613 1.18.17.5.255.94.255 1.32h.928v1.05zm-1.52-5.262l-1.14-.727.478-.77 1.145.684-.483.813zm-2.734-.65l.46-.804 1.135.73-.467.76-1.128-.68zm.812 5.913h-1.075c-.04.376-.143.73-.312 1.06-.168.33-.383.62-.645.863-.262.25-.562.44-.9.58-.34.15-.696.22-1.072.22-.528 0-1.03-.21-1.508-.62-.47-.41-.754-.88-.852-1.42.16.3.477.58.955.85.49.28.9.42 1.24.42.28 0 .56-.05.83-.15.28-.09.53-.23.75-.4.23-.17.43-.37.6-.6.17-.23.29-.48.36-.75-.05.01-.1.02-.14.02-.22 0-.43-.03-.63-.11-.19-.07-.37-.17-.51-.3-.14-.13-.26-.28-.34-.45-.09-.17-.13-.36-.13-.554 0-.31.15-.72.44-1.22.32-.55.62-.82.89-.82.36 0 .65.32.87.96.17.477.25.95.25 1.42h.97v1.04zm-1.52-1.172c0-.116-.02-.233-.06-.35-.04-.118-.094-.224-.165-.32-.07-.096-.152-.174-.246-.234-.1-.06-.2-.09-.3-.09-.07 0-.13.02-.19.058-.06.038-.11.086-.15.144-.05.058-.09.12-.11.19-.03.068-.04.133-.04.195s.03.13.11.2c.07.06.16.12.27.17.11.05.23.09.35.11.12.03.24.04.34.04.11 0 .17-.05.17-.13zm-3.755.895c0 .93-.366 1.72-1.096 2.37-.63.56-1.24.84-1.83.84-.74 0-1.47-.48-2.17-1.46.06.05.14.1.24.15.23.1.47.18.72.24s.5.09.75.1c1.17 0 2.09-.63 2.75-1.89.04-.09.07-.18.07-.27 0-.49-.37-.99-1.1-1.51l.47-1.02c.17.11.33.26.47.43.14.18.27.38.37.6.1.23.18.46.24.71.05.25.08.5.08.75zM6.99 7.3l-.818 1.16V1.422l.82-.99V7.3zm-3.207-.26c0 .245-.036.472-.108.68-.073.208-.175.39-.307.542-.132.153-.288.273-.47.358-.18.085-.38.127-.596.127-.44 0-.958-.116-1.552-.347-.318-.127-.477-.364-.477-.71 0-.225.1-.58.304-1.064.21-.51.398-.812.564-.906-.11-.16-.16-.27-.16-.33 0-.25.28-.63.84-1.14 0 .21.05.403.13.58.09.177.22.335.39.472.01.004.04.023.08.057l.17.12.21.15c.08.05.15.1.22.16.07.05.13.09.18.13l.09.07c.35.27.52.61.52 1.03zm-.738.346c0-.097-.235-.343-.705-.737-.474-.4-.763-.6-.868-.6-.047 0-.103.04-.168.14-.065.09-.126.2-.182.33-.056.12-.105.25-.146.37-.042.12-.063.2-.063.25 0 .04.01.08.027.11.31.28.722.41 1.232.41.582 0 .873-.1.873-.3z'
}
]

class SvgRenderer extends Component {
  constructor() {
    super();
    this.onRef = ref => this.ref = ref;
  }
  componentDidMount() {
    this.renderSvg();
    this.props.force.on('tick', () => {
      this.renderSvg();
    });
  }

  componentDidUpdate(prevProps, prevState) {
    this.renderSvg();
  }

  componentWillUnmount() {
    this.props.force.on('tick', null);
  }

  render() {
    
    return (
      <div>
        <svg width={this.props.width/2} height={this.props.height} ref={this.onRef}>
        </svg>
      </div>
    );
  }

  renderSvg() {
    if (!this.ref) {
      return;
    }

    const svg = d3.select(this.ref);
    const {width, height} = this.props;

    /*----------------------------- Voronoi overlay --------------------*/
    var nodes = d3.range(voronoiContentMap.length).map(function() {
      return {
        x:  100 *Math.random() + width/2* 0.7 - 70,
        y:  100 *Math.random() + height/2 * 0.8
      };
    });

    var voronoi = d3.voronoi()
        .x(function(d) { return d.x; })
        .y(function(d) { return d.y; })
        .extent([[-1, -1], [width + 1, height + 1]]);

    var node = svg.selectAll("g")
      .data(nodes)
      .enter().append("g");

    node.append("path")
      .data(voronoi.polygons(nodes))
      .attr("d", renderCell)
      .on("hover", function(d,i) {
        console.log(findTextforVoronoi(voronoiContentMap, i) );
      });

    /*----------------------------- Main Vis --------------------*/

    const circles = svg.selectAll('path')
      .data(this.props.data, d => d.id);

    circles.enter()
      .append('path');

    circles
      .attr('transform', d => 'translate('+ d.x + ',' + d.y +') scale(' + 1.2 + ')')
      // .attr('d', book)
      .attr('d', function(d) { return letters[d.letterID].LETTER_PATH; })
      .style('fill', '#191406')
      .call(d3.drag().on("drag", dragged));
    
    circles.exit()
      .remove();

    /*----------------------------- Helper functions --------------------*/

    function renderCell(d) {
      return d == null ? null : "M" + d.join("L") + "Z";
    }

    function dragged(d) {   
      d3.select(this).attr('cx', d.x = d3.event.x).attr('cy', d.y = d3.event.y);    
    }


  }
}

export default SvgRenderer;
