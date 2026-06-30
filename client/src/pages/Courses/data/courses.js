import CourseImage1 from "../../../assets/images/course/course1.jpg";
import CourseImage2 from "../../../assets/images/course/course2.jpg";
import CourseImage3 from "../../../assets/images/course/course3.jpg";
import PreviewPoster from "../../../assets/images/course/preview.jpg";
import IntroPoster from "../../../assets/images/course/intro.jpg";
import portrait1 from "../../../assets/images/course/portrait1.jpg";
import portrait2 from "../../../assets/images/course/portrait2.jpeg";
import portrait3 from "../../../assets/images/course/course1.jpg";


// import IntroVideo from "../../assets/videos/introduction.mp4";
import PreviewVideo from "../../../assets/videos/prevVideo.mp4";

import {
  LuRuler,
  LuPalette,
  LuEye,
  LuBrush,
  LuShirt,
  LuSun,
  LuImage,
  LuLayers,
} from "react-icons/lu";

const courses = [
  {
    id: 1,
    slug: "realistic-colour-pencil-portraits",
    title: "Realistic Colour Pencil Portrait Masterclass",
    shortDescription:
      "Master realistic coloured pencil portraits through structured lessons, downloadable resources and real projects.",
    price: 1999,
    originalPrice: 2999,
    discountLabel: "🔥 Early Bird Offer",
    currency: "₹",
    available: true,
    rating: 4.9,
    students: "5000+",
    reviews: 146,
    images: [CourseImage1, CourseImage2, CourseImage3],
    highlights: [
      "Skill Level: Beginner Friendly",
      "Format: Pre-recorded video lessons",
      "20+ HD Lessons",
      "PDF Resources",
      "Real Projects",
      "Reference Images for all modules",
      "Practice lessons",
      "Certificate of Completion",
    ],

    introTitle: "Meet Your Instructor",
    introDescription:
      "Get to know your instructor, my teaching style and how this masterclass will help you build realistic coloured pencil portrait skills from the ground up.",
    introVideo: "/videos/introduction.mp4",
    introPoster: IntroPoster,
    previewTitle: "See What You'll Create",
    previewDescription:
      "Take a sneak peek at the beautiful studies, practice exercises and the final portrait you'll complete during this course.",
    previewVideo: PreviewVideo,
    previewPoster: PreviewPoster,

    learningOutcomes: [
      {
        title: "Master Facial Proportions",
        icon: LuRuler,
      },
      {
        title: "Create Realistic Skin Tones",
        icon: LuPalette,
      },
      {
        title: "Draw Expressive Eyes & Features",
        icon: LuEye,
      },
      {
        title: "Render Hair & Fine Details",
        icon: LuBrush,
      },
      {
        title: "Complete a Professional Portrait",
        icon: LuImage,
      },
    ],

    curriculum: [
      {
        title: "Foundations & Materials",
        lessons: [
          {
            id: 1,
            title: "Choosing the Right Paper",
            duration: "08:25",
            videoId: "lesson-1",
          },
          {
            id: 2,
            title: "Understanding Colour Pencils",
            duration: "12:40",
            videoId: "lesson-2",
          },
          {
            id: 3,
            title: "Layering & Pressure Control",
            duration: "15:30",
            videoId: "lesson-3",
          },
          {
            id: 4,
            title: "Essential Materials Overview",
            duration: "06:15",
            videoId: "lesson-4",
          },
        ],
      },
      {
        title: "Facial Proportions",
        lessons: [
          {
            id: 5,
            title: "Head Construction",
            duration: "10:00",
            videoId: "lesson-5",
          },
          {
            id: 6,
            title: "Facial Guidelines",
            duration: "10:00",
            videoId: "lesson-6",
          },
          {
            id: 7,
            title: "Eyes Placement",
            duration: "10:00",
            videoId: "lesson-7",
          },
          {
            id: 8,
            title: "Nose & Lips Positioning",
            duration: "10:00",
            videoId: "lesson-8",
          },
        ],
      },
      {
        title: "Skin Tones & Colour Mixing",
        lessons: [
          {
            id: 9,
            title: "Colour Theory",
            duration: "10:00",
            videoId: "lesson-9",
          },
          {
            id: 10,
            title: "Creating Natural Skin Tones",
            duration: "10:00",
            videoId: "lesson-10",
          },
          {
            id: 11,
            title: "Layering Colours",
            duration: "10:00",
            videoId: "lesson-11",
          },
          {
            id: 12,
            title: "Blending Techniques",
            duration: "10:00",
            videoId: "lesson-12",
          },
        ],
      },
      {
        title: "Eyes, Nose & Lips",
        lessons: [
          {
            id: 13,
            title: "Drawing Realistic Eyes",
            duration: "10:00",
            videoId: "lesson-13",
          },
          {
            id: 14,
            title: "Nose Details",
            duration: "10:00",
            videoId: "lesson-14",
          },
          {
            id: 15,
            title: "Lips & Expressions",
            duration: "10:00",
            videoId: "lesson-15",
          },
          {
            id: 16,
            title: "Common Mistakes",
            duration: "10:00",
            videoId: "lesson-16",
          },
        ],
      },
      {
        title: "Hair & Clothing",
        lessons: [
          {
            id: 17,
            title: "Hair Texture",
            duration: "10:00",
            videoId: "lesson-17",
          },
          {
            id: 18,
            title: "Highlights",
            duration: "10:00",
            videoId: "lesson-18",
          },
          {
            id: 19,
            title: "Fabric Folds",
            duration: "10:00",
            videoId: "lesson-19",
          },
          {
            id: 20,
            title: "Final Details",
            duration: "10:00",
            videoId: "lesson-20",
          },
        ],
      },
      {
        title: "Complete Portrait",
        lessons: [
          {
            id: 21,
            title: "Full Portrait Demonstration",
            duration: "10:00",
            videoId: "lesson-21",
          },
          {
            id: 22,
            title: "Final Touches",
            duration: "10:00",
            videoId: "lesson-22",
          },
          {
            id: 23,
            title: "Corrections",
            duration: "10:00",
            videoId: "lesson-23",
          },
          {
            id: 24,
            title: "Finishing & Presentation",
            duration: "10:00",
            videoId: "lesson-24",
          },
        ],
      },
    ],

    perfectFor: [
      "Complete beginners",
      "Hobby artists",
      "Anyone wanting realistic portraits",
      "Artists struggling with skin tones",
    ],
    notFor: ["Looking for overnight results", "Don't enjoy practicing"],

    artworks: [
      {
        title: "Fundamentals",
        subtitle: "Your first complete realistic portrait.",
        image: portrait1,
        difficulty: "Beginner",
        lessons: 8,
      },
      {
        title: "Facial Features",
        subtitle: "Eyes, nose and lips in detail.",
        image: portrait2,
        difficulty: "Intermediate",
        lessons: 10,
      },
      {
        title: "Complete Professional Portrait",
        subtitle: "The final masterpiece.",
        image: portrait3,
        difficulty: "Advanced",
        lessons: 15,
      },
    ],
  },
];

export default courses;
