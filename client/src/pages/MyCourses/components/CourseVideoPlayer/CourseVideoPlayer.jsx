import BunnyStreamPlayer from "../BunnyStreamPlayer/BunnyStreamPlayer";
import VideoPlaceholder from "../VideoPlaceholder/VideoPlaceholder";

export default function CourseVideoPlayer({ lesson }) {
  if (!lesson.bunnyVideoId?.trim()) {
    return <VideoPlaceholder lesson={lesson} />;
  }

  return <BunnyStreamPlayer lesson={lesson} />;
}