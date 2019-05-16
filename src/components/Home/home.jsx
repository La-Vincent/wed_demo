import React, { Component } from 'react';
import './home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
    this.backgroundImageRef = null;
    this.setBackgroundImageRef = element => {
      this.backgroundImageRef = element
    }
  }

  componentDidMount() {
    //checks if image is loaded
    //if loaded remove spinner and fade in image
    if (this.backgroundImageRef.style.backgroundImage) {
      const url = this.backgroundImageRef.style.backgroundImage.match(/\((.*?)\)/)[1].replace(/('|")/g, '');
      const image = new Image();
      image.onload = () => {
        this.backgroundImageRef.animate([
          { // from
            opacity: 0,
          },
          { // to
            opacity: 1,
          }
        ], {duration: 500, easing: 'linear'})
        this.setState({ isLoading: false })
      }
      image.src = url;
      if (image.complete) {
        image.onload();
      }
    }
  }

  generateSpinner() {
    return (
      <div className="spinner-container">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    )
  }

  render() {

    const style = {
      backgroundImage: `url(${process.env.PUBLIC_URL}/splash.jpg)`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      height: '100%',
      width: '100%'
    };
    return (
      <div className="home-body">
        {this.state.isLoading ? this.generateSpinner() : '' }
        <div ref={this.setBackgroundImageRef} className="mobile-home-body-splash fade-in" style={style}></div>
        <img className="desktop-home-body-splash fade-in" src={`${process.env.PUBLIC_URL}/splash.jpg`}/>
      </div>
    );
  }
}

export default Home;