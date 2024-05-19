import { getDataPlans } from "@/lib/data";
import DataPage from "../components/DataPage";
import { dataPlanTypes } from "@/lib/types";

const page = async () => {

  const plans: dataPlanTypes = await getDataPlans();
  
  return (
    <div>
      <DataPage plans={plans} />
    </div>
  );
};

export default page;
