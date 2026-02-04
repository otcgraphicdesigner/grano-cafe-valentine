// grano-cafe\src\components\valentines\TicketStub.tsx
import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Check, Sparkles } from 'lucide-react';
import { eventDetails } from '@/data/mockData';

declare global {
  interface Window {
    Razorpay?: any;
  }
}

interface BookingForm {
  name: string;
  partnerName: string;
  email: string;
  phone: string;
  slot: string;
}

type CreateOrderResponse = {
  ok: boolean;
  keyId: string;
  orderId: string;
  amount: number;
  currency: string;
  error?: string;
};

type VerifyResponse = {
  ok: boolean;
  error?: string;
};

export const TicketStub = () => {
  const [form, setForm] = useState<BookingForm>({
    name: '',
    partnerName: '',
    email: '',
    phone: '',
    slot: '12:00 PM-3:00 PM',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [rzpReady, setRzpReady] = useState(false);

  const amountPaise = useMemo(() => {
    const price = Number(eventDetails.price || 0);
    return Math.round(price * 100);
  }, []);

  const displayAmount = `${eventDetails.currency}${eventDetails.price.toLocaleString()}`;

  useEffect(() => {
    const existing = document.querySelector<HTMLScriptElement>('script[data-razorpay="checkout"]');
    if (existing) {
      setRzpReady(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.setAttribute('data-razorpay', 'checkout');
    script.onload = () => setRzpReady(true);
    script.onerror = () => setRzpReady(false);
    document.body.appendChild(script);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const openRazorpayCheckout = (opts: {
    keyId: string;
    orderId: string;
    amount: number;
    currency: string;
  }) => {
    return new Promise<{
      razorpay_payment_id: string;
      razorpay_order_id: string;
      razorpay_signature: string;
    }>((resolve, reject) => {
      if (!window.Razorpay) {
        reject(new Error('Razorpay SDK not loaded'));
        return;
      }

      const options = {
        key: opts.keyId,
        order_id: opts.orderId,
        amount: opts.amount,
        currency: opts.currency,
        name: eventDetails.brandName,
        description: eventDetails.tagline,
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        notes: {
          partnerName: form.partnerName,
          eventName: eventDetails.eventName,
          slot: form.slot,
        },
        theme: {
          color: '#E11D48',
        },
        modal: {
          ondismiss: () => reject(new Error('Checkout closed')),
        },
        handler: (response: any) => {
          resolve({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          });
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on('payment.failed', (resp: any) => {
        reject(new Error(resp?.error?.description || 'Payment failed'));
      });

      rzp.open();
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!rzpReady) {
      alert('Payment system is loading. Please try again in a moment.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1) Create order using PHP backend
      const orderRes = await fetch('/api/create-order.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amountPaise,
          currency: 'INR',
          customer: {
            name: form.name,
            partnerName: form.partnerName,
            email: form.email,
            phone: form.phone,
            slot: form.slot,
          },
          meta: {
            eventName: eventDetails.eventName,
            eventTagline: eventDetails.tagline,
            displayAmount,
            slot: form.slot,
          },
        }),
      });

      const orderData = (await orderRes.json()) as CreateOrderResponse;

      if (!orderRes.ok || !orderData?.ok) {
        throw new Error(orderData?.error || 'Failed to create order');
      }

      // 2) Open Razorpay Checkout
      const paymentResult = await openRazorpayCheckout({
        keyId: orderData.keyId,
        orderId: orderData.orderId,
        amount: orderData.amount,
        currency: orderData.currency,
      });

      // 3) Verify signature via PHP + write to Google Sheet + send email
      const verifyRes = await fetch('/api/verify-payment.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...paymentResult,
          amount: orderData.amount,
          currency: orderData.currency,
          form: {
            name: form.name,
            partnerName: form.partnerName,
            email: form.email,
            phone: form.phone,
            slot: form.slot,
          },
          meta: {
            eventName: eventDetails.eventName,
            eventTagline: eventDetails.tagline,
            displayAmount,
            slot: form.slot,
          },
        }),
      });

      const verifyData = (await verifyRes.json()) as VerifyResponse;

      if (!verifyRes.ok || !verifyData?.ok) {
        throw new Error(verifyData?.error || 'Payment verification failed');
      }

      setIsSuccess(true);
    } catch (err: any) {
      alert(err?.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-24 px-4 md:px-8 overflow-hidden velvet-bg">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium tracking-wider uppercase mb-6">
            Reserve Your Table
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            Make it <span className="text-primary neon-text">Official</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Limited Tables available. Secure yours today.
          </p>
        </motion.div>

        {/* Golden Ticket */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: -10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Ticket container */}
          <div className="relative bg-gradient-to-br from-[#1a1a1a] via-[#0d0d0d] to-[#000] rounded-3xl overflow-hidden border border-primary/20">
            {/* Decorative corner patterns */}
            <div className="absolute top-0 left-0 w-24 h-24 border-l-2 border-t-2 border-primary/30 rounded-tl-3xl" />
            <div className="absolute top-0 right-0 w-24 h-24 border-r-2 border-t-2 border-primary/30 rounded-tr-3xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 border-l-2 border-b-2 border-primary/30 rounded-bl-3xl" />
            <div className="absolute bottom-0 right-0 w-24 h-24 border-r-2 border-b-2 border-primary/30 rounded-br-3xl" />

            {/* Perforated edge */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-32 perforated-edge" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-32 perforated-edge rotate-180" />

            <div className="p-8 md:p-12">
              {/* Ticket header */}
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-primary/20">
                <div>
                  <h3 className="font-display text-2xl text-foreground mb-1">
                    {eventDetails.eventName}
                  </h3>
                  <p className="text-muted-foreground italic">
                    {eventDetails.tagline}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-display text-primary neon-text">
                    {eventDetails.currency}{eventDetails.price.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">per couple</div>
                </div>
              </div>

              {/* Inclusions */}
              <div className="mb-8">
                <h4 className="text-sm uppercase tracking-widest text-primary mb-4 font-medium">
                  Included in Your Experience
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {eventDetails.includes.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * index }}
                      className="flex items-center gap-2"
                    >
                      <Check className="w-4 h-4 text-primary" />
                      <span className="text-sm text-foreground/80">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Form or Success */}
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm text-muted-foreground mb-2">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={form.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-input border border-primary/20 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 inset-shadow transition-all"
                          placeholder="Enter your name"
                        />
                      </div>
                      <div>
                        <label htmlFor="partnerName" className="block text-sm text-muted-foreground mb-2">
                          Partner&apos;s Name
                        </label>
                        <input
                          type="text"
                          id="partnerName"
                          name="partnerName"
                          required
                          value={form.partnerName}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-input border border-primary/20 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 inset-shadow transition-all"
                          placeholder="Enter partner's name"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="slot" className="block text-sm text-muted-foreground mb-2">
                        Select Your Slot
                      </label>
                      <select
                        id="slot"
                        name="slot"
                        required
                        value={form.slot}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-input border border-primary/20 rounded-xl text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 inset-shadow transition-all"
                      >
                        <option value="12-3pm">12:00 PM–3:00 PM</option>
                        <option value="4-7pm">4:00 PM–7:00 PM</option>
                        {/* <option value="after 10pm">After 10 PM</option> */}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm text-muted-foreground mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-input border border-primary/20 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 inset-shadow transition-all"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm text-muted-foreground mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-input border border-primary/20 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 inset-shadow transition-all"
                        placeholder="+91 98765 43210"
                      />
                    </div>

                    {/* Submit button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting || !rzpReady}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full mt-6 py-4 px-8 bg-gradient-neon text-primary-foreground font-semibold rounded-xl heartbeat disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg"
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                          />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Heart className="w-5 h-5" />
                          Pay & Book Your Table
                        </>
                      )}
                    </motion.button>

                    <p className="text-center text-sm text-muted-foreground mt-4">
                      Secure payment powered by trusted partners
                    </p>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', delay: 0.2 }}
                      className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-neon flex items-center justify-center"
                    >
                      <Sparkles className="w-10 h-10 text-primary-foreground" />
                    </motion.div>
                    <h3 className="font-display text-3xl text-foreground mb-2">
                      You're In!
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Your table is reserved. Check your email for confirmation.
                    </p>
                    <div className="inline-block px-6 py-3 rounded-full bg-primary/10 border border-primary/30">
                      <span className="font-display text-xl text-primary">
                        {form.name} ♥ {form.partnerName}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm mt-4">
                      Slot: <span className="text-foreground/80 font-medium">{form.slot}</span>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
