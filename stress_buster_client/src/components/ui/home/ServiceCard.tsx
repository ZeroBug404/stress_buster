import { TService } from "@/types/globalTypes";

const ServiceCard = ({ service }: { service: TService }) => {
  return (
    <div className="ServiceCardContainer">
      <div className="seviceCard flex justify-between gap-x-3 ">
        {/* service left icon section   */}
        <div className=" leftSection serviceLogo">{service?.icon}</div>

        {/* right side text starts  */}
        <div className="rightSection flex flex-col gap-y-2 ">
          <h1 className=" text-xl font-semibold "> {service?.heading} </h1>

          <p>{service?.titleText}</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
