import { Mail, Phone, MapPin } from "lucide-react";

export function Contact() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-muted-foreground">Get in touch with the FWC Lifestyle support and sales team.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-input-background border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-input-background border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
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

          <div className="space-y-8">
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
