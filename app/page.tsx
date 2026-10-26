import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Introduction from "@/components/Introduction";
import AboutCounsellor from "@/components/AboutCounsellor";
import AreasOfHelp from "@/components/AreasOfHelp";
import CBTSection from "@/components/CBTSection";
import ProcessTimeline from "@/components/ProcessTimeline";
import ConvenienceSection from "@/components/ConvenienceSection";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import BookingSection from "@/components/BookingSection";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Introduction />
        <AboutCounsellor />
        <AreasOfHelp />
        <CBTSection />
        <ProcessTimeline />
        <ConvenienceSection />
        <Testimonials />
        <FAQ />
        <BookingSection />
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
}
