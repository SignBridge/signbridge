import React from "react";
import Title from "./Title";
import MainToTrans from "../../components/Buttons/MainToTrans"
// npm install @mui/material @emotion/react @emotion/styled
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
// npm install react-hover-video-player
import HoverVideoPlayer from 'react-hover-video-player';

function MainPage(props) {
    return (
        <div className="main-box">
            <div className="top-items">
                <Title></Title>
                <MainToTrans></MainToTrans>
            </div>
            <div className="video-items">
                <Card className="card-item" sx={{ maxWidth: 700 }}>
                    <CardActionArea>
                        <HoverVideoPlayer
                            restartOnPaused
                            videoSrc={[
                                { src: '/VideoSrc/v1.webm', type: 'video/webm' },
                                { src: 'video.mp4', type: 'video/mp4' },
                            ]}>
                        </HoverVideoPlayer>
                        <CardMedia 
                            sx={{ height: 55 }}/>
                        <CardContent>
                        <Typography className="matching-service-btn" gutterBottom variant="h2" component="div">
                            <div>통역사매칭서비스</div>
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Card sx={{ maxWidth: 700 }}>
                    <CardActionArea>
                        <HoverVideoPlayer
                            restartOnPaused
                            videoSrc={[
                                { src: '/VideoSrc/v2.webm', type: 'video/webm' },
                                { src: 'video.mp4', type: 'video/mp4' },
                            ]}>
                        </HoverVideoPlayer>
                        <CardMedia 
                            sx={{ height: 55 }}/>
                        <CardContent>
                        <Typography className="matching-service-btn" gutterBottom variant="h2" component="div">
                            <div>AI매칭서비스</div>
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>
        </div>
    )
}

export default MainPage;