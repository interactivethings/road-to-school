
import * as d3 from 'd3';
import {isolate} from './utils/forceHelpers';

//width of SVG: width * 0.5
//height of SVG: height

export function intro(force, data, {width, height}) {
  force 
    .force('X0',  d3.forceX((d) => d.x0).strength(0.8))
    .force('Y0',  d3.forceY((d) => d.y0).strength(0.8)) 
    .alphaTarget(0.3)
    .velocityDecay(0.3);

}

export function outOfSchool(force, data, {width, height}) {
  var bottom = height*0.94 + Math.floor(Math.random() * -3)/100;

  force 
    .force('yNoSchool',  isolate(data, d3.forceY(bottom), function(d) { return d.type === 'noSchool' && d.type !== 'falling'; }).strength(0.3)) 
    .force('Y0',  isolate(data, d3.forceY((d) => d.y0), function(d) { return d.type !== 'noSchool' && d.type !== 'falling' ; }).strength(0.3)) 
    .force('X0',  isolate(data, d3.forceX((d) => d.x0), function(d) { return d.type !== 'noSchool' && d.type !== 'falling' ; }).strength(0.3)) 
    .force('collideNoSchool',  isolate(data, d3.forceCollide(), function(d) { return d.type === 'noSchool' && d.type !== 'falling'; }).radius(10).strength(0.3)) 
    .alphaDecay(0.2)
    .velocityDecay(0.3);

}

export function question(force, data, {width, height}) {

  force
    .force('yNoSchool',  isolate(data, d3.forceY( (d) => d.y), function(d) { return d.type === 'noSchool' && d.type !== 'falling'; }).strength(0.4)) 
    .force('Y0',  isolate(data, d3.forceY((d) => d.y0), function(d) { return d.type !== 'noSchool' && d.type !== 'falling' ; }).strength(0.1)) 
    .force('X0',  isolate(data, d3.forceX((d) => d.x0), function(d) { return d.type !== 'noSchool' && d.type !== 'falling' ; }).strength(0.1))  
    .alphaTarget(0.1)
    .velocityDecay(0.9);
}



export function bomb(data, {width, height}) {

    d3.forceSimulation()
    .force('xBomb', isolate(data, d3.forceX(function(d) {return Math.cos(d.id) * 10 + width * 0.2;}), function(d) { return d.type === 'school' && d.type !== 'falling'; }).strength(-0.1))   
    .force('yBomb', isolate(data, d3.forceY(function(d) {return Math.sin(d.id) * 10 + height * 0.4;}), function(d) { return d.type === 'school' && d.type !== 'falling'; }).strength(-0.1))   
    .alphaTarget(0.8)
    .velocityDecay(0.6)
    .stop()
    .tick();
}

