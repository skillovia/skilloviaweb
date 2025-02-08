const BookCard = ({ id, title, description, date, status, location, fileUrl, type }) => {
  return (
    <div className="block bg-input border border-gray p-4 rounded-lg mb-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-start gap-4">
        <div className="rounded-lg flex items-center justify-center">
          <img
            src={`https://${fileUrl}`}
            alt="Booking"
            className="w-28 h-28 rounded-lg object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-gray-900 text-[12px] lg:text-[20px] ">{title}</h3>
            <div className="flex gap-2">

            </div>
          </div>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{description}</p>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{date}</p>
          <div className="flex items-center gap-4 mt-2">
            <span className={`px-2 py-1 text-xs rounded-lg ${
              status === 'accepted' 
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BookCard;