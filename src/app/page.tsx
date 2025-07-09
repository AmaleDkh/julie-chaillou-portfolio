"use client";

// React elements
import { useState, useEffect } from "react";

// Components
import Layout from "./components/Layout/Layout";
// import BackgroundVideo from "./components/BackgroundVideo/BackgroundVideo";
import DiscoverProjectsButton from "./components/DiscoverProjectsButton/DiscoverProjectsButton";
import LoadingAnimation from "./components/LoadingAnimation/LoadingAnimation";
import HeroBanner from "./components/HeroBanner/HeroBanner";

// Style
import "../../assets/style/Global.scss";

function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showVideo, setShowVideo] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 3000);

    // const videoTimer = setTimeout(() => {
    //   setShowVideo(true);
    // }, 4000);

    return () => {
      clearTimeout(timer);
      // clearTimeout(videoTimer);
    };
  }, []);

  return (
    <div className="App">
      <Layout>
        <HeroBanner
          title="JULIE CHAILLOU"
          subtitle="Créatrice d'histoires visuelles"
          ctaText="DÉCOUVRIR MES PROJETS"
          ctaLink="videos/page"
          showScrollIndicator={true}
        />

        {/* {!isLoaded ? (
          <LoadingAnimation />
        ) : (
          <>
            <div className={`loading-animation ${isLoaded ? "fade-out" : ""}`}>
              <LoadingAnimation />
            </div>

            <div className="video-container">
              <div
                className={`video-container__background-video ${
                  showVideo ? "active" : ""
                }`}
              >
                <BackgroundVideo />
              </div>

              <DiscoverProjectsButton />
            </div>
          </>
        )} */}
      </Layout>
    </div>
  );
}

export default Home;
