"use client"; 

import Banner from "../components/home/Banner";
import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import Testimonials from "../components/home/Testimonials";
import CallToAction from "../components/home/CallToAction";
import Footer from "../components/home/Footer";
import { ReactLenis } from 'lenis/react'

const Home = () => {
  return (
    <ReactLenis root>
    <div>
      <Banner />
      <Hero />
      <Features />
      <Testimonials />
      <CallToAction />
      <Footer />
    </div>
    </ReactLenis>
  );
};

export default Home;
