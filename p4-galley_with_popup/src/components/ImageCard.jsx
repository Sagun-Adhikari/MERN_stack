
function ImageCard(props) {
    return (
        <div
            className="image-card"
            onClick={function () {
                props.onClick(props.image);
            }}
        >
            <img
                src={props.image.url}
                alt={props.image.title}
            />

            <h3>{props.image.title}</h3>
        </div>
    );
}

export default ImageCard;
