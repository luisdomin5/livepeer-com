import { Text } from "@theme-ui/components";
import { FiEye, FiHeart } from "react-icons/fi";
import { IconButton } from "@theme-ui/components";
import { forwardRef, useRef, useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";

const videos = [
  {
    src:
      "https://cdn.sanity.io/files/dp4k3mpw/production/637be3e2106acb746559af41d5f57fae1edb535d.mp4",
    views: Math.round(100 + Math.random() * 500)
  },
  {
    src:
      "https://cdn.sanity.io/files/dp4k3mpw/production/24a650d65020ffb01beaa6c06bb79427ec5431b5.mp4",
    views: Math.round(100 + Math.random() * 500)
  },
  {
    src:
      "https://cdn.sanity.io/files/dp4k3mpw/production/bc7f603cf9e28c8545ce6394a6d1118e88293211.mp4",
    views: Math.round(100 + Math.random() * 500)
  }
];

const randomIntFromInterval = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const HeroVideo = forwardRef((_props, ref: React.Ref<HTMLDivElement>) => {
  const videosRef = useRef<HTMLVideoElement[]>([]);

  const [currentVideo, setCurrentVideo] = useState<number>();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (isInitialized || !videosRef.current) return;
    setIsInitialized(true);
    const currentVideo = randomIntFromInterval(0, 2);
    videosRef.current[currentVideo].play();
    setCurrentVideo(currentVideo);
  }, [isInitialized]);

  const onVideoEnded = useCallback(
    (i) => {
      if (!videosRef.current) return;
      const newCurrentVideo = i + 1 < videosRef.current.length ? i + 1 : 0;
      videosRef.current[newCurrentVideo].play();
      setCurrentVideo(newCurrentVideo);
    },
    [videosRef]
  );

  return (
    <div
      ref={ref}
      sx={{
        width: "100%",
        mx: "auto",
        overflow: "hidden",
        borderRadius: ["4vw", null, null, "36px"]
      }}
    >
      <figure sx={{ width: "100%", position: "relative" }}>
        {videos.map(({ src }, i) => (
          <video
            onEnded={() => onVideoEnded(i)}
            key={`video-swapper-item-${i}`}
            ref={(el) => (videosRef.current[i] = el)}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              objectFit: "cover",
              height: "100%",
              width: "100%",
              opacity: i === currentVideo ? 1 : 0,
              transition: "opacity 1s ease-out"
            }}
            src={src}
            muted
            playsInline
          />
        ))}
        <div
          sx={{
            position: "absolute",
            top: 3,
            left: 3,
            display: "flex",
            alignItems: "center",
            width: "fit-content"
          }}
        >
          <Text
            sx={{
              bg: "primary",
              borderRadius: 24,
              textTransform: "uppercase",
              fontWeight: "bold",
              color: "background",
              px: 2,
              py: 1,
              mr: 2
            }}
          >
            Live
          </Text>
          <Text
            sx={{
              display: "flex",
              alignItems: "center",
              fontWeight: "bold",
              borderRadius: 24,
              px: 2,
              py: 1,
              color: "background",
              bg: "rgba(0,0,0,0.5)"
            }}
          >
            <i sx={{ display: "flex", alignItems: "center", mr: 1 }}>
              <FiEye />
            </i>
            {currentVideo !== undefined ? videos[currentVideo].views : "..."}
          </Text>
        </div>
        <div
          sx={{
            position: "absolute",
            bottom: 3,
            left: 3,
            right: 3,
            display: "flex",
            alignItems: "center"
          }}
        >
          <input
            placeholder="Write a comment..."
            sx={{
              borderRadius: 24,
              width: "100%",
              bg: "rgba(0,0,0,0.5)",
              mr: 3,
              px: 3,
              height: "42px",
              color: "background",
              fontSize: "14px",
              "&:placeholder": {
                color: "#CDCDCD"
              },
              "&:focus": {
                outline: "none",
                boxShadow: "0px 0px 0px 3px rgba(148, 60, 255, 0.3)",
                borderColor: "primary"
              }
            }}
          />
          <IconButton
            sx={{
              background: "linear-gradient(180deg, #BD90F2 0%, #943CFF 100%)",
              borderRadius: "50%",
              color: "background",
              height: "42px",
              width: "42px",
              minWidth: "42px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <FiHeart />
          </IconButton>
        </div>
      </figure>
      <div
        id="background-gradient"
        sx={{
          width: "100%",
          position: "absolute",
          background:
            "linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%)",
          height: "100%",
          top: 0,
          pointerEvents: "none"
        }}
      />
    </div>
  );
});

export default HeroVideo;
