import Landing from "../view/Landing.tsx";
import Lesson from "../components/Lesson.tsx";

export const LandingRoutes =[
    {
        path:"/",
        element: <Landing />,
    },
    {
        path:'/lessons',
        element: <Lesson />,
    }
];