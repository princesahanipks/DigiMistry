import { socialIcons } from "./socialIcons";

export default function Footer() {
  const colors = ["bg-[#0a66c2]", "bg-pink-600", "bg-sky-500", "bg-red-600", "bg-zinc-700"];

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name").trim();
    const email = formData.get("email").trim();
    const message = formData.get("message").trim();
    const subject = encodeURIComponent(`Website contact from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:iamprincesahani@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <footer className="bg-black text-white">
      <svg viewBox="0 0 1440 40" className="-mt-px block w-full bg-[#f4f6ff]" preserveAspectRatio="none">
        <path d="M0 20 C 240 40 480 0 720 18 S 1200 36 1440 14 V40 H0Z" fill="#000" />
      </svg>
      <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-8 pt-6 md:grid-cols-[1fr_1fr]">
        <div>
          <p className="text-sm">Made with Love by</p>
          <img src="/Logo.png" alt="DigiMistry" className="mt-3 h-12 w-auto object-contain" />
          <p className="mt-3 max-w-sm text-sm font-semibold">"Digmistry is a digital lab of learning, exploring tech and trends with simplicity."</p>
          <div className="mt-5 flex gap-3">
            {socialIcons.map(({ Icon, label, url }, index) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit DigiMistry on ${label}`}
                className={`grid h-10 w-10 place-items-center rounded-full ${colors[index]} transition-transform hover:-translate-y-1`}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="w-full" aria-label="Contact form">
          <h2 className="mb-4 text-xl font-bold text-white">Get in Touch</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="footer-name" className="mb-1 block text-sm text-white/80">Name</label>
              <input
                id="footer-name"
                name="name"
                type="text"
                required
                placeholder="Your name"
                className="w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white outline-none placeholder:text-white/50 focus:border-red-500"
              />
            </div>
            <div>
              <label htmlFor="footer-email" className="mb-1 block text-sm text-white/80">Email</label>
              <input
                id="footer-email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white outline-none placeholder:text-white/50 focus:border-red-500"
              />
            </div>
          </div>
          <div className="mt-3">
            <label htmlFor="footer-message" className="mb-1 block text-sm text-white/80">Message</label>
            <textarea
              id="footer-message"
              name="message"
              required
              rows="3"
              placeholder="How can I help?"
              className="w-full resize-none rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white outline-none placeholder:text-white/50 focus:border-red-500"
            />
          </div>
          <button
            type="submit"
            className="mt-3 rounded-md bg-red-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700"
          >
            Send Message
          </button>
        </form>
      </div>
      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-3 px-6 py-5 text-sm sm:flex-row sm:items-center">
          <p className="text-white/80">Design by Prince Sahani</p>
          <nav className="flex flex-wrap gap-4 font-semibold" aria-label="Footer navigation">
            <a href="/" className="hover:text-blue-300">Home</a>
            <a href="/" className="hover:text-blue-300">About</a>
            <a href="#footer-name" className="hover:text-blue-300">Contact us</a>
            <a href="/" className="hover:text-blue-300">Privacy Policy</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
