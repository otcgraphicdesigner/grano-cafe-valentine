import Footer from '@/components/layouts/Footer';
import Header from '@/components/layouts/Header';
import { HeartHandshake, ShieldCheck, ScrollText, Mail, MapPin } from 'lucide-react';

export default function TermsAndConditions() {
  return (
    <main className="relative min-h-screen overflow-hidden velvet-bg">
      <Header />
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-primary/10 rounded-full blur-[200px]" />

      <section className="relative z-10 px-4 md:px-8 pt-20 pb-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium tracking-wider uppercase mb-6">
              <ScrollText className="w-4 h-4" />
              Terms & Conditions
            </span>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
              The Fine Print, <span className="text-primary neon-text">Beautifully</span> Said
            </h1>

            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Please read these Terms carefully before booking. By using this website and placing a reservation,
              you agree to the Terms below.
            </p>

            <p className="text-muted-foreground text-sm mt-3">
              Effective Date: <span className="text-foreground/80">[Add Date]</span>
            </p>
          </div>

          {/* Content Card */}
          <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-[#1a1a1a] via-[#0d0d0d] to-[#000] overflow-hidden">
            <div className="p-6 md:p-10 space-y-10">
              {/* Section 1 */}
              <section className="space-y-3">
                <h2 className="font-display text-2xl md:text-3xl text-foreground flex items-center gap-3">
                  <HeartHandshake className="w-6 h-6 text-primary" />
                  1. Services & Bookings
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Grano Cafe (“we”, “our”, “us”) offers curated dining and themed experiences, including limited-slot
                  reservations and special events. Bookings are subject to availability and are confirmed only after
                  successful payment verification and confirmation communication.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  You agree to provide accurate details at the time of booking. Reservations may be non-transferable unless
                  approved by us in writing.
                </p>
              </section>

              {/* Section 2 */}
             <section className="space-y-3">
  <h2 className="font-display text-2xl md:text-3xl text-foreground flex items-center gap-3">
    <ShieldCheck className="w-6 h-6 text-primary" />
    2. Pricing, Payments & Verification
  </h2>

  <p className="text-muted-foreground leading-relaxed">
    Prices are listed in INR unless stated otherwise. Payments are processed securely via Razorpay. 
    The Razorpay merchant account used for processing payments is operated by Outright Creators, 
    our authorized payment technology and processing partner.
  </p>

  <p className="text-muted-foreground leading-relaxed">
    Outright Creators facilitates payment collection, gateway integration, and technical verification 
    on our behalf. This is why the payment page, receipt, or bank statement may display the name 
    “Outright Creators”.
  </p>

  <p className="text-muted-foreground leading-relaxed">
    We do not store your card details, UPI PIN, or banking credentials. Your booking is considered 
    valid only after: (a) successful payment, (b) server-side verification, and (c) confirmation issued.
  </p>
</section>


              {/* Section 3 */}
              <section className="space-y-3">
                <h2 className="font-display text-2xl md:text-3xl text-foreground">
                  3. Refunds, Cancellations & Rescheduling
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Because our experiences are limited capacity and pre-curated, bookings are generally non-refundable.
                  Rescheduling may be offered at our discretion subject to availability and advance notice.
                </p>
                <ul className="space-y-2 text-foreground/80">
                  <li className="flex gap-3">
                    <span className="mt-2 w-2 h-2 rounded-full bg-primary" />
                    No-shows are not eligible for refunds.
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 w-2 h-2 rounded-full bg-primary" />
                    Late arrivals may reduce the experience time without compensation.
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 w-2 h-2 rounded-full bg-primary" />
                    If Grano Cafe cancels an event/session, you will receive a reschedule option or full refund as applicable.
                  </li>
                </ul>
              </section>

              {/* Section 4 */}
              <section className="space-y-3">
                <h2 className="font-display text-2xl md:text-3xl text-foreground">
                  4. Guest Conduct & Venue Policies
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Guests are expected to behave respectfully, follow staff guidance, and treat the venue and other guests
                  with care. We may refuse service for unsafe, abusive, or disruptive behavior.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Please inform us in advance of allergies or special requirements. Participation in themed experiences is
                  voluntary and at your discretion.
                </p>
              </section>

              {/* Section 5 */}
              <section className="space-y-3">
                <h2 className="font-display text-2xl md:text-3xl text-foreground">
                  5. Intellectual Property
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  All website content (text, visuals, branding, layout, concepts) is owned by Grano Cafe and may not be copied,
                  reproduced, or reused without written permission.
                </p>
              </section>

              {/* Section 6 */}
              <section className="space-y-3">
                <h2 className="font-display text-2xl md:text-3xl text-foreground">
                  6. Limitation of Liability
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We are not liable for indirect losses, missed bookings due to incorrect customer details, payment failures
                  caused by banks/gateways, or force majeure events (weather, outages, restrictions). Maximum liability, if any,
                  is limited to the amount paid for the booking.
                </p>
              </section>

              {/* Section 7 */}
              <section className="space-y-3">
                <h2 className="font-display text-2xl md:text-3xl text-foreground">
                  7. Updates to These Terms
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update these Terms from time to time. Continued use of the website indicates acceptance of the latest version.
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
                Note: This page is a template to match your theme. If you have a registered business/legal entity name,
                replace “Grano Cafe” with the legal name where required.
              </p> */}
            </div>
          </div>

          {/* Bottom spacing */}
          <div className="h-10" />
        </div>
         {/* Footer */}
      <Footer />
      </section>
    </main>
  );
}
