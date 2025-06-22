import { useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/");
    };
    return (
        <div>
            404 NOT FOUND
            <button onClick={handleClick}>home</button>
        </div>
    );
};
