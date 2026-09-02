import Chart from "./Components/Chart/Chart";
import StateCard from "./Components/StateCard/StateCard";

export default function AdminDashboard() {
  return (
    <div>
      <StateCard></StateCard>
      <Chart></Chart>
    </div>
  );
}