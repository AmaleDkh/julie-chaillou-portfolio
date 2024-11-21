// React elements
import { useState, useEffect } from "react";

// Components
import Layout from "../../components/Layout/Layout";
import BackgroundVideo from "../../components/BackgroundVideo/BackgroundVideo";
import DiscoverProjectsButton from "../../components/DiscoverProjectsButton/DiscoverProjectsButton";
import LoadingAnimation from "../../components/LoadingAnimation/LoadingAnimation";

// Style
import "../../App.scss";

function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

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
        {!isLoaded ? (
          <LoadingAnimation />
        ) : (
          <>
            <div className={`loading-animation ${isLoaded ? "fade-out" : ""}`}>
              <LoadingAnimation />
            </div>

            <div className="video-container">
              {/* <div
                  // className={`video-container__background-video ${showVideo ? "active" : ""}`} s
                  >
                    <BackgroundVideo />
                  </div> */}

              <BackgroundVideo />
              <DiscoverProjectsButton />
            </div>
          </>
        )}
      </Layout>
    </div>
  );
}

export default Home;
