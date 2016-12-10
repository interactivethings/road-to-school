
import * as d3 from 'd3';
import {isolate, getVariation} from './utils/forceHelpers';
const R = 350;

//width of SVG: width * 0.7
//height of SVG: height * 0.7 

export function baseline(force, data, {width, height}) { 
  // console.log('baseline')

  force
    .force('xSchool', isolate(data, d3.forceX(width*0.7/2), function(d) { return d.type === 'school' ; }))
    .force('ySchool', isolate(data, d3.forceY(height*0.8/2), function(d) { return d.type === 'school' ; }))
    .force('xNoSchool', isolate(data, d3.forceX(width*0.7/2), function(d) { return d.type === 'noSchool' ; }))      
    .force('yNoSchool', isolate(data, d3.forceY(height*0.8/2), function(d) { return d.type === 'noSchool' ; }))
    .force('collideSchool', isolate(data, d3.forceCollide(), function(d) { return d.type === 'school' ; }).radius(function(d) { return d.r * 2; }).strength(0.8)) 
    .force('collideNoSchool', isolate(data, d3.forceCollide(), function(d) { return d.type === 'noSchool' ; }).radius(function(d) { return d.r * 2; }).strength(0.8)) 
    .force("charge", d3.forceManyBody().strength(0.02))
    .velocityDecay(0.3 )
    .alphaTarget(0.3);
}

export function outOfSchool(force, data, {width, height}) {

    force
        .force('xSchool', 
            isolate(data, d3.forceX(width*0.7/2), function(d) { return d.type === 'school' ; })
            .strength(0.2))
        .force('ySchool', 
            isolate(data, d3.forceY(height*0.8/2), function(d) { return d.type === 'school' ; })
            .strength(0.2))
        .force('xNoSchool', 
            isolate(data, d3.forceX(function(d) { return Math.sin(d.id) * R + (width*0.7/2);}), function(d) { return d.type === 'noSchool'; })
            .strength(0.1 * getVariation(1,2)))      
        .force('yNoSchool', 
            isolate(data, d3.forceY(function(d) { return Math.cos(d.id) * R + (height*0.8/2);} ), function(d) { return d.type === 'noSchool'; })
            .strength(0.1 * getVariation(1,2)))  
        .force('collideSchool', 
            isolate(data, d3.forceCollide(), function(d) { return d.type === 'school' ; }).radius(function(d) { return d.r * 2; }).strength(0.6)) 
        .force('collideNoSchool', 
            isolate(data, d3.forceCollide(), function(d) { return d.type === 'noSchool' ; }).radius(function(d) { return d.r * 1.2; }).strength(0.4)) 
        .force("charge", d3.forceManyBody().strength(0.2))
        .alphaTarget(0.6)
        .velocityDecay(0.34);


    d3.selectAll('circle').on('mousedown', function(d){

        d3.forceSimulation()
        .force('perturbationX', isolate(data, d3.forceX(width*0.7/2), function(d) { return d.type === 'noSchool' && d.id === Math.floor(getVariation(1, data.length)) ; }).strength(0.4))  
        .force('perturbationY', isolate(data, d3.forceY(height*0.8/2), function(d) { return d.type === 'noSchool' && d.id === Math.floor(getVariation(1, data.length)) ; }).strength(0.4))        
        .alphaTarget(0.2)
        .velocityDecay(0.2)
        .stop()
        .tick();

    })

}

export function backToSchool(force, data, {width, height}) {
  // console.log('backToSchool')
  
  force
    .force('xSchool', isolate(data, d3.forceX(width*0.7/2), function(d) { return d.type === 'school' ; }))
    .force('ySchool', isolate(data, d3.forceY(height*0.8/2), function(d) { return d.type === 'school' ; }))
    .force('xNoSchool', isolate(data, d3.forceX(width*0.7/2), function(d) { return d.type === 'noSchool' ; })
        .strength(0.4))      
    .force('yNoSchool', isolate(data, d3.forceY(height*0.8/2), function(d) { return d.type === 'noSchool' ; })
        .strength(0.4))
    .force('collideSchool', isolate(data, d3.forceCollide(), function(d) { return d.type === 'school' ; })
        .radius(function(d) { return d.r * 3; }).strength(0.5)) 
    .force('collideNoSchool', isolate(data, d3.forceCollide(), function(d) { return d.type === 'noSchool' ; })
        .radius(function(d) { return d.r * 3; }).strength(0.5)) 
    .velocityDecay(0.6)
    .alphaTarget(0.8);

}

export function bombForce(force, data, {width, height}) {
    d3.interval(function(){
    //     console.log('bomb');
    //     var bombForce = d3.forceSimulation(data);
    //     bombForce.force('bombX', d3.forceX(function(d,i) { return Math.sin(i) *  R * getVariation(1,1.2) + width*0.7/2 * getVariation(0.9,1.2);} ).strength(-0.1))
    //     .force('bombY', d3.forceY(function(d,i) { return Math.cos(i) * R * getVariation(1,1.2) + height*0.8/2 * getVariation(0.9,1.2);} ).strength(-0.1))
    //     .alphaTarget(0.5)
    //     .velocityDecay(0.8)
    //     .stop()
    //     .tick();
        
    }, 5000);
}