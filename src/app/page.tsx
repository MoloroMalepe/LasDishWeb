"use client";

import React, { useState, useCallback, ChangeEvent, FormEvent, ReactNode } from 'react';
import { 
  Home, Menu, Info, Mail, MapPin, Loader, X, CheckCircle, 
  Facebook, Instagram, Twitter, MessageCircle, ShoppingCart, 
  Phone // <-- ADDED: The Phone icon needed to be imported from lucide-react.
} from 'lucide-react';
import Image from 'next/image';

// --- Type Definitions ---

type ViewKey = 'home' | 'menu' | 'about' | 'contact';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  type: 'table' | 'catering' | 'callback';
}

interface Status {
  type: 'success' | 'error';
  message: string;
}

interface MenuItem {
  title: string;
  description: string;
  price: string;
}

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  viewKey: ViewKey;
  // Removed activeView and setActiveView as we no longer use state for navigation
}

// --- Utility Components for Styling ---

// Component for the geometric pattern border on cards - Updated to Red/Yellow scheme
const AfricanCardBorder: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div className="border-4 border-l-red-700 border-b-red-700 border-t-yellow-500 border-r-yellow-500 rounded-2xl shadow-xl overflow-hidden bg-white/95 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl">
    {children}
  </div>
);

// --- Scroll Utility ---
const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
};


// --- Navigation and Main App Structure ---

