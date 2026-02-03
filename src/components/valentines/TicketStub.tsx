import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Check, Sparkles } from 'lucide-react';
import { eventDetails } from '@/data/mockData';

interface BookingForm {
  name: string;
  partnerName: string;
  email: string;
  phone: string;
}

export const TicketStub = () => {
  const [form, setForm] = useState<BookingForm>({
    name: '',
    partnerName: '',
    email: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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
            Reserve Your Sanctuary
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            Make it <span className="text-primary neon-text">Official</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Limited sanctuaries available. Secure yours today.
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
                    {eventDetails.name}
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
                          Partner's Name
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
                      disabled={isSubmitting}
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
                          Pay & Reserve Your Sanctuary
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
                      Your sanctuary is reserved. Check your email for confirmation.
                    </p>
                    <div className="inline-block px-6 py-3 rounded-full bg-primary/10 border border-primary/30">
                      <span className="font-display text-xl text-primary">
                        {form.name} ♥ {form.partnerName}
                      </span>
                    </div>
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
