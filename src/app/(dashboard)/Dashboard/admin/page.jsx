import StateCard from "./Components/StateCard/StateCard";
import Link from "next/link";
import { useSelector } from "react-redux";
import {
  ShoppingBag,
  Package,
  Users,
  TrendingUp,
  Plus,
  ArrowUpRight,
  Eye,
  Store,
  Settings,
  DollarSign,
  BarChart3,
  PieChart as PieIcon,
  Activity,
} from "lucide-react";
import Image from "next/image";
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import gsap from "gsap";

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#8b5cf6", "#ec4899", "#14b8a6"];

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState("7d");
  const [analytics, setAnalytics] = useState(null);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const dashboardRef = useRef(null);
  const authUser = useSelector((state) => state.auth?.user);
  const adminName = authUser?.name || "Admin";

  // Fetch real data from APIs
  useEffect(() => {
    Promise.all([
      fetch("/api/analytics").then((r) => r.json()),
      fetch("/api/orders?limit=6").then((r) => r.json()),
      fetch("/api/products?limit=4").then((r) => r.json()),
    ])
      .then(([analyticsRes, ordersRes, productsRes]) => {
        if (analyticsRes.success) setAnalytics(analyticsRes.data);
        if (ordersRes.success && ordersRes.orders) setOrders(ordersRes.orders);
        if (productsRes.success && productsRes.products) setProducts(productsRes.products);
      })
      .catch((err) => console.error("Admin dashboard fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  // GSAP animation
  useEffect(() => {
    if (!loading && dashboardRef.current) {
      gsap.fromTo(
        dashboardRef.current.querySelectorAll(".dash-card"),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" }
      );
    }
  }, [loading]);

  const activeChartData = useMemo(() => {
    if (analytics?.revenueTimeline7d && analytics.revenueTimeline7d.length > 0) {
      return analytics.revenueTimeline7d;
    }
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days.map((day) => ({ name: day, revenue: 0, orders: 0 }));
  }, [analytics]);

  const categoryShareData = useMemo(() => {
    if (analytics?.categoryShare && analytics.categoryShare.length > 0) {
      return analytics.categoryShare;
    }
    return [];
  }, [analytics]);

  return (
    <div>
      <StateCard></StateCard>
    </div>
  );
}