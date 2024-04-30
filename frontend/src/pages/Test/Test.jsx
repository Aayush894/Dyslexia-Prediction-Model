/* eslint-disable react/no-unescaped-entities */
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar/NavBar";

import { Link } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

import './test.css';

function Test() {
  return (
    <>
      <div>
        <NavBar />
      </div>
      {/* className="m-5 p-2 transform  transition duration-200 hover:scale-125 hover:bg-blue-600 " */}
      <div className="outer-card-component">
        <div className = "card-component">
          <Link to="/test/imagePrediction">
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="/assets/Image.jpg"
                  alt="image"
                />
                <CardContent className="bg-blue-500">
                  <Typography gutterBottom variant="h5" component="div">
                    Image Test
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Revolutionizing Evaluation: This test module analyzes
                    handwritten documents, providing instant scores for a
                    seamless and efficient assessment experience.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        </div>
        <div className = "card-component">
          <Link to="/test/textPrediction">
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="/assets/Text.jpg"
                  alt="image"
                />

                <CardContent className="bg-blue-500">
                  <Typography gutterBottom variant="h5" component="div">
                    Text Test
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Assess your writing effortlessly. This test module analyzes
                    your text document, identifies errors, and generates a score
                    – a quick, efficient way to check mistakes.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        </div>
        <div className = "card-component">
          <Link to="/test/quiz">
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="/assets/Quiz.jpg"
                  alt="image"
                />
                <CardContent className="bg-blue-500">
                  <Typography gutterBottom variant="h5" component="div">
                    Quiz Test
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Revolutionizing Evaluation: This test module analyzes
                    handwritten documents, providing instant scores for a
                    seamless and efficient assessment experience.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        </div>
        <div className = "card-component">
          <Link to="/test/survey">
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="/assets/family.jpg"
                  alt="image"
                />
                <CardContent className="bg-blue-500">
                  <Typography gutterBottom variant="h5" component="div">
                    Parent Survey
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Assessing Your Child's Strengths: This test module processes
                    your child's audio, providing a personalized score for a
                    comprehensive evaluation.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default Test;
