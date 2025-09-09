export default Notification = ({ message, className }) => {
    if (message === null) {
        return null
    }

    return (
        <div className={`notification ${className}`}>
            {message}
        </div>
    )
}

