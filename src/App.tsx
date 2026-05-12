import { Contacts } from './components/Contacts';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PriceGuide } from './components/PriceGuide';
import { Process } from './components/Process';
import { RepairQuiz } from './components/RepairQuiz';
import { Reviews } from './components/Reviews';
import { Services } from './components/Services';
import { StickyMobileCTA } from './components/StickyMobileCTA';
import { TransparentRepair } from './components/TransparentRepair';
import { TrustBar } from './components/TrustBar';
import { UrgentCases } from './components/UrgentCases';
import { WhyChoose } from './components/WhyChoose';

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <Services />
        <TransparentRepair />
        <RepairQuiz />
        <UrgentCases />
        <PriceGuide />
        <Process />
        <Reviews />
        <WhyChoose />
        <FAQ />
        <Contacts />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}

export default App;
