import React from "react";
import Title from "./Title";
import VideoBtn from "./VideoBtn";
import MainToTrans from "../../components/Buttons/MainToTrans"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
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
                        <Typography gutterBottom variant="h2" component="div">
                            통역사매칭서비스
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
                        <Typography gutterBottom variant="h2" component="div">
                            AI매칭서비스
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>
        </div>
    )
}

export default MainPage;