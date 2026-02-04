import Footer from '@/components/layouts/Footer';
import Header from '@/components/layouts/Header';
import { Lock, Database, Mail, ShieldCheck, Cookie, MapPin } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <main className="relative min-h-screen  velvet-bg">
      <Header />
      {/* Ambient glow */}
      {/* <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-primary/10 rounded-full blur-[200px]" /> */}
      <div className="absolute inset-0 -z-10 flex justify-center">
  <div className="mt-40 w-[900px] h-[900px] bg-primary/10 rounded-full blur-[200px]" />
</div>


      <section className="relative z-10 px-4 md:px-8 pt-20 pb-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium tracking-wider uppercase mb-6">
              <Lock className="w-4 h-4" />
              Privacy Policy
            </span>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
              Privacy, with <span className="text-primary neon-text">Respect</span>
            </h1>

            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              This policy explains what we collect, why we collect it, and how we protect it when you use our website and booking flow.
            </p>

            {/* <p className="text-muted-foreground text-sm mt-3">
              Effective Date: <span className="text-foreground/80">[Add Date]</span>
            </p> */}
          </div>

          {/* Content Card */}
          <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-[#1a1a1a] via-[#0d0d0d] to-[#000] overflow-hidden">
            <div className="p-6 md:p-10 space-y-10">
              {/* Section 1 */}
              <section className="space-y-3">
                <h2 className="font-display text-2xl md:text-3xl text-foreground flex items-center gap-3">
                  <Database className="w-6 h-6 text-primary" />
                  1. Information We Collect
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  When you book or reserve an experience, we may collect details such as your name, partner’s name, email, phone number,
                  booking information, and payment reference IDs (for confirmation and records).
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We do not store your card number, UPI PIN, or banking credentials. Payments are processed by Razorpay.
                </p>
              </section>

              {/* Section 2 */}
              <section className="space-y-3">
                <h2 className="font-display text-2xl md:text-3xl text-foreground flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                  2. How We Use Your Information
                </h2>
                <ul className="space-y-2 text-foreground/80">
                  <li className="flex gap-3">
                    <span className="mt-2 w-2 h-2 rounded-full bg-primary" />
                    To process and confirm your booking
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 w-2 h-2 rounded-full bg-primary" />
                    To send confirmation emails and booking updates
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 w-2 h-2 rounded-full bg-primary" />
                    To provide customer support and handle queries
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 w-2 h-2 rounded-full bg-primary" />
                    To maintain internal booking records and improve operations
                  </li>
                </ul>
              </section>

              {/* Section 3 */}
              <section className="space-y-3">
                <h2 className="font-display text-2xl md:text-3xl text-foreground flex items-center gap-3">
                  <Lock className="w-6 h-6 text-primary" />
                  3. Where Your Data Is Stored
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Booking records may be stored in internal systems.
                  {/* including secure Google Sheets via protected backend scripts,
                  accessible only to authorized staff. */}
                </p>
              </section>

              {/* Section 4 */}
              <section className="space-y-3">
                <h2 className="font-display text-2xl md:text-3xl text-foreground">
                  4. Payments & Partners
                </h2>

                <p className="text-muted-foreground leading-relaxed">
                  Payments are processed securely through Razorpay. The Razorpay merchant account used for
                  transactions is operated by Outright Creators, our authorized payment processing and
                  technology partner. As a result, the payment page, receipt, or bank statement may display
                  the name “Outright Creators”.
                </p>

                <p className="text-muted-foreground leading-relaxed">
                  We receive only limited transaction identifiers from Razorpay (such as payment ID and order ID)
                  required to verify and confirm your booking. We do not receive or store your card details,
                  UPI PIN, CVV, or banking credentials.
                </p>

                <p className="text-muted-foreground leading-relaxed">
                  Outright Creators facilitates the payment gateway integration and server-side verification
                  workflow on our behalf. They do not have access to your sensitive payment credentials
                  through our systems.
                </p>
              </section>


              {/* Section 5 */}
              <section className="space-y-3">
                <h2 className="font-display text-2xl md:text-3xl text-foreground flex items-center gap-3">
                  <Cookie className="w-6 h-6 text-primary" />
                  5. Cookies & Analytics
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may use basic cookies or analytics to improve site performance and understand usage patterns. We do not knowingly use
                  invasive tracking that sells your personal data.
                </p>
              </section>

              {/* Section 6 */}
              <section className="space-y-3">
                <h2 className="font-display text-2xl md:text-3xl text-foreground">
                  6. Your Choices & Rights
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  You may request data access, correction, or deletion by contacting us. Certain records may be retained for accounting,
                  compliance, or legitimate operational needs.
                </p>
              </section>

              {/* Contact */}
              <section className="rounded-2xl glass border border-primary/20 p-6 md:p-7">
                <h3 className="font-display text-xl md:text-2xl text-foreground mb-3">Contact</h3>
                <div className="grid md:grid-cols-2 gap-4 text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <div className="text-foreground/80 font-medium">Email</div>
                      <div>[Contact Email]</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <div className="text-foreground/80 font-medium">Location</div>
                      <div>Hyderabad, India</div>
                    </div>
                  </div>
                </div>
              </section>

              {/* <p className="text-xs text-muted-foreground">
                Note: This policy is written to match your site’s booking + payment flow. Replace placeholders with your official contact details.
              </p> */}
            </div>
          </div>

          <div className="h-10" />
        </div>
<Footer />
      </section>
  
    </main>
  );
}
