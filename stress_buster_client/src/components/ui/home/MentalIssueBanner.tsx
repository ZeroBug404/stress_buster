import Wrapper from "@/components/shared/Wrapper";

import chartImg from "@/assets/homeChart.png";

const MentalIssueBanner = () => {
  return (
    <div className="MentalIssueBannerContainer  py-8">
      <Wrapper className="  p-8 rounded-md bg-gray-100 ">
        <h1 className=" text-3xl font-semibold text-center ">
          Mental health Issues are Common
        </h1>

        {/*  */}

        <div className="bannerContainer mt-10 flex justify-between items-center gap-x-6 ">
          {/* left side  */}
          <div className="leftContainer w-[50%] ">
            <img src={chartImg} alt="" />
          </div>

          {/* right side  */}
          <div className="rightContainer w-[50%] flex flex-col justify-center items-center gap-y-8 ">
            <h1 className=" text-3xl font-bold ">Do You know? </h1>
            <p className="text-lg">
              Mental health conditions are not uncommon. Hundreds of millions
              suffer from them yearly, and many more do over their lifetimes.
              It’s estimated that 1 in 3 women and 1 in 5 men will experience
              major depression in their lives. Other conditions, such as
              schizophrenia and bipolar disorder, are less common but still have
              a large impact on people’s lives.
            </p>
          </div>

          {/*  */}
        </div>

        {/*  */}
      </Wrapper>
    </div>
  );
};

export default MentalIssueBanner;
