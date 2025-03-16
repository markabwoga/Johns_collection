import React, { useState, useEffect } from "react";

const Typewriter = () => {
    const words = ["Welcome to our Fashion World!", "Style that Defines You", "Trendy, Chic, & Timeless"];
    const [wordIndex, setWordIndex] = useState(0);
    const [letterIndex, setLetterIndex] = useState(0);
    const [text, setText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const type = () => {
            if (!isDeleting && letterIndex < words[wordIndex].length) {
                setText(words[wordIndex].substring(0, letterIndex + 1));
                setLetterIndex(letterIndex + 1);
            } else if (isDeleting && letterIndex > 0) {
                setText(words[wordIndex].substring(0, letterIndex - 1));
                setLetterIndex(letterIndex - 1);
            } else if (!isDeleting && letterIndex === words[wordIndex].length) {
                setTimeout(() => setIsDeleting(true), 2000);
            } else if (isDeleting && letterIndex === 0) {
                setIsDeleting(false);
                setWordIndex((wordIndex + 1) % words.length);
            }
        };
        
        const timer = setTimeout(type, isDeleting ? 50 : 100);
        return () => clearTimeout(timer);
    }, [letterIndex, isDeleting, wordIndex, words]);

    return (
        <h1 className="text-8xl font-bold text-gray-800 typeWriter">
            {text}
            <span className="animate-blink">|</span>
        </h1>

    );
};

const Home = () => {
    return (
      <div>
        <div className="flex justify-center items-center h-screen bg-gray-100 text-center homeDiv">
        <div className="logoDiv"></div>
            <Typewriter />
        </div>
      </div>

    );
};

export default Home;
