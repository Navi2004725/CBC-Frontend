import { HiMail, HiPhone, HiLocationMarker, HiClock } from "react-icons/hi";

export default function ContactPage() {
  return (
    <div className="w-full">
      <div className="bg-gradient-to-r from-accent to-rose-dark/80 py-16 lg:py-20">
        <div className="container-main px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-rose-light/80 font-medium">Get in Touch</span>
          <h1 className="font-display text-4xl lg:text-5xl font-semibold text-cream mt-3">Contact Us</h1>
          <p className="text-rose-light/60 mt-4 max-w-md mx-auto">We'd love to hear from you. Reach out anytime.</p>
        </div>
      </div>

      <div className="container-main section-padding">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact info */}
          <div>
            <h2 className="font-display text-3xl font-semibold text-accent mb-8">Let's Connect</h2>
            <div className="space-y-6">
              {[
                { icon: HiLocationMarker, title: "Visit Us", text: "123 Beauty Lane, Colombo, Sri Lanka" },
                { icon: HiPhone, title: "Call Us", text: "+94 11 234 5678" },
                { icon: HiMail, title: "Email Us", text: "hello@aurorabeauty.com" },
                { icon: HiClock, title: "Working Hours", text: "Mon – Sat: 9:00 AM – 6:00 PM" },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-rose-light flex items-center justify-center shrink-0">
                    <item.icon className="text-xl text-rose-dark" />
                  </div>
                  <div>
                    <h3 className="font-medium text-accent">{item.title}</h3>
                    <p className="text-muted text-sm mt-1">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact form (UI only) */}
          <div className="bg-white rounded-2xl border border-blush/50 p-8 shadow-sm">
            <h3 className="font-display text-xl font-semibold text-accent mb-6">Send a Message</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-secondary mb-2">Name</label>
                <input type="text" className="input-field" placeholder="Your name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-2">Email</label>
                <input type="email" className="input-field" placeholder="your@email.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-2">Message</label>
                <textarea className="input-field min-h-[120px] resize-none" placeholder="How can we help you?" />
              </div>
              <button type="submit" className="btn-primary w-full">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
