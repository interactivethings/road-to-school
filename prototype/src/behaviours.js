/**
 * Behaviours mutate data for performance reasons
 */

import * as d3 from 'd3';
import {isolate} from './utils/forceHelpers';

export function baseline(force, data, {width, height, time}, ratio) { 
  console.log('baseline')

  force
    .velocityDecay(0.3 )
    .alphaTarget(0.3)
    .force('xSchool', isolate(data, d3.forceX(width/2), function(d) { return d.type === 'school' ; }))
    .force('ySchool', isolate(data, d3.forceY(height/2), function(d) { return d.type === 'school' ; }))
    .force('xNoSchool', isolate(data, d3.forceX(width/2), function(d) { return d.type === 'noSchool' ; }))      
    .force('yNoSchool', isolate(data, d3.forceY(height/2), function(d) { return d.type === 'noSchool' ; }))
    .force('collideSchool', isolate(data, d3.forceCollide(), function(d) { return d.type === 'school' ; }).radius(function(d) { return d.r + 2; }).iterations(2).strength(0.8)) 
    .force('collideNoSchool', isolate(data, d3.forceCollide(), function(d) { return d.type === 'noSchool' ; }).radius(function(d) { return d.r +2; }).iterations(2).strength(0.8)) 

    // d3.interval(function() {
    //   console.log('bomb')
    //   d3.forceSimulation(data)
    //     .alphaTarget(0.2)
    //     .force('bombX', d3.forceX(function(d,i) { return Math.sin(i) * width + width*Math.random();} ))
    //     .force('bombY', d3.forceY(function(d,i) { return Math.cos(i) * height + width*Math.random();} ))
    //     .velocityDecay(0.6)
    //     .stop()
    //     .tick();
    // }, 10000);

  d3.selectAll('circle')
    .on("mousedown", function() { 
      console.log('mouse')
      d3.forceSimulation(data)
        .alphaTarget(0.5)
        .force('bombX', d3.forceX(function(d,i) { return Math.sin(i) * 400 + width/2;} ).strength(-0.5))
        .force('bombY', d3.forceY(function(d,i) { return Math.cos(i) * 400 + height/2;} ).strength(0.5))
        .velocityDecay(0.5)
        .stop()
        .tick();
    });

}

export function disrupt(force, data, {width, height}, ratio) {
  console.log('disrupt')
  
  force
    .alphaTarget(0.5)
    .velocityDecay(0.3)
    .force('xSchool', isolate(data, d3.forceX(width/2), function(d) { return d.id < ratio * data.length; }).strength(function(d,i) { return d.id/(data.length*8); }))
    .force('ySchool', isolate(data, d3.forceY(height/2), function(d) { return d.id < ratio * data.length; }).strength(function(d,i) { return d.id/(data.length*8); }))
    .force('xNoSchool', isolate(data, d3.forceX(function(d,i) { return Math.sin(i) * 250 + (width/2);} ), function(d) { return d.id > ratio * data.length; }).strength(0.1))      
    .force('yNoSchool', isolate(data, d3.forceY(function(d,i) { return Math.cos(i) * 250 + (height/2);} ), function(d) { return d.id > ratio * data.length; }).strength(0.1))  
    .force('collideSchool', isolate(data, d3.forceCollide(), function(d) { return d.id < ratio * data.length; }).radius(function(d) { return d.r; }).iterations(2).strength(0.8))
    .force('collideNoSchool', isolate(data, d3.forceCollide(), function(d) { return d.id > ratio * data.length; }).radius(function(d) { return d.r; }).iterations(2).strength(0.5))
  
}

