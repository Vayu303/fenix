const Reviews = () => {
  const reviews = [
    {
      name: "Mario Rossi",
      text: "Prodotti bellissimi e un servizio impeccabile!",
      rating: 5,
    },
    {
      name: "Luca Bianchi",
      text: "Esperienza fantastica, consigliatissimo!",
      rating: 4,
    },
    {
      name: "Anna Verdi",
      text: "Oggetti unici, sono molto soddisfatta.",
      rating: 5,
    },
  ];

  return (
    <div className="bg-slate-100 py-12">
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
        Cosa dicono di noi
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 max-w-7xl mx-auto">
        {reviews.map((review, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-gray-800 font-semibold mb-2">"{review.text}"</p>
            <p className="text-gray-600 mb-4">- {review.name}</p>
            <div className="text-yellow-500">{"★".repeat(review.rating)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
