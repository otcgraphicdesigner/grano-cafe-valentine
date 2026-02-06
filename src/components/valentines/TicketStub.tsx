// grano-cafe\src\components\valentines\TicketStub.tsx
import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Check, Sparkles, XCircle } from 'lucide-react';
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

type PaymentType = 'partial' | 'full';

type SlotInfo = {
  capacity: number;
  confirmed: number;
  holds: number;
  total: number;
  remaining: number;
  isFull: boolean;
};

type SlotStatusResponse = {
  ok: boolean;
  capacity: number;
  slots: Record<string, SlotInfo>;
  error?: string;
};

type CreateOrderResponse = {
  ok: boolean;
  keyId: string;
  orderId: string;
  amount: number; // paise (Razorpay needs paise)
  currency: string; // INR
  holdRow: number;

  // helpful meta
  amountPaidRupees: number;
  amountPaidDisplay: string;
  paymentType: PaymentType;
  slot: string;

  error?: string;
};

type VerifyResponse = {
  ok: boolean;
  error?: string;
};

export const TicketStub = () => {
  const partialRupees = eventDetails.partialAmount ?? eventDetails.price ?? 1000;
  const fullRupees = eventDetails.fullAmount ?? eventDetails.eventPrice ?? partialRupees;
  const currencySymbol = eventDetails.currency || '₹';

  const formatINR = (n: number) => `${currencySymbol}${n.toLocaleString('en-IN')}`;

  const [form, setForm] = useState<BookingForm>({
    name: '',
    partnerName: '',
    email: '',
    phone: '',
    slot: eventDetails.eventSlots?.[0] || '12:00 PM – 03:00 PM',
  });

  // ✅ Track which button is processing
  const [submittingType, setSubmittingType] = useState<PaymentType | null>(null);
  const isSubmitting = submittingType !== null;

  const [isSuccess, setIsSuccess] = useState(false);
  const [rzpReady, setRzpReady] = useState(false);

  // ✅ Slot capacity state
  const [slotStatus, setSlotStatus] = useState<SlotStatusResponse | null>(null);

  // ✅ Toast
  const [toast, setToast] = useState<{ open: boolean; message: string }>(() => ({
    open: false,
    message: '',
  }));
  const toastTimerRef = useRef<number | null>(null);

  const showToast = (message: string) => {
    setToast({ open: true, message });
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setToast({ open: false, message: '' }), 3500);
  };

  const displayFullAmount = useMemo(() => formatINR(fullRupees), [fullRupees]);
  const displayPartialAmount = useMemo(() => formatINR(partialRupees), [partialRupees]);

  const fetchSlotStatus = async () => {
    try {
      const res = await fetch('/api/slot-status.php', { method: 'GET' });
      const data = (await res.json()) as SlotStatusResponse;

      if (!res.ok || !data?.ok) {
        setSlotStatus(null);
        return;
      }

      setSlotStatus(data);

      // If selected slot becomes full, auto-switch to available
      const current = form.slot;
      const currentInfo = data.slots?.[current];
      const isCurrentFull = currentInfo?.isFull === true;

      if (isCurrentFull) {
        const other = (eventDetails.eventSlots || []).find(s => !data.slots?.[s]?.isFull);
        if (other) {
          setForm(prev => ({ ...prev, slot: other }));
          showToast('Selected slot is full. Switched you to the available slot.');
        } else {
          showToast('All slots are full. Please contact us to check availability.');
        }
      }
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    fetchSlotStatus();
    const t = window.setInterval(fetchSlotStatus, 15000);
    return () => window.clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const isSlotFull = (slot: string) => !!slotStatus?.slots?.[slot]?.isFull;

  const allSlotsFull = useMemo(() => {
    const slots = eventDetails.eventSlots || [];
    if (!slots.length) return false;
    return slots.every(s => slotStatus?.slots?.[s]?.isFull);
  }, [slotStatus]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'slot' && isSlotFull(value)) {
      showToast('This slot is full. Please choose the other slot or contact us.');
      return;
    }

    setForm(prev => ({
      ...prev,
      [name]: value,
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
        amount: opts.amount, // ✅ comes from backend based on button clicked
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

  const validateForm = () => {
    if (!form.name.trim()) return 'Please enter your name.';
    if (!form.partnerName.trim()) return "Please enter partner's name.";
    if (!form.slot.trim()) return 'Please select a slot.';
    if (!form.email.trim()) return 'Please enter email address.';
    if (!form.phone.trim()) return 'Please enter phone number.';
    return '';
  };

  const handlePay = async (paymentType: PaymentType) => {
    if (isSubmitting) return;

    const msg = validateForm();
    if (msg) {
      showToast(msg);
      return;
    }

    if (!rzpReady) {
      showToast('Payment system is loading. Please try again in a moment.');
      return;
    }

    if (allSlotsFull) {
      showToast('All slots are full. Please contact us to check availability.');
      return;
    }

    if (isSlotFull(form.slot)) {
      const other = (eventDetails.eventSlots || []).find(s => !isSlotFull(s));
      showToast(
        other
          ? 'This slot is full. Please choose the other slot.'
          : 'All slots are full. Please contact us to check availability.'
      );
      if (other) setForm(prev => ({ ...prev, slot: other }));
      return;
    }

    setSubmittingType(paymentType);

    try {
      // 1) Create order (backend enforces capacity + correct amount)
      const orderRes = await fetch('/api/create-order.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentType,
          slot: form.slot,
          customer: {
            name: form.name,
            partnerName: form.partnerName,
            email: form.email,
            phone: form.phone,
          },
          meta: {
            eventName: eventDetails.eventName,
            eventTagline: eventDetails.tagline,
            eventDate: eventDetails.date,
            tableType: eventDetails.tableType,
          },
        }),
      });

      const orderData = (await orderRes.json()) as CreateOrderResponse;

      // refresh slot status after any order attempt
      fetchSlotStatus();

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

      // 3) Verify + write sheet + send email
      const verifyRes = await fetch('/api/verify-payment.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...paymentResult,
          holdRow: orderData.holdRow,
          paymentType: orderData.paymentType,
          slot: orderData.slot,
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
            eventDate: eventDetails.date,
            tableType: eventDetails.tableType,
            amountPaidDisplay: orderData.amountPaidDisplay,
          },
        }),
      });

      const verifyData = (await verifyRes.json()) as VerifyResponse;

      if (!verifyRes.ok || !verifyData?.ok) {
        throw new Error(verifyData?.error || 'Payment verification failed');
      }

      setIsSuccess(true);
      showToast('Booking confirmed! Check your email for confirmation.');
      fetchSlotStatus();
    } catch (err: any) {
      showToast(err?.message || 'Something went wrong. Please try again.');
      fetchSlotStatus();
    } finally {
      setSubmittingType(null);
    }
  };

  return (
    <section className="relative py-24 px-4 md:px-8 overflow-hidden velvet-bg">
      {/* ✅ Toast */}
      <AnimatePresence>
        {toast.open ? (
          <motion.div
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999]"
          >
            <div className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-primary/30 bg-black/80 backdrop-blur text-foreground shadow-xl">
              <XCircle className="w-5 h-5 text-primary" />
              <span className="text-sm">{toast.message}</span>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

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

        {/* Ticket */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: -10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative bg-gradient-to-br from-[#1a1a1a] via-[#0d0d0d] to-[#000] rounded-3xl overflow-hidden border border-primary/20">
            <div className="absolute top-0 left-0 w-24 h-24 border-l-2 border-t-2 border-primary/30 rounded-tl-3xl" />
            <div className="absolute top-0 right-0 w-24 h-24 border-r-2 border-t-2 border-primary/30 rounded-tr-3xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 border-l-2 border-b-2 border-primary/30 rounded-bl-3xl" />
            <div className="absolute bottom-0 right-0 w-24 h-24 border-r-2 border-b-2 border-primary/30 rounded-br-3xl" />

            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-32 perforated-edge" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-32 perforated-edge rotate-180" />

            <div className="p-8 md:p-12">
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-primary/20">
                <div>
                  <h3 className="font-display text-2xl text-foreground mb-1">
                    {eventDetails.eventName}
                  </h3>
                  <p className="text-muted-foreground italic">{eventDetails.tagline}</p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-display text-primary neon-text">
                    {displayFullAmount}
                  </div>
                  <div className="text-sm text-muted-foreground">per couple (full)</div>
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

              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
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
                        value={form.slot}
                        onChange={handleChange}
                        disabled={allSlotsFull || isSubmitting}
                        className="w-full px-4 py-3 bg-input border border-primary/20 rounded-xl text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 inset-shadow transition-all disabled:opacity-60"
                      >
                        {(eventDetails.eventSlots || []).map((s) => {
                          const info = slotStatus?.slots?.[s];
                          const full = info?.isFull === true;
                          const label = info
                            ? `${s} ${full ? '(FULL)' : `(${info.remaining} left)`}`
                            : s;

                          return (
                            <option key={s} value={s} disabled={full}>
                              {label}
                            </option>
                          );
                        })}
                      </select>

                      {allSlotsFull ? (
                        <p className="text-sm text-primary mt-2">
                          All slots are full. Please contact us for availability.
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm text-muted-foreground mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
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
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-input border border-primary/20 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 inset-shadow transition-all"
                        placeholder="+91 98765 43210"
                      />
                    </div>

                    {/* ✅ TWO PAYMENT BUTTONS (only clicked one shows spinner) */}
                    <div className="grid md:grid-cols-2 gap-4 mt-6">
                      <motion.button
                        type="button"
                        disabled={isSubmitting || !rzpReady || allSlotsFull}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handlePay('partial')}
                        className="w-full py-4 px-6 bg-gradient-neon text-primary-foreground font-semibold rounded-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-base"
                      >
                        {submittingType === 'partial' ? (
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
                            Pay {displayPartialAmount} &amp; Book Table
                          </>
                        )}
                      </motion.button>

                      <motion.button
                        type="button"
                        disabled={isSubmitting || !rzpReady || allSlotsFull}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handlePay('full')}
                        className="w-full py-4 px-6 bg-black/30 border border-primary/30 text-foreground font-semibold rounded-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-base"
                      >
                        {submittingType === 'full' ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                              className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full"
                            />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-5 h-5 text-primary" />
                            Pay Full {displayFullAmount}
                          </>
                        )}
                      </motion.button>
                    </div>

                    <p className="text-center text-sm text-muted-foreground mt-4">
                      Secure payment powered by trusted partners
                    </p>
                  </motion.div>
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
                    <h3 className="font-display text-3xl text-foreground mb-2">You're In!</h3>
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
