import Banner from "@/components/Banner";
import Header from "@/components/Header";
import InfoBlock from "@/components/InfoBlock";


import WomanWorkingOut from '../components/InfoBlock/assets/womanWorkingOut.png';
import womanMeditating from '../components/InfoBlock/assets/womanMeditating.png';
import Membership from "@/components/Membership";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <section className="max-w-[1280px] mx-auto">
        <Header />
        <Banner />
        <InfoBlock reverse={false} buttonText={'Entre pro time!'} image={WomanWorkingOut} title={'Get more with low-cost training programs and advanced features.'} subtitle={'We believe fitness should be accessible to everyone, everywhere, regardless of income or access to a gym. With hundreds of professional workouts, healthy recipes and informative articles, as well as one of the most positive communities on the web, you’ll have everything you need to reach your personal fitness goals – for free!'}/>
        <InfoBlock reverse={true} buttonText={'Entre pro time!'} image={womanMeditating} title={'Get more with low-cost training programs and advanced features.'} subtitle={'We believe fitness should be accessible to everyone, everywhere, regardless of income or access to a gym. With hundreds of professional workouts, healthy recipes and informative articles, as well as one of the most positive communities on the web, you’ll have everything you need to reach your personal fitness goals – for free!'}/>
        <Membership />
      </section>
      <Footer />
    </>
  );
}
