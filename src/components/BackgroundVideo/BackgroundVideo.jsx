// React elements
import { useState, useEffect } from "react";

// Style
import "./BackgroundVideo.scss";

// API calls
import { fetchTags, fetchPostsByTagId } from "../../utils/api";

function BackgroundVideo() {
  const [backgroundVideo, setBackgroundVideo] = useState([]);
  const [tagId, setTagId] = useState(null);

  useEffect(() => {
    const getTagId = async () => {
      try {
        const tags = await fetchTags();
        const homepageVideoTag = tags.find(
          (tag) => tag.slug === "homepage-video"
        );

        if (homepageVideoTag) {
          setTagId(homepageVideoTag.id);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getTagId();
  }, []);

  useEffect(() => {
    const getBackgroundVideo = async () => {
      try {
        if (tagId) {
          const posts = await fetchPostsByTagId(tagId);
          setBackgroundVideo(posts[0].video_url.guid);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getBackgroundVideo();
  }, [tagId]);

  return (
    <div className="video-container">
      {backgroundVideo.length > 0 && (
        <video
          className="video-container__background-video"
          src={backgroundVideo}
          type="video/mp4"
          autoPlay
          muted
          loop
        />
      )}
      <div className="video-container__overlay"></div>
    </div>
  );
}

export default BackgroundVideo;
