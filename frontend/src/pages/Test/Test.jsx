import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar/NavBar";

import { Link } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

function Test() {
  return (
    <>
      <div>
        <NavBar />
      </div>
      <div className="d-flex">
        <div className="m-5 p-2 transform  transition duration-300 hover:scale-125 hover:bg-blue-600 ">
          <Link to="/test/imagePrediction">
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="./public/assets/Image.jpg"
                  alt="image"
                />
                <CardContent className="bg-blue-500">
                  <Typography gutterBottom variant="h5" component="div">
                    Image Test
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                  Revolutionizing Evaluation: This test module analyzes handwritten documents, providing instant scores for a seamless and efficient assessment experience.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        </div>
        <div className="m-5 p-2 transform  transition duration-200 hover:scale-125 hover:bg-blue-600 ">
          <Link to="/test/audioPrediction">
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="./public/assets/Audio1.jpg"
                  alt="image"
                />
                <CardContent className="bg-blue-500">
                  <Typography gutterBottom variant="h5" component="div">
                    Audio Test
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                  Assessing Your Child's Strengths: This test module processes your child's audio, providing a personalized score for a comprehensive evaluation.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        </div>
        <div className="m-5 p-2 transform  transition duration-200 hover:scale-125 hover:bg-blue-600 ">
          <Link to="/test/textPrediction">
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="./public/assets/Text.avif"
                  alt="image"
                />

                <CardContent className="bg-blue-500">
                  <Typography gutterBottom variant="h5" component="div">
                    Text Test
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                  Assess your writing effortlessly. This test module analyzes your text document, identifies errors, and generates a score – a quick, efficient way to check mistakes.
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
