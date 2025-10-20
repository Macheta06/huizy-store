// client/src/pages/HomePage.jsx
import React from "react";
import HeroSlider from "../components/HeroSlider";
import Testimonials from "../components/Testimonials";
import Collaborations from "../components/Collaborations";

function HomePage() {
  return (
    <div>
      <HeroSlider />
      <Testimonials />
      <Collaborations />
    </div>
  );
}

export default HomePage;
