const reviews = [
  {
    name: "Amara Silva",
    rating: 5,
    text: "The hydrating cream transformed my skin in just two weeks. Soft, glowing, and absolutely luxurious!",
    product: "Moisturizing Cream",
  },
  {
    name: "Priya Fernando",
    rating: 5,
    text: "Best face wash I've ever used. Gentle yet effective — my skin feels clean without any dryness.",
    product: "Gentle Face Wash",
  },
  {
    name: "Nisha Perera",
    rating: 4,
    text: "The fragrance collection is divine. Long-lasting scent that gets compliments everywhere I go.",
    product: "Signature Fragrance",
  },
  {
    name: "Dilani Jayawardena",
    rating: 5,
    text: "Love the artisan soaps! Beautiful packaging and they leave my skin feeling silky smooth.",
    product: "Artisan Soap",
  },
];

function Stars({ count }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={i < count ? "text-gold" : "text-blush"}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  return (
    <div className="w-full">
      <div className="bg-gradient-to-r from-accent to-rose-dark/80 py-16 lg:py-20">
        <div className="container-main px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-rose-light/80 font-medium">Testimonials</span>
          <h1 className="font-display text-4xl lg:text-5xl font-semibold text-cream mt-3">Customer Reviews</h1>
          <p className="text-rose-light/60 mt-4 max-w-md mx-auto">See what our community says about Lumière Beauty</p>
        </div>
      </div>

      <div className="container-main section-padding">
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="bg-white rounded-2xl p-8 border border-blush/50 card-hover">
              <Stars count={review.rating} />
              <p className="text-secondary leading-relaxed mt-4 mb-6 italic">"{review.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-rose-light flex items-center justify-center font-display text-lg font-semibold text-accent">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-accent">{review.name}</p>
                  <p className="text-xs text-muted">{review.product}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
