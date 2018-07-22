import React, { Fragment } from 'react';

import { Fullpage, HorizontalSlider, Slide } from 'fullpage-react'
import Menu from '../components/Menu'
import Bottom from '../components/BottomMenu'
import SplitGrid from '../components/SplitGrid'


const { changeFullpageSlide, changeHorizontalSlide } = Fullpage


const fullPageOptions = {
  // for mouse/wheel events
  // represents the level of force required to generate a slide change on non-mobile, 0 is default
  scrollSensitivity: 2,

  // for touchStart/touchEnd/mobile scrolling
  // represents the level of force required to generate a slide change on mobile, 0 is default
  touchSensitivity: 2,
  scrollSpeed: 300,
  resetSlides: true,
  hideScrollBars: true,
  enableArrowKeys: true,

  // optional, set the initial vertical slide
  activeSlide: 0
};

const topNavStyle = {
  textAlign: 'center',
  position: 'fixed',
  width: '100%',
  cursor: 'pointer',
  zIndex: 10,
  backgroundColor: 'rgba(255, 255, 255, 0.4)',
  top: '0px'
};

const horizontalNavStyle = {
  position: 'absolute',
  width: '100%',
  top: '50%',
  zIndex: 10
};

const horizontalSliderProps = {
  name: 'horizontalSlider1',
  infinite: true
};

class FullpageReact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: {
        Fullpage: 0,
        horizontalSlider1: 0
      }
    };

    this.onSlideChangeStart = this.onSlideChangeStart.bind(this);
    this.onSlideChangeEnd = this.onSlideChangeEnd.bind(this);
  }

  onSlideChangeStart(name, props, state, newState) {
    if (!this.horizontalNav) {
      this.horizontalNav = document.getElementById('horizontal-nav');
    }

    if (name === 'horizontalSlider1') {
      scrollNavStart(this.horizontalNav);
    }
  }

  onSlideChangeEnd(name, props, state, newState) {
    if (name === 'horizontalSlider1') {
      scrollNavEnd(this.horizontalNav);
    }

    const oldActive = this.state.active;
    const sliderState = {
      [name]: newState.activeSlide
    };

    const updatedState = Object.assign(oldActive, sliderState);
    this.setState(updatedState);
  }

  componentDidMount() {

  }

  render() {
    const { active } = this.state;
    

    const currentActive = active.Fullpage;
    const prevSlide = changeFullpageSlide.bind(null, currentActive - 1);
    const nextSlide = changeFullpageSlide.bind(null, currentActive + 1);
    const goToTop = changeFullpageSlide.bind(null, 0);
    const goToSlide =  (slide) =>   {
        changeFullpageSlide(slide)
    }

    const horizontalSliderName = horizontalSliderProps.name;
    const horizontalActive = this.state.active[horizontalSliderName];

    const prevHorizontalSlide = changeHorizontalSlide.bind(null, horizontalSliderName, horizontalActive - 1);
    const nextHorizontalSlide = changeHorizontalSlide.bind(null, horizontalSliderName, horizontalActive + 1);

    const topNav = (
      <div style={topNavStyle}>
        <span onClick={prevSlide}>
          <button>Previous Slide</button>
        </span>
        <span onClick={goToTop}>
          <button>Back to Top</button>
        </span>
        <span onClick={nextSlide}>
          <button>Next Slide</button>
        </span>
      </div>
    );

    const horizontalNav = (
      <div id='horizontal-nav' style={horizontalNavStyle}>
        <span onClick={prevHorizontalSlide}><button>PREV</button></span>
        <span style={{position: 'absolute', right: '0px'}} onClick={nextHorizontalSlide}><button>Next</button></span>
      </div>
    );

    const horizontalSlides = [
      <Slide style={{backgroundColor: 'red'}}><p>Horizontal 1</p></Slide>,
      <Slide style={{backgroundColor: 'yellow'}}><p>Horizontal 2</p></Slide>,
      <Slide style={{backgroundColor: 'green'}}><p>Horizontal 3</p></Slide>,
    ];
    horizontalSliderProps.slides = horizontalSlides;

    const horizontalSlider = <HorizontalSlider id='horizontal-slider-1' {...horizontalSliderProps}>{horizontalNav}</HorizontalSlider>;

    const verticalSlides = [
      <Slide style={{backgroundColor: 'blue'}}>
      <SplitGrid />
      </Slide>,
      horizontalSlider,
      <Slide><SplitGrid /></Slide>,
      <Slide style={{backgroundColor: 'white'}}><p>Slide 4</p></Slide>,
      <Slide style={{backgroundColor: 'black'}}><p>Slide 5</p></Slide>,
      <Slide style={{backgroundColor: 'pink'}}><p>Slide 6</p></Slide>,
      <Slide style={{backgroundColor: 'white'}}><p>Slide 7</p></Slide>,
      <Slide style={{backgroundColor: 'black'}}><p>Slide 8</p></Slide>,
    ];
    fullPageOptions.slides = verticalSlides;

    return (
      <Fragment>
      <Menu  prevSlide={prevSlide} nextSlide={nextSlide} goToTop={goToTop} goToSlide={goToSlide} page={active.Fullpage}/>
      <Fullpage onSlideChangeStart={this.onSlideChangeStart} onSlideChangeEnd={this.onSlideChangeEnd} {...fullPageOptions} >




      </Fullpage>
      <Bottom prevSlide={prevSlide} nextSlide={nextSlide} goToTop={goToTop} goToSlide={goToSlide} page={active.Fullpage}/>
      </Fragment>
    );
  }
}

function scrollNavStart(nav) {
  // make the nav fixed when we start scrolling horizontally
  nav.style.position = 'fixed';
}

function scrollNavEnd(nav) {
  // make the nav absolute when scroll finishes
  nav.style.position = 'absolute';
}

export default FullpageReact;