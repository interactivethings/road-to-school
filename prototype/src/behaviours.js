/**
 * Behaviours mutate data for performance reasons
 */

import * as d3 from 'd3';
import {isolate, getVariation} from './utils/forceHelpers';

const R = 350;

export function baseline(force, data, {width, height}) { 
  console.log('baseline')

  force
    .force('xSchool', isolate(data, d3.forceX(width/2), function(d) { return d.type === 'school' ; }))
    .force('ySchool', isolate(data, d3.forceY(height/2), function(d) { return d.type === 'school' ; }))
    .force('xNoSchool', isolate(data, d3.forceX(width/2), function(d) { return d.type === 'noSchool' ; }))      
    .force('yNoSchool', isolate(data, d3.forceY(height/2), function(d) { return d.type === 'noSchool' ; }))
    .force('collideSchool', isolate(data, d3.forceCollide(), function(d) { return d.type === 'school' ; }).radius(function(d) { return d.r + 2; }).iterations(2).strength(0.8)) 
    .force('collideNoSchool', isolate(data, d3.forceCollide(), function(d) { return d.type === 'noSchool' ; }).radius(function(d) { return d.r +2; }).iterations(2).strength(0.8)) 
    .velocityDecay(0.3 )
    .alphaTarget(0.3);
}

export function outOfSchool(force, data, {width, height}) {
  console.log('outOfSchool')
  
  force
    .force('xSchool', isolate(data, d3.forceX(width/2), function(d) { return d.type === 'school' ; }).strength(function(d,i) { return d.id/(data.length*8); }))
    .force('ySchool', isolate(data, d3.forceY(height/2), function(d) { return d.type === 'school' ; }).strength(function(d,i) { return d.id/(data.length*8); }))
    .force('xNoSchool', isolate(data, d3.forceX(function(d,i) { return Math.sin(i) * R * getVariation(0.8,1) + (width/2);} ), function(d) { return d.type === 'noSchool'; }).strength(0.2))      
    .force('yNoSchool', isolate(data, d3.forceY(function(d,i) { return Math.cos(i) * R * getVariation(0.8,1) + (height/2);} ), function(d) { return d.type === 'noSchool'; }).strength(0.2))  
    .force('collideSchool', isolate(data, d3.forceCollide(), function(d) { return d.type === 'school'; }).radius(3).iterations(2).strength(0.8))
    .force('collideNoSchool', isolate(data, d3.forceCollide(), function(d) {return d.type === 'noSchool'; }).radius(0.1).iterations(2).strength(0.5))
    .alphaTarget(0.8)
    .velocityDecay(0.3);

    d3.interval(function(){
        console.log('bomb')

        var bombForce = d3.forceSimulation(data);
        bombForce.force('bombX', d3.forceX(function(d,i) { return Math.sin(i) *  R * getVariation(1,1.2) + width/2 * getVariation(0.9,1.2);} ).strength(-0.1))
        .force('bombY', d3.forceY(function(d,i) { return Math.cos(i) * R * getVariation(1,1.2) + height/2 * getVariation(0.9,1.2);} ).strength(-0.1))
        .alphaTarget(0.2)
        .velocityDecay(0.8)
        .stop()
        .tick();

    }, 5000);

}

export function backToSchool(force, data, {width, height}) {
  console.log('backToSchool')
  
  force
    .force('xSchool', isolate(data, d3.forceX(width/2), function(d) { return d.type === 'school' ; }).strength(0.8))
    .force('ySchool', isolate(data, d3.forceY(height/2), function(d) { return d.type === 'school' ; }).strength(0.8))
    .force('xNoSchool', isolate(data, d3.forceX(width/2), function(d) { return d.type === 'noSchool' ; }).strength(0.8))      
    .force('yNoSchool', isolate(data, d3.forceY(height/2), function(d) { return d.type === 'noSchool' ; }).strength(0.8))
    .force('collideSchool', isolate(data, d3.forceCollide(), function(d) { return d.type === 'school' ; }).radius(function(d) { return 2* d.r; }).iterations(2).strength(0.8)) 
    .force('collideNoSchool', isolate(data, d3.forceCollide(), function(d) { return d.type === 'noSchool' ; }).radius(function(d) { return 2* d.r; }).iterations(2).strength(0.8))
    .velocityDecay(0.7)
    .alphaTarget(0.8); 

}
