export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div>
            <div>
                <img src={movie.image} />
            </div>
            <div>
                <span>Title: </span>
                <span> {movie.title}</span>
            </div>
            <div>
                <span>Release: </span>
                <span>{movie.Release}</span>
            </div>
            <button onClick={onBackClick}>Back</button>
        </div>
    );
};