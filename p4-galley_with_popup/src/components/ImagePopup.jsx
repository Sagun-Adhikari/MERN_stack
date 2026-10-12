
function ImagePopup(props) {
    return (
        <div
            className="popup"
            onClick={props.onClose}
        >
            <div
                className="popup-content"
                onClick={function (event) {
                    event.stopPropagation();
                }}
            >
                <button
                    className="close-button"
                    onClick={props.onClose}
                >
                    &times;
                </button>

                <img
                    src={props.image.url}
                    alt={props.image.title}
                />

                <h2>{props.image.title}</h2>
            </div>
        </div>
    );
}

export default ImagePopup;
