import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

const slideImages = [
  {
    url: 'https://ke.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/48/478544/1.jpg?1955',
    caption: 'Slide 1'
  },
  {
    url: 'https://ke.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/69/820907/1.jpg?8618',
    caption: 'Slide 2'
  },
  {
    url: 'https://ke.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/24/467116/1.jpg?6912',
    caption: 'Slide 3'
  },
];

const Slideshow = () => {
    return (
      <div className="slide-container">
        <Slide>
         {slideImages.map((slideImage, index)=> (
            <div className="each-slide" key={index}>
              <div style={{'backgroundImage': `url(${slideImage.url})`}}>
                <img src={slideImage.url} alt={slideImage.caption} />
              </div>
            </div>
          ))} 
        </Slide>
      </div>
    )
}

export default Slideshow