import Banner from "@/components/Banner";
import Header from "@/components/Header";
import InfoBlock from "@/components/InfoBlock";

export default function Home() {
  return (
    <section className="max-w-[1280px] mx-auto">
      <Header />
      <Banner />
      <InfoBlock />
    </section>
  );
}
