/* eslint-disable no-param-reassign */
import React, { Component } from 'react';
import Gallery from 'react-grid-gallery';
import Images from '../../enums/images';

class GalleryPage extends Component {
  render() {
    const captionStyle = {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      maxHeight: '240px',
      overflow: 'hidden',
      position: 'absolute',
      bottom: '0',
      width: '100%',
      color: 'white',
      padding: '2px',
      fontSize: '90%',
    };
    const images = Images.map((i) => {
      i.customOverlay = (
        <div style={captionStyle}>
          <div>{i.caption}</div>
        </div>
      );
      return i;
    });
    return (
      <div>
        <h2 style={{ textAlign: 'center' }}>Gallery</h2>
        <Gallery images={images} backdropClosesModal />
      </div>
    );
  }
}

export default GalleryPage;
