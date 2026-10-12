
import { useState } from "react";
import ImageCard from "./components/ImageCard";
import ImagePopup from "./components/ImagePopup";
import "./App.css";

const images = [
    {
        id: 1,
        title: "Mountain",
        url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800"
    },
    {
        id: 2,
        title: "Forest",
        url: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800"
    },
    {
        id: 3,
        title: "Ocean",
        url: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800"
    },
    {
        id: 4,
        title: "Nature",
        url: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800"
    },
    {
        id: 5,
        title: "Lake",
        url: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800"
    },
    {
        id: 6,
        title: "Desert",
        url: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800"
    },
    {
        id: 7,
        title: "Waterfall",
        url: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800"
    },
    {
        id: 8,
        title: "Snow Mountain",
        url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800"
    }
];

function App() {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <div className="gallery-container">
            <h1>Image Gallery</h1>
            <p>Click an image to view it in a larger size.</p>

            <div className="image-grid">
                {images.map(function (image) {
                    return (
                        <ImageCard
                            key={image.id}
                            image={image}
                            onClick={setSelectedImage}
                        />
                    );
                })}
            </div>

            {selectedImage && (
                <ImagePopup
                    image={selectedImage}
                    onClose={function () {
                        setSelectedImage(null);
                    }}
                />
            )}
        </div>
    );
}

export default App;
