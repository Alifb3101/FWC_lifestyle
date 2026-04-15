import { Mail, Phone, MapPin } from "lucide-react";

export function Contact() {
  return (
    <div className="min-h-screen pt-28 md:pt-32">
      <div className="container-shell section-block">
        <div className="text-center mb-[clamp(2rem,5vw,3.5rem)]">
          <h1 className="text-[clamp(2rem,4vw,3.2rem)] font-bold mb-4">Contact Us</h1>
          <p className="text-muted-foreground text-[clamp(0.95rem,2vw,1.1rem)]">
            Get in touch with the FWC Lifestyle support and sales team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr,0.9fr] gap-[clamp(1.5rem,4vw,3rem)]">
          <div>
            <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium mb-2">Name</label>
                <input
                  id="contact-name"
                  type="text"
                  className="w-full px-4 py-3 bg-input-background border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium mb-2">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  className="w-full px-4 py-3 bg-input-background border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  id="contact-message"
                  rows={6}
                  className="w-full px-4 py-3 bg-input-background border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="How can we help you?"
                />
              </div>
              <button className="w-full bg-primary text-primary-foreground px-8 py-4 rounded font-semibold hover:bg-primary/90 transition-colors">
                SEND MESSAGE
              </button>
            </form>
          </div>

          <div className="space-y-6 rounded-xl border border-border bg-card p-[clamp(1rem,2.5vw,1.75rem)]">
            <h2 className="text-2xl font-bold mb-6">Get in touch</h2>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Email</h3>
                <p className="text-muted-foreground">support@fwclifestyle.ae</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Phone</h3>
                <p className="text-muted-foreground">+971 4 000 0000</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Address</h3>
                <p className="text-muted-foreground">
                  Sheikh Zayed Road<br />
                  Dubai, United Arab Emirates
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