const App: React.FC = () => {
  
  // WhatsApp Link for Ordering (Actionable Social Link)
  const whatsAppLink = "https://wa.me/27670629743?text=Hi%20Neo%2C%20I%20would%20like%20to%20place%20an%20order%20from%20LasDish%20Deluxe.";

  // Background style incorporating African pattern influence (subtle geometry)
  const appStyle: React.CSSProperties = {
    fontFamily: 'Inter, sans-serif',
    backgroundColor: '#F7F4E9', // Light, earthy background
  };

  // --- Section Components (Now accepting ID for scrolling target) ---

  const HomeSection: React.FC<{ id: string }> = ({ id }) => (
    <div id={id} className="flex flex-col items-center justify-center min-h-[85vh] text-center p-8 bg-gradient-to-br from-yellow-50 to-red-100 rounded-3xl shadow-2xl border-4 border-red-700 mb-16">
      <h2 className="text-6xl font-extrabold text-red-800 mb-6 drop-shadow-md">
        Welcome to LasDish Deluxe!
      </h2>
      <p className="text-2xl text-gray-700 max-w-3xl mb-10 leading-relaxed">
        Experience the rich, authentic flavors of Atteridgeville. We bring you traditional African cuisine, prepared with passion and served with a smile.
      </p>
      <button
        onClick={() => scrollToSection('menu')} // Scroll to Menu
        className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold py-4 px-10 rounded-full shadow-lg text-xl transition-all duration-300 transform hover:scale-105"
      >
        Browse Our Menu
      </button>
      <div className='absolute bottom-8 animate-bounce'>
        <Info className='h-8 w-8 text-red-700' />
      </div>
    </div>
  );

  const MenuSection: React.FC<{ id: string }> = ({ id }) => {
    const menuItems: MenuItem[] = [
      { title: "Mala and Maotwana", description: "A popular mix of slow-cooked Chicken Intestines and Chicken Feet, rich in savory flavor.", price: "R 55" },
      { title: "Mogodu", description: "Classic Beef Tripe (Stomach lining) prepared the traditional way, tender and earthy.", price: "R 70" },
      { title: "Tlhakwana", description: "Tender Beef Trotters (Pigs Feet) stewed to perfection in a savory, light broth.", price: "R 60" },
      { title: "Skop", description: "Grilled Goat Head (skop) – a delicacy. Prepared simply and charred for deep flavor. Available on select days.", price: "R 85" },
      { title: "Isijingi", description: "Butternut/Pumpkin mash blended with soft maize meal, sweet and comforting.", price: "R 45" },
      { title: "Amasi & Pap", description: "Thick, fermented milk (Amasi) served cold alongside warm, soft maize porridge.", price: "R 40" },
      { title: "Ting (Fermented Pap)", description: "A smooth, slightly sour, fermented soft porridge, often eaten with meat.", price: "R 50" },
      { title: "Vetkoek & Mince", description: "Deep-fried dough bread (Vetkoek) filled with spicy, savory ground beef mince.", price: "R 45" },
    ];

    return (
      <section id={id} className="space-y-10 py-16">
        <h2 className="text-4xl font-bold text-red-800 border-b-4 border-yellow-500 pb-2 text-center">LasDish Deluxe Menu</h2>
        <p className="text-center text-lg text-gray-700 max-w-2xl mx-auto">
          Experience the authentic taste of Atteridgeville with our deeply rooted, traditional African dishes. All meals are served with your choice of <span className="font-semibold text-red-600">Pap (Maize Porridge) or Dumpling (Mogodu)</span> and a side of fresh Cabbage.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {menuItems.map((item, index) => (
            <AfricanCardBorder key={index}>
              <div className="p-4 flex flex-col h-full">
                <div className="flex justify-between items-center border-b border-gray-200 pb-2 mb-2">
                  <h3 className="text-xl font-bold text-red-600">{item.title}</h3>
                  <span className="text-lg font-extrabold text-yellow-600 bg-red-100 px-2 py-0.5 rounded-full">{item.price}</span>
                </div>
                <p className="text-gray-600 italic text-sm mt-1 grow">{item.description}</p>
              </div>
            </AfricanCardBorder>
          ))}
        </div>

        <div className="mt-10 p-6 bg-yellow-50 border-4 border-yellow-600 rounded-xl shadow-inner text-center">
          <p className="text-2xl font-semibold text-red-700">Extra:  Achar </p>
          <p className="text-lg text-gray-800">Add a side of our tangy, <span className="text-red-700 text-shadow-xl ">Achar ya Neo</span>  to any meal for an extra <span className="font-bold">R 5</span>.</p>
        </div>
      </section>
    );
  };

  const AboutSection: React.FC<{ id: string }> = ({ id }) => (
    <section id={id} className="max-w-5xl mx-auto space-y-8 py-16">
      <h2 className="text-4xl font-bold text-red-800 border-b-4 border-yellow-500 pb-2 text-center">The Inspiring Story of LasDish Deluxe and Neo</h2>

      <AfricanCardBorder>
        <div className="p-8 grid md:grid-cols-3 gap-6 items-start">

          {/* Image Column - now uses the placeholder for Neo's picture */}
          <div className="col-span-1 flex justify-center">
            <Image
              src="/owner.jpg" // Placeholder for Neo
              alt="Picture of Neo, Founder of LasDish Deluxe"
              className="w-full max-w-[200px] aspect-square object-cover rounded-full border-4 border-red-500 shadow-lg"
              width={400}
              height={400}
              
            />
          </div>
          
          {/* Content Column */}
          <div className="md:col-span-2 space-y-6">
            <h3 className="text-3xl font-semibold text-red-600 mb-2 border-b border-yellow-300 pb-1">Built on Passion, Family, and Community</h3>
            
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">LasDish Deluxe</span> is the dream realized by our founder, <span className="font-semibold">Neo</span>, a dedicated single father to a wonderful son and the supportive firstborn in his family. Neo made the brave choice to step away from the security of a 9-to-5 career to dive wholeheartedly into his true calling: sharing the authentic, rich flavors of Atteridgeville with the world.
            </p>
            <p className="text-gray-700 leading-relaxed font-bold text-red-700">
              This business was built from the ground up—starting from scratch with absolutely no sponsorship. It is a testament to perseverance and faith.
            </p>
            <p className="text-gray-700 leading-relaxed">
              For Neo, the success of LasDish Deluxe is measured not just in sales, but in the livelihoods he supports. He takes immense pride in knowing that he managed to hire staff who are now supporting their own families. This sense of helping others drives him, making him a true &aposbig brother&apos figure in the community.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Despite the challenges of running a growing business, Neo is <span className="font-semibold text-red-600">forever smiling</span> and prioritizes one thing above all: customer satisfaction. Our capability is vast, and we are ready for you! We specialize in catering for weddings, parties, or any ceremony you may have, ensuring we deliver the authentic African flavor of home to as many people as possible.
            </p>
          </div>
        </div>
      </AfricanCardBorder>
    </section>
  );

  const ContactSection: React.FC<{ id: string }> = ({ id }) => {
    // Moved state and handlers local to ContactSection to prevent parent re-render on input
    const [formData, setFormData] = useState<FormData>({ name: '', email: '', phone: '', message: '', type: 'table' });
    const [loading, setLoading] = useState<boolean>(false);
    const [status, setStatus] = useState<Status | null>(null);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value as any }));
    };

    const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      setStatus(null);

      // Simulate API call delay (2 seconds)
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));

        console.log("Form Data Sent (Simulated):", formData);

        setStatus({
          type: 'success',
          message: 'Message sent successfully! Neo will be in touch shortly to assist with your request.'
        });
        setFormData({ name: '', email: '', phone: '', message: '', type: 'table' });
      } catch (error) {
        console.error("Submission Error (Simulated):", error);
        setStatus({
          type: 'error',
          message: 'Sorry, the message failed to send. Please try calling us directly.'
        });
      } finally {
        setLoading(false);
        setTimeout(() => setStatus(null), 5000);
      }
    }, [formData]);


    return (
      <section id={id} className="grid md:grid-cols-2 gap-10 py-16">
        {/* Contact Form */}
        <AfricanCardBorder>
          <div className="p-8">
            <h3 className="text-3xl font-bold text-red-600 mb-6">Send Us a Message</h3>
            <p className="text-gray-600 mb-6">Use this form to book a table, request catering services for your event, or ask for a general callback. Please specify your request type below.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">Request Type</label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border focus:border-yellow-600 focus:ring-yellow-600 bg-yellow-50"
                >
                  <option value="table">Table Booking</option>
                  <option value="catering">Catering / Event Booking</option>
                  <option value="callback">General Callback Request</option>
                </select>
              </div>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name (Required)</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border focus:border-yellow-600 focus:ring-yellow-600"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address (Required)</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border focus:border-yellow-600 focus:ring-yellow-600"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border focus:border-yellow-600 focus:ring-yellow-600"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Details / Message (Required)</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border focus:border-yellow-600 focus:ring-yellow-600"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-lg text-white font-semibold transition duration-200 shadow-lg flex items-center justify-center ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 active:bg-red-800'}`}
              >
                {loading ? (
                  <>
                    <Loader className="animate-spin mr-2 h-5 w-5" /> Submitting...
                  </>
                ) : (
                  'Send Message to Neo'
                )}
              </button>

              {/* Submission Status Message */}
              {status && (
                <div
                  className={`p-4 rounded-lg mt-4 flex items-center ${status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                >
                  {status.type === 'success' ? <CheckCircle className="h-5 w-5 mr-2" /> : <X className="h-5 w-5 mr-2" />}
                  <p className="text-sm font-medium">{status.message}</p>
                </div>
              )}
            </form>
          </div>
        </AfricanCardBorder>

        {/* Location Map & Direct Contact Info */}
        <div className='space-y-6'>
          <AfricanCardBorder>
            <div className='p-6'>
              <h3 className="text-3xl font-bold text-red-800 mb-4">Direct Contact & Ordering</h3>
              <p className="text-gray-700 mb-4">
                Need to place an order quickly or book catering right now? Contact Neo directly on WhatsApp or call our kitchen.
              </p>

              <div className='space-y-4'>
                <a
                  href={whatsAppLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center py-3 px-4 rounded-lg text-white font-semibold bg-green-500 hover:bg-green-600 transition duration-200 shadow-md"
                >
                  <MessageCircle className="h-5 w-5 mr-2" /> Order via WhatsApp
                </a>
                <a
                  href="tel:+27721234567" // Placeholder number
                  className="w-full flex items-center justify-center py-3 px-4 rounded-lg text-red-800 font-semibold border-2 border-red-600 bg-yellow-100 hover:bg-yellow-200 transition duration-200 shadow-md"
                >
                  <Phone className="h-5 w-5 mr-2" /> Call Us Now
                </a>
              </div>
            </div>
          </AfricanCardBorder>
          
          <AfricanCardBorder>
            <div className='p-6'>
              <h3 className="text-3xl font-bold text-red-800 mb-4">Find LasDish Deluxe</h3>
              <p className="text-gray-600 mb-4 flex items-center">
                <MapPin className="h-5 w-5 text-red-600 mr-2" />
                58 Modisakeng Street, Atteridgeville, Pretoria West
              </p>

              <div className="w-full h-[300px] overflow-hidden rounded-xl">
                {/* Google Maps Embed for 58 Modisakeng Street, Atteridgeville. */}
                <iframe
                  title="LasDish Deluxe Restaurant Location"
                  width="100%"
                  height="100%"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3597.469502937987!2d28.0253457!3d-25.7516848!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e95627705139265%3A0x27f502280d0d62d2!2s58%20Modisakeng%20St%2C%20Atteridgeville%2C%20Pretoria%20West%2C%200008!5e0!3m2!1sen!2szw!4v1677777777777!5m2!1sen!2szw"
                  className="border-0"
                ></iframe>
              </div>
            </div>
          </AfricanCardBorder>
        </div>
      </section>
    );
  };


  return (
    <div style={appStyle} className="min-h-screen">
      
      {/* --- Persistent Floating WhatsApp Ordering Button (High-Impact Social CTA) --- */}
      <a 
          href={whatsAppLink}
          target="_blank"
          rel="noopener noreferrer"
          title="Order Now via WhatsApp"
          className="fixed bottom-6 right-6 z-50 p-4 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-100 flex items-center space-x-2 text-lg font-bold"
      >
          <ShoppingCart className="h-6 w-6" />
          <span className="hidden sm:inline">Order Now</span>
      </a>

      {/* Header & Navigation */}
      <header className="sticky top-0 z-20 bg-red-700 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row justify-between items-center">
          {/* Logo/Name that navigates to the Home/Welcome page */}
          <button
            onClick={() => scrollToSection('home')} 
            className="text-left mb-2 md:mb-0 hover:opacity-90 transition-opacity duration-200 focus:outline-none flex items-center space-x-3" 
          >
            {/* Custom Logo Image Placeholder (Red/White Chef Cap) */}
           <Image
  src="/lasdishlogo.jpeg" // Path to your logo in the public folder
  alt="LasDish Deluxe Logo"
  width={48} // 2. Set explicit width (e.g., 48 pixels)
  height={48} // 2. Set explicit height (e.g., 48 pixels)
  className="object-contain" // Use Tailwind class for styling
  // Note: The onError handler is usually not needed here because Next.js handles image loading.
/>
  
            <div className="flex flex-col items-start">
              <h1 className="text-4xl font-extrabold text-yellow-400 tracking-wider leading-none">
                LasDish Deluxe
              </h1>
              <span className="block text-base font-medium text-red-100 mt-[-2px]">Discover a new level of Kasi taste!</span>
            </div>
          </button>
          
          {/* Navigation Bar - Scrolls to sections */}
          <nav className="flex space-x-4 md:space-x-8 text-lg">
            <NavItem icon={Home} label="Home" viewKey="home" />
            <NavItem icon={Menu} label="Menu" viewKey="menu" />
            <NavItem icon={Info} label="About Us" viewKey="about" />
            <NavItem icon={Mail} label="Contact" viewKey="contact" />
          </nav>
        </div>
      </header>

      {/* Main Content Area - All Sections Rendered */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-0">
        <HomeSection id="home" />
        <MenuSection id="menu" />
        <AboutSection id="about" />
        <ContactSection id="contact" />
      </main>

      {/* Footer - Socials for Following (Community & Branding) */}
      <footer className="bg-red-800 text-red-200 p-6 text-center mt-12">
        
        {/* Social Media Links for Following */}
        <div className="flex justify-center space-x-6 mb-4">
            <a 
                href="https://www.facebook.com/LasDishDeluxe" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Follow us on Facebook"
                className="text-2xl hover:text-yellow-400 transition-colors duration-200"
            >
                <Facebook className="w-7 h-7" />
            </a>
            <a 
                href="https://www.instagram.com/LasDishDeluxe" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Follow us on Instagram"
                className="text-2xl hover:text-yellow-400 transition-colors duration-200"
            >
                <Instagram className="w-7 h-7" />
            </a>
            <a 
                href="https://x.com/LasDishDeluxe" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Follow us on X (Twitter)"
                className="text-2xl hover:text-yellow-400 transition-colors duration-200"
            >
                <Twitter className="w-7 h-7" />
            </a>
            {/* WhatsApp Link in Footer (Still for contact, but grouped with socials) */}
            <a 
                href={whatsAppLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Contact us on WhatsApp"
                className="text-2xl hover:text-yellow-400 transition-colors duration-200"
            >
                <MessageCircle className="w-7 h-7" />
            </a>
        </div>

        <p className="text-sm font-medium mb-3">
            Follow us on social media for daily specials and updates!
        </p>
        
        {/* Operating Hours added here */}
        <div className="text-base font-semibold text-yellow-400 mb-3 space-y-1">
            <p>Weekdays (Mon - Fri): 10h00 - 18h00</p>
            <p>Weekends (Sat - Sun): 11h00 - 18h00</p>
        </div>

        {/* Copyright and Address info */}
        <p>&copy; {new Date().getFullYear()} LasDish Deluxe. Discover A New Level Of Kasi taste! Operated by Neo.</p>
        <p className="text-sm mt-2">58 Modisakeng Street, Atteridgeville, Pretoria.</p>
      </footer>
    </div>
  );
};

// --- Navigation Item Component ---
const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, viewKey }) => {
  // Determine if the current scroll position roughly matches this section (Basic implementation)
  const [isScrolledTo, setIsScrolledTo] = useState(false);

  // Simple scroll listener for visual feedback
  React.useEffect(() => {
    const handleScroll = () => {
        const element = document.getElementById(viewKey);
        if (element) {
            const rect = element.getBoundingClientRect();
            // Highlight if the top of the section is within 200px of the viewport top
            setIsScrolledTo(rect.top < 200 && rect.bottom > 200);
        }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [viewKey]);

  return (
    <button
      onClick={() => scrollToSection(viewKey)}
      className={`flex items-center space-x-2 p-2 rounded-lg transition-colors duration-200 ${
        isScrolledTo
          ? 'text-yellow-400 bg-red-600 shadow-inner' // Active state uses Red background
          : 'text-red-100 hover:text-yellow-400 hover:bg-red-600/50'
      }`}
    >
      <Icon className="h-5 w-5" />
      <span className="hidden sm:inline font-medium">{label}</span>
    </button>
  );
};

export default App;