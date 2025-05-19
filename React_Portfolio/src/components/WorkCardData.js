import pro1 from "../assets/project1.png"
import pro2 from "../assets/project2.png"
import pro3 from "../assets/project3.png"


const ProjectCardData = [
    {
        imgsrc: pro1,
        title: "InternTrack full-stack application",
        text:"Built InternTrack, a full-stack MERN application for managing student internships with Google Drive integration for secure PDF uploads and previews. Implemented role-based access control with JWT authentication and schema validation using Mongoose and Express. Enabled dynamic search and filtering for admins using regex and range queries to streamline data management.",
        view: "https://github.com/KisshorM/Projects/tree/1885d4bfaa3882b51d32570750e3462bb3e11e56/InternTrack"
    },
    {
        imgsrc: pro2,
        title: "Real-time Hate Speech detection in Twitter",
        text:"Built a machine learning model to detect hate speech in social media text using labeled data. Performed data preprocessing, visualization, and feature engineering to improve classification accuracy. Trained and evaluated models (e.g., Logistic Regression, Naive Bayes) and deployed the best-performing one using Flask and Docker. Integrated the solution with a web interface for real-time hate speech prediction.",
        view: "https://github.com/KisshorM/Projects/tree/1885d4bfaa3882b51d32570750e3462bb3e11e56/ML_Hate_Speech_Project"
    },
    {
        imgsrc: pro3,
        title: "Library Management System",
        text:" Created a database for a library management system with details of users, books, publishers, memberships etc. Did all the processes like finding the functional dependencies, decomposition, finding extraneous attributes and removed redundant fd’s. Integrated the database with Apache NetBeans, and implemented functions for insert, delete, update, and search operations.",
        view: "https://github.com/KisshorM/Projects/blob/1885d4bfaa3882b51d32570750e3462bb3e11e56/Library%20Management%20System.zip"
    }
]

export default ProjectCardData;