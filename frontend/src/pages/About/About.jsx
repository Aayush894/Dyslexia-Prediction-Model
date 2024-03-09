import Navbar from "../../components/NavBar/NavBar.jsx";
import Footer from "../../components/Footer";

function About() {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
        {/* about us*/}
        <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4 mb-20">
          <h3 className=" row mb-12 display-5 justify-content-center">
            About us
          </h3>
          <div className="lg:w-10/12 w-full">
            <h2 className="xl:w-8/12 lg:w-10/12 w-full font-bold text-gray-800 lg:text-4xl text-3xl lg:leading-10 leading-9 mt-2">
            Empowering Futures, Illuminating Paths: Where Innovation Meets Compassion in Dyslexia Detection!
            </h2>
            <p className="font-normal text-base leading-6 text-gray-600 mt-6">
              we are a dedicated team committed to making a positive impact through cutting-edge technology. Specializing in predictive modeling for dyslexia, our passionate team of experts leverages innovative approaches to create a state-of-the-art Dyslexia Prediction Model. We believe in the power of technology to transform lives, and our mission is to develop accurate and accessible tools that enhance dyslexia detection. With a focus on excellence and inclusivity, we strive to contribute to a brighter future for individuals with dyslexia and empower communities through our groundbreaking work.
            </p>
          </div>

          <div className="lg:mt-14 sm:mt-10 mt-12">
            <img
              className="lg:block hidden w-full"
              src="https://i.ibb.co/GvwJnvn/Group-736.png"
              alt="Group of people Chilling"
            />
            <img
              className="lg:hidden sm:block hidden w-full"
              src="https://i.ibb.co/5sZTmHq/Rectangle-116.png"
              alt="Group of people Chilling"
            />
            <img
              className="sm:hidden block w-full"
              src="https://i.ibb.co/zSxXJGQ/Rectangle-122.png"
              alt="Group of people Chilling"
            />
          </div>

          <div className="lg:mt-16 sm:mt-12 mt-16 flex lg:flex-row justify-between flex-col lg:gap-8 gap-12">
            <div className="w-full xl:w-5/12 lg:w-6/12">
              <h2 className="font-bold lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-800">
                Our Mission
              </h2>
              <p className="font-normal text-base leading-6 text-gray-600 mt-4">
                Our mission is to revolutionize dyslexia detection and create a positive impact on the lives of children and their families. We are committed to leveraging advanced predictive modeling to identify dyslexia in its early stages, providing timely interventions and support.

                Our primary goal is to bring awareness to dyslexia, a neurodevelopmental disorder that can significantly impact a child's academic journey. By harnessing the power of data-driven insights, we aim to develop an accurate Dyslexia Prediction Model that can efficiently identify potential indicators of dyslexia in children.

                We recognize the critical role parents play in a child's development, and we strive to empower them with knowledge and understanding. Through our predictive model, we aspire to create a bridge between technology and parental awareness, ensuring that parents are informed about the possibility of dyslexia in their child.

                

                
              </p>
              <p className="font-normal text-base leading-6 text-gray-600 mt-6">
                we are dedicated to shaping a future where every child has the opportunity to reach their full potential, unencumbered by undiagnosed dyslexia. Through our innovative approach, we aim to contribute to a world that values neurodiversity and provides equal opportunities for every child, regardless of their unique learning profile.

               By fostering early detection, we believe we can enhance the educational experience for children with dyslexia, providing tailored support that allows them to thrive academically and personally. Our mission extends beyond prediction; it encompasses advocacy, education, and support for families navigating the complexities of dyslexia.
              </p>
            </div>
            <div className="lg:flex items-center w-full lg:w-1/2 ">
              <img
                className="lg:block hidden w-full"
                src="https://bollybits.in/wp-content/uploads/2022/03/l_1646791325.jpeg"
                alt="people discussing on board"
              />
              <img
                className="lg:hidden sm:block hidden w-full h-3/4"
                src="https://bollybits.in/wp-content/uploads/2022/03/l_1646791325.jpeg"
                alt="people discussing on board"
              />
              <img
                className="sm:hidden block w-full"
                src="https://bollybits.in/wp-content/uploads/2022/03/l_1646791325.jpeg"
                alt="people discussing on board"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default About;
