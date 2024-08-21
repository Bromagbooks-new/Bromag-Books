import BillingManagement from "@/assets/images/Bromag Dashboard Features/BILLING MANAGEMENT 1.svg";

const FeatureDescription = ({title, desc1, img, disc2}) => {
  return (
    <div className="p-4 font-space-grotesk flex flex-col gap-4 mx-20">
      <span className=" rounded-xl p-2 border-3 w-64 font-bold text-center border-landing-primary text-landing-primary text-2xl">
        Sales Management
      </span>
      <div className="bg-[#C8E1FF40] px-40  py-20 flex flex-col gap-16 items-center text-center">
        <p className="text-2xl">
          A Restaurant Sales Management System is essential for optimizing the
          sales processes and revenue streams of modern dining establishments.
          This system provides comprehensive tools for tracking sales, managing
          orders, and analyzing customer preferences, enabling restaurants to
          tailor their offerings and marketing strategies effectively. With
          real-time reporting and analytics, restaurant owners can monitor
          performance metrics, identify trends, and make data-driven decisions
          to boost sales and profitability. The system also streamlines the
          payment process, supporting various payment methods to ensure a smooth
          and efficient customer experience.
        </p>
        <img src={BillingManagement} className="relative -z-10 bottom-32 w-[60rem] h-[60rem]" />
        <p className="text-2xl -mt-60">
          a robust Restaurant Sales Management System enhances inventory
          control, reducing waste and ensuring that popular items are always in
          stock. It integrates seamlessly with other restaurant technologies,
          such as POS systems and online ordering platforms, creating a cohesive
          operational environment. The system's ability to manage promotions,
          discounts, and loyalty programs further drives customer engagement and
          retention. By implementing a Restaurant Sales Management System,
          restaurants can improve operational efficiency, increase sales, and
          provide exceptional service, ultimately leading to sustained growth
          and success.
        </p>
      </div>
    </div>
  );
};

export default FeatureDescription;
