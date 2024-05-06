import { 
    Typography,      
    Card,
    CardContent,
    CardMedia,
    Stack 
} from "@mui/material";
import workout_img_2 from '../assets/workout_img_2.jpg';


export default function Home() {
    
    
    return(
        <>
            <Card>
            <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            >
                <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={0}
                >
                    <CardMedia
                    style={{ width: '550px'}}
                    image={workout_img_2}
                    title = "Workout illustration"
                    component="img"
                    />
                    <Typography variant="caption" align="center">
                        <a href="https://www.freepik.com/free-vector/stretching-exercises-concept-illustration_25182825.htm#fromView=search&page=2&position=26&uuid=73bbe615-8dda-457a-b6a2-f2cf415aef59">
                            Image by storyset on Freepik
                        </a>
                    </Typography>
                </Stack>
                <CardContent>
                    <Typography gutterBottom variant="h3" component="div">
                        Welcome to TrainMate! 
                    </Typography>
                    <Typography variant="body1">
                        We offer a comprehensive suite of services designed to streamline your fitness business. From managing customer lists to scheduling trainings and visualizing your calendar, our platform empowers you to stay organized and efficient in one place.   
                    </Typography>
                </CardContent>
            </Stack>

        </Card>
        </>
    );
}