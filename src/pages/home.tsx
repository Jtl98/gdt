import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router";
import whiteNoiseImage from "../assets/whiteNoiseImage.png";

export default function Home() {
  return (
    <Container maxWidth="md">
      <Typography align="center" gutterBottom variant="h2">
        game dev tools
      </Typography>

      <Stack direction="row" justifyContent="center" marginBottom={2}>
        <Card>
          <CardActionArea component={Link} to="/gdt/textures">
            <CardMedia
              alt="white noise texture"
              component="img"
              image={whiteNoiseImage}
              width={256}
              height={256}
            />

            <CardContent>
              <Typography variant="h6">generate textures</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Stack>
    </Container>
  );
}
