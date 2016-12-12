
import * as d3 from 'd3';
import {isolate, getVariation} from './utils/forceHelpers';
const R = 350;

//width of SVG: width * 0.7
//height of SVG: height * 0.8 

export function baseline(force, data, {width, height}) { 
  // console.log('baseline')
  force
    .force("charge", d3.forceManyBody().strength(0.02)) 
    .alphaTarget(0.3)
    .velocityDecay(0.5);

}

export function outOfSchool(force, data, {width, height}) {

  force
    .force('yNoSchool',  isolate(data, d3.forceY(function(d) { return  (height*0.8 - 20);} ), function(d) { return d.type === 'noSchool'; })
            .strength(0.8)) 
    .force('collideNoSchool', 
            isolate(data, d3.forceCollide(), function(d) { return d.type === 'noSchool' ; }).radius(20).strength(0.4))  
    .force("charge", d3.forceManyBody().strength(0.02)) 
    .alphaTarget(0.3)
    .velocityDecay(0.5);

}

export function bomb(data, {width, height}) {
    // console.log(' bomb')
    d3.forceSimulation()
    .force('bombX', isolate(data, d3.forceX(function(d) { 
        var dx = Math.abs(width/2 * 0.7 - d.x); 
        return dx;
    }), function(d) { 
        return d; 
    })
    .strength(-0.1)) 
    .force('bombY', isolate(data, d3.forceY(function(d) { 
        var dy = Math.abs(height/2 * 0.8 - d.y); 
        return dy;
    }), function(d) { 
        return d; 
    })
    .strength(-0.1)) 
    .alphaTarget(0.5)
    .velocityDecay(0.5)
    .stop()
    .tick();
}

export function perturbation(data, {width, height}) {
    // console.log('I want to back to schooool')
    d3.forceSimulation()
    .force('perturbationX', isolate(data, d3.forceX(width*0.7/2), function(d) { return d.type === 'noSchool' && d.id === Math.floor(getVariation(1, data.length)) ; }).strength(0.2))  
    .force('perturbationY', isolate(data, d3.forceY(height*0.8/2), function(d) { return d.type === 'noSchool' && d.id === Math.floor(getVariation(1, data.length)) ; }).strength(0.2))        
    .alphaTarget(0.5)
    .velocityDecay(0.5)
    .stop()
    .tick();
}

export function whileAndQuestion(force, data, {width, height}) {
    force
    .force('xSchool', isolate(data, d3.forceX(width*0.7/2), function(d) { return d.type === 'school' ; }))
    .force('ySchool', isolate(data, d3.forceY(height*0.8/2), function(d) { return d.type === 'school' ; }))   
    .force('collideSchool', 
        isolate(data, d3.forceCollide(), function(d) { return d.type === 'school' ; }).radius(10).strength(0.5)) 
    .force('collideNoSchool', 
        isolate(data, d3.forceCollide(), function(d) { return d.type === 'noSchool' ; }).radius(10).strength(0.4)) 
    .force("charge", d3.forceManyBody().strength(0.02)) 
    .alphaTarget(0.3)
    .velocityDecay(0.3);
}

export function backToSchool(force, data, {width, height}) {
  // console.log('backToSchool')
  
  force
    .force('xSchool', isolate(data, d3.forceX(width*0.7/2), function(d) { return d.type === 'school' ; }))
    .force('ySchool', isolate(data, d3.forceY(height*0.8/2), function(d) { return d.type === 'school' ; }))
    .force('xNoSchool', isolate(data, d3.forceX(width*0.7/2), function(d) { return d.type === 'noSchool' ; })
        .strength(0.1))      
    .force('yNoSchool', isolate(data, d3.forceY(height*0.8/2), function(d) { return d.type === 'noSchool' ; })
        .strength(0.1))
    .force('collideSchool', isolate(data, d3.forceCollide(), function(d) { return d.type === 'school' ; })
        .radius(30).strength(0.2)) 
    .force('collideNoSchool', isolate(data, d3.forceCollide(), function(d) { return d.type === 'noSchool' ; })
        .radius(30).strength(0.2)) 
    // .force("charge", d3.forceManyBody().strength(0.1))
    .velocityDecay(0.3)
    .alphaTarget(0.3);

}