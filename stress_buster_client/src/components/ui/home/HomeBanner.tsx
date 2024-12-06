import Wrapper from "@/components/shared/Wrapper";
import { Button } from "../button";

import bannerImg2 from "@/assets/bannerImg2.jpg";

const HomeBanner = () => {
  return (
    <div className="HomeBannerContainer py-10 ">
      <Wrapper className=" homeBannerWrapper  flex justify-between items-center gap-x-4  ">
        {/* banner left section  */}
        <div className="bannerLeft flex flex-col gap-y-8 w-[50%] ">
          {/* heading  */}
          <h1 className=" text-5xl font-semibold ">
            Discover Your Path to Calm with Stress Buster
          </h1>

          {/* sub text  */}
          <p className=" text-xl ">
            Track your mood, receive personalized activity suggestions, and
            build habits for a healthier, stress-free life.
          </p>

          {/* button section  */}
          <div className="buttonSection">
            <Button className=" text-xl bg-prime100 hover:bg-prime100   ">
              Chat with us...
              <div className=" h-[.8rem] w-[.08rem] bg-gray-100 animate-ping rounded-md"></div>
            </Button>
          </div>

          {/*  */}
        </div>
        {/*  */}

        {/* banner right section  */}
        <div className="bannerRight  w-[50%]   ">
          <img src={bannerImg2} className="  " alt="" />
        </div>
      </Wrapper>
    </div>
  );
};

export default HomeBanner;
