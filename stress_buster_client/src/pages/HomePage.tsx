import { HomeBanner, MentalIssueBanner, Services } from "@/components/ui/home";

const HomePage = () => {
  return (
    <div className="HomePageContainer  ">
      <HomeBanner />
      <Services />
      <MentalIssueBanner />
    </div>
  );
};

export default HomePage;
