import React from 'react'
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import img1 from "../Images/slider-01.jpg"
// import img2 from "../Images/slider-02.jpg"
// import img3 from "../Images/slider-03.jpg"



export default function Banner() {
  return (
    <div>
      <div className='container-fluid' >


        <div className="row">
          <div className="col-12">
            <Carousel>

              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="./public/assets/disgraphia1.png"
                  alt="First slide"

                />
                <Carousel.Caption>
                  <h3 class='text-dark'>First slide label</h3>
                  <p class='text-dark'>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="./public/assets/disgraphia1.png"
                  alt="Second slide"
                />

                <Carousel.Caption>
                  <h3 class='text-dark'>Second slide label</h3>
                  <p class='text-dark'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="./public/assets/disgraphia1.png"
                  alt="Third slide"
                />
                <Carousel.Caption>
                  <h3 class='text-dark'>Third slide label</h3>
                  <p class='text-dark'>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
              </Carousel.Item>

            </Carousel>
          </div>
        </div>
      </div>
    </div>
  )
}
