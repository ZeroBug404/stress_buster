import Wrapper from "@/components/shared/Wrapper";
import { FaChartArea, FaRegClock } from "react-icons/fa";
import { GiMedicines } from "react-icons/gi";
import { FaPeopleGroup } from "react-icons/fa6";
import ServiceCard from "./ServiceCard";
import { TService } from "@/types/globalTypes";

const ServicesProvider = [
  {
    id: 1,
    icon: <FaChartArea className=" text-3xl text-prime100 " />,
    heading: "Custom Charts",
    titleText:
      "You can fully customize and track any health measurement and display it on your chart. We start you out with various health measurements that your can customize like mood levels, sleep hours, anxiety levels, irritability levels, etc.. Over time patterns may emerge identifying what works and what doesn't work. The length of time shown on the charts can be adjusted to any date range.",
  },
  {
    id: 2,
    icon: <GiMedicines className=" text-3xl text-prime100 " />,
    heading: "Treatment Tracking",
    titleText:
      "Keep track of your Medications, Supplements, and Exercises. Any change in treatment can be tracked so you have a complete history. When these are shown against your charts, you can see if a treatment change had a positive or negative effect.",
  },
  {
    id: 3,
    icon: <FaRegClock className=" text-3xl text-prime100 " />,
    heading: "Reminders",
    titleText:
      "With Reminders you can schedule emails to be sent to you on a regular basis to remind you to take your medications or to remind you to record your mood.",
  },
  {
    id: 4,
    icon: <FaPeopleGroup className=" text-3xl text-prime100 " />,
    heading: "Wellness Team",
    titleText:
      "Because your charts and treatments are online, it's easy to give others access. Those who care about you the most can take a more active role in helping you reach your wellness goals.",
  },
];

const Services = () => {
  return (
    <div className="ServicesContainer  py-8 ">
      <Wrapper className="  serviceWrapper bg-gray-100 p-6 rounded-md   ">
        <div className="servicesCardContent grid grid-cols-2 gap-x-10 gap-y-16 ">
          {ServicesProvider &&
            ServicesProvider?.map((service: TService) => (
              <ServiceCard key={service.id} service={service} />
            ))}
        </div>
      </Wrapper>
    </div>
  );
};

export default Services;
