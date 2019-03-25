import React from "react";
import VideoBgComponent from 'react-videobg'
import LoginRegister from "./LoginRegister";

import videoSource from './../assets/video/placeholder.mp4'


class IntroView extends React.Component {
    render() {
        const videoParams = {
            sources: [videoSource],
            videosize: {
                w: 1920,
                h: 1080
            },
            fitType: 'cover',
            videoProps: {
                muted: true,
                autoPlay: true,
                loop: true,
                playsInline: true,
                crossOrigin: 'anonymous'
            }
        };
        return (
            <div>
                <div style={{ position:'absolute',top:0,left:0,width:'100%',height:'100vh'}}>
                    <VideoBgComponent {...videoParams} />
                </div>
                <div className={"videoOverlay"}>
                    <div className={"introWrapper"}>
                        <div className={"introDesc"}>
                            <h1>To the point headline</h1>
                            <p>A paragraph or two about what the app and website is. Maybe a link to something where you can read more.</p>
                        </div>
                        <LoginRegister/>
                    </div>
                </div>
            </div>
        )
    }
}


export default IntroView;