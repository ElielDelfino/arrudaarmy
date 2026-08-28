import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Sobre from "@/components/Sobre";
import Method from "@/components/Method";
import Results from "@/components/Results";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <Sobre />
        <Method />
        <Results />
        <LeadForm />
      </main>
      <Footer />
    </>
  );
}
