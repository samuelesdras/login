import React, { Component } from 'react'  
import Carousel from 'react-bootstrap/Carousel';
import './style.scss';

const BootstrapCarousel = () => {  
    return (  
          <div>  
            <div className='container-fluid' >  
              <Carousel>  
                <Carousel.Item className="carousel__frame" >  
                  <img 
                    className="d-block w-100 carousel__image"
                    src="teste.jpeg"
                  />  
                  <Carousel.Caption>  
                    <h3>Slide 1 </h3>  
                    <h6>This space is to explain the meaning of the image on slide 1</h6>  
                  </Carousel.Caption>
                  </Carousel.Item  >  
                  <Carousel.Item className="carousel__frame">  
                    <img 
                      className="d-block w-100 carousel__image"
                      src="teste2.jpg"
                    />  
                  <Carousel.Caption>  
                    <h3>Slide 2 </h3>  
                    <h6>This space is to explain the meaning of the image on slide 2</h6>  
                  </Carousel.Caption>
                  </Carousel.Item>  
                  <Carousel.Item className="carousel__frame">  
                    <img 
                      className="d-block w-100 carousel__image"
                      src="teste3.jpg"
                    />  
                   <Carousel.Caption>  
                    <h3>Slide 3 </h3>  
                    <h6>This space is to explain the meaning of the image on slide 3</h6>  
                  </Carousel.Caption>
                  </Carousel.Item>  
              </Carousel>  
            </div>  
          </div>  
          );
  }

export default BootstrapCarousel  