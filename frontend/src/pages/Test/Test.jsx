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
        <div className="m-5 p-2">
          <Link to="/test/imagePrediction">
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://assets-global.website-files.com/5a9423a3f702750001758d4f/60eef1e484ba20a41ad763bf_%230592D0%20(1).png"
                  alt="image"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Image Prediction
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Laudantium quod rerum sint voluptas quibusdam. Unde rem
                    quasi illo molestiae expedita.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        </div>
        <div className="m-5 p-2">
          <Link to="/test/audioPrediction">
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://assets-global.website-files.com/5a9423a3f702750001758d4f/60eef1e484ba20a41ad763bf_%230592D0%20(1).png"
                  alt="image"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Audio Prediction
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Laudantium quod rerum sint voluptas quibusdam. Unde rem
                    quasi illo molestiae expedita.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        </div>
        <div className="m-5 p-2">
          <Link to="/test/textPrediction">
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://assets-global.website-files.com/5a9423a3f702750001758d4f/60eef1e484ba20a41ad763bf_%230592D0%20(1).png"
                  alt="image"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Text Prediction
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Laudantium quod rerum sint voluptas quibusdam. Unde rem
                    quasi illo molestiae expedita.
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