export function fall(force, data, {width, height}) {

    // var Letter_english = 'M2.144 6.816c.1 0 .204-.012.306-.037.103-.03.197-.07.282-.12.084-.05.153-.12.207-.2.05-.08.08-.18.08-.29 0-.13-.04-.24-.1-.33-.07-.09-.16-.17-.27-.24-.11-.07-.23-.14-.37-.19l-.43-.17c-.15-.06-.29-.12-.43-.19s-.26-.15-.37-.25c-.1-.09-.19-.2-.26-.33C.74 4.35.7 4.2.7 4.02c0-.11.02-.235.064-.37.04-.133.112-.26.216-.376.106-.117.246-.215.42-.295.177-.08.4-.12.667-.12.073 0 .15 0 .233.01.084.01.168.03.254.05.086.02.172.06.258.1.087.04.17.1.255.16l-.02-.31h.335V4.3h-.25c-.01-.14-.037-.274-.08-.41-.043-.135-.106-.257-.188-.365-.082-.11-.185-.197-.31-.265-.125-.066-.274-.1-.446-.1-.124 0-.234.016-.33.05-.097.034-.178.08-.245.135-.065.055-.115.12-.15.192-.033.073-.05.15-.05.23 0 .13.033.243.1.336.066.093.154.176.263.25.11.072.235.14.375.197.14.06.29.12.43.18.15.06.29.128.43.197.14.07.27.15.38.244.11.1.2.21.27.33.07.13.1.28.1.45 0 .2-.04.38-.12.53-.08.15-.18.27-.32.37-.13.1-.28.17-.44.22-.16.05-.33.07-.5.07-.27 0-.51-.03-.71-.11-.21-.07-.37-.15-.51-.24l.03.28H.75L.706 5.68h.246c.01.166.05.32.116.46.066.138.153.258.26.358.11.1.233.178.372.234.14.056.287.084.444.084zM4.064 3c.14-.003.268-.04.382-.115.115-.074.216-.167.303-.278.08-.11.16-.23.22-.36.06-.13.1-.254.14-.368h.27V3h1.34v.312l-1.35.015c-.01.346-.01.642-.01.887v.613l-.01.39v.216c0 .05-.01.08-.01.095v.025c0 .182.01.343.03.482.02.14.05.257.1.352.04.094.1.165.18.214.08.05.17.08.29.08.14 0 .28-.04.41-.12.13-.08.25-.2.36-.35l.21.18c-.12.18-.23.32-.35.42-.12.1-.23.18-.33.23-.1.05-.2.09-.29.1-.09.01-.17.02-.24.02-.08 0-.17-.01-.25-.02-.09-.01-.17-.04-.25-.08-.09-.03-.16-.09-.23-.16-.08-.07-.14-.15-.19-.26-.06-.11-.1-.24-.13-.4-.03-.15-.05-.34-.05-.55l.02-2.31-.61.01V3zm6.15 1.05c0-.13.002-.24.007-.333.01-.093.02-.184.04-.276l-.57.03v-.33h.25c.12 0 .21 0 .3-.02.08-.01.15-.03.21-.05.06-.02.11-.04.14-.06.04-.02.07-.05.11-.08h.23v3.38l-.01.21-.01.19.57-.03V7H10.3l-.03-.252c-.01-.077-.013-.153-.02-.228-.082.083-.174.162-.28.236-.1.074-.21.14-.32.193-.11.05-.23.09-.35.13-.12.03-.24.05-.353.05-.22 0-.41-.03-.572-.09-.163-.06-.3-.16-.41-.29-.11-.14-.19-.32-.245-.54-.055-.23-.082-.5-.082-.83V3.96c0-.082 0-.167.004-.253s.01-.174.025-.266l-.55.03v-.33h.25c.114 0 .21 0 .29-.02.08-.01.15-.03.208-.05.06-.02.11-.04.147-.06.036-.02.07-.05.102-.08h.23v2.43c0 .23.014.44.046.61.03.17.08.31.15.43.07.11.16.19.267.25.11.05.245.08.404.08.1 0 .2-.02.3-.06.1-.03.19-.08.28-.14.09-.05.17-.12.25-.19.08-.07.15-.15.2-.23V4.05zm5.364 2.102c0 .084-.002.168-.006.252-.004.085-.012.182-.025.29l.566-.03V7H14.97c-.014-.078-.025-.15-.033-.22l-.02-.198c-.153.167-.338.3-.556.398-.21.1-.46.15-.72.15-.25 0-.47-.048-.68-.142-.21-.093-.39-.228-.54-.402-.15-.175-.27-.386-.36-.635-.08-.24-.13-.52-.13-.83 0-.32.05-.62.16-.9.11-.27.25-.51.43-.71.19-.2.4-.35.65-.46.26-.11.53-.16.83-.16.09 0 .18.01.27.02.09.02.18.03.26.05.09.02.16.05.23.07l.19.08V2c0-.083 0-.164.01-.242 0-.078.01-.17.02-.278l-.56.032v-.336c.18 0 .32-.006.44-.018.12-.012.21-.028.28-.05.08-.02.13-.042.17-.067.04-.02.08-.05.11-.08h.23v5.2zm-1.656.582c.088 0 .178-.013.27-.04.09-.025.178-.06.263-.108.085-.047.164-.102.238-.166.075-.064.142-.134.202-.21-.003-.064-.004-.133-.004-.206V5.77l.01-2.305c-.13-.1-.26-.17-.42-.213-.15-.043-.3-.064-.46-.064-.2 0-.38.044-.54.132-.16.09-.3.215-.41.377-.11.163-.19.35-.25.557-.05.208-.08.47-.08.785 0 .21.03.43.09.65.06.22.14.41.24.56.1.15.22.26.37.35.15.08.31.12.5.12zm4.693-3.55c-.313 0-.57.09-.774.275-.2.18-.33.48-.4.89h2.04c0-.14-.01-.28-.04-.42-.03-.14-.08-.27-.15-.38-.07-.11-.15-.2-.26-.27-.11-.07-.24-.11-.4-.11zm1.617 1.457l-2.816.05c-.003.31.02.59.07.84s.128.47.234.64c.107.18.244.32.412.41.168.1.37.15.604.15.125 0 .253-.01.383-.05s.25-.08.37-.14c.12-.06.23-.13.33-.21.1-.08.18-.17.25-.26l.19.16c-.11.17-.24.31-.38.43-.15.12-.3.21-.45.28-.16.08-.31.13-.47.16-.16.03-.3.05-.44.05-.28 0-.53-.05-.77-.15-.24-.1-.45-.24-.62-.42-.18-.18-.31-.4-.41-.66-.1-.26-.15-.55-.15-.88 0-.28.05-.55.14-.81.09-.25.23-.48.41-.68.17-.2.39-.35.63-.47s.52-.18.82-.18c.22 0 .43.04.62.11.2.08.37.19.52.33.15.15.27.33.35.55.09.23.13.49.13.78zm1.09-.68c0-.08.003-.16.005-.25.003-.08.012-.17.028-.26l-.567.04v-.34c.175 0 .317 0 .426-.02.11-.01.197-.03.264-.05.066-.02.118-.04.154-.06.036-.02.07-.05.102-.08h.23c.005.06.01.13.018.21.006.08.012.17.017.28.08-.07.18-.14.28-.21.1-.06.21-.12.32-.17.11-.04.22-.08.34-.11.12-.02.23-.04.35-.04.46 0 .8.15 1.01.44.21.29.32.74.32 1.35v1.49c0 .11 0 .21-.01.29-.01.08-.01.17-.03.26l.5-.02V7h-1.63v-.238c.12 0 .21-.024.28-.073.06-.05.11-.12.14-.21.03-.09.04-.19.05-.31v-1.5c-.01-.46-.08-.81-.23-1.04-.15-.24-.38-.35-.7-.35-.1 0-.19.01-.29.04-.1.03-.19.06-.28.11-.09.04-.17.1-.25.16-.08.06-.15.13-.2.2v2.36c0 .1 0 .2-.01.28l-.03.26.5-.03V7H20.8v-.238c.12 0 .215-.024.28-.073.063-.05.11-.12.136-.21.023-.09.04-.19.043-.31l.01-.4.01-1.83zM25.346 3c.14-.003.268-.04.382-.115.115-.074.216-.167.303-.278.09-.11.16-.23.22-.36.06-.13.11-.254.14-.368h.28v.59l-.01.53h1.35v.31l-1.35.01v2.22c0 .18.01.34.03.48.02.14.05.25.1.35.05.09.11.16.19.21.08.05.18.07.29.07.14 0 .28-.04.41-.13.14-.09.26-.2.36-.36l.22.17c-.11.18-.23.31-.35.41-.11.1-.22.17-.33.22-.1.05-.2.08-.29.09-.09.01-.17.02-.23.02-.08 0-.16-.01-.24-.02s-.17-.04-.25-.08c-.08-.04-.16-.09-.23-.16s-.13-.16-.19-.27c-.05-.11-.1-.246-.13-.4-.03-.158-.04-.34-.04-.557l.02-2.3-.61.002V3z';
    d3.select('svg').selectAll("path")
        .filter( (d) => d.type === 'falling'  )
        .transition()
        .style('stroke', 'red')

    d3.forceSimulation()
    .force('falling', isolate(data, d3.forceY(height*0.93), function(d) {return d.type === 'falling' ; }).strength(0.01))   
    .alphaDecay(0.2)
    .velocityDecay(0.2);
}

export function quote(force, data, {width, height}) {

    d3.select('svg').selectAll("path")
        .filter( (d) => d.quote  )
        .transition()
        .style('stroke', 'orange');


    d3.forceSimulation()
    .force('lifting', isolate(data, d3.forceY((d) => d.y0), function(d) {return d.quote; }).strength(0.3))   
    .alphaDecay(0.2)
    .velocityDecay(0.2);

}