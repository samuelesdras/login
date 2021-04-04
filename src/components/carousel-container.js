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
                    <h3>Leonidas </h3>  
                    <h6>Rei de Esparta</h6>  
                  </Carousel.Caption>
                  </Carousel.Item  >  
                  <Carousel.Item className="carousel__frame">  
                    <img 
                      className="d-block w-100 carousel__image"
                      src="teste2.jpg"
                    />  
                  <Carousel.Caption>  
                    <h3>Miamotto Mussashi</h3>  
                    <h6>Samurai lendário</h6>  
                  </Carousel.Caption>
                  </Carousel.Item>  
                  <Carousel.Item className="carousel__frame">  
                    <img 
                      className="d-block w-100 carousel__image"
                      src="teste3.jpg"
                    />  
                   <Carousel.Caption>  
                    <h3>Oda Nobunaga</h3>  
                    <h6>Daimyo no período Sengoku</h6>  
                  </Carousel.Caption>
                  </Carousel.Item>  
              </Carousel>  
            </div>  
          </div>  
          );
  }

export default BootstrapCarousel  