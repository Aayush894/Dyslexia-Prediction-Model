import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Banner() {
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <Carousel>
              <Carousel.Item>
                <img
                  className="d-block w-100 rounded-md border-2 "
                  src="/assets/disgraphia3.png"
                  alt="First slide"
                />
                {/* <Carousel.Caption >
                  <h3 className='text-dark justify-center'>First slide label</h3>
                  <p className='text-dark'>Unlocking Potential, Embracing Differences: Advocating for a Dyslexia-Inclusive Future.</p>
                </Carousel.Caption> */}
              </Carousel.Item>

              <Carousel.Item>
                <img
                  className="d-block w-100 rounded-md border-2 "
                  src="/assets/disgraphia2.jpg"
                  alt="Second slide"
                />

                {/* <Carousel.Caption>
                  <h3 className="text-dark justify-center">Second slide label</h3>
                  <p className="text-dark">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </Carousel.Caption> */}
              </Carousel.Item>

              <Carousel.Item>
                <img
                  className="d-block w-100 rounded-md border-2"
                  src="assets/disgraphia1.png"
                  alt="Third slide"
                />
                {/* <Carousel.Caption>
                  <h3 className="text-dark justify-center">Third slide label</h3>
                  <p className="text-dark">
                    Praesent commodo cursus magna, vel scelerisque nisl
                    consectetur.
                  </p>
                </Carousel.Caption> */}
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}
