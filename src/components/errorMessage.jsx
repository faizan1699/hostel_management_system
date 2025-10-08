// components/ErrorMessage.js
const ErrorMessage = ({ error }) => {
    if (!error) return null;
    return (
        <p className="text-red-500 text-sm mt-1">{error.message || "This field is required"}</p>
    );
}
export default ErrorMessage