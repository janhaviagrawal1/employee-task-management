import { useEffect, useState } from "react";
import { getDashboard } from "../services/dashboardService";

function Dashboard() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [dashboardData, setDashboardData] =
    useState(null);

  const loadDashboard = async () => {
    try {
      const response =
        await getDashboard();

      setDashboardData(
        response.data.dashboard
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>

      <h3>
        Welcome {user?.name}
      </h3>

      <p>
        Role: {user?.role}
      </p>

      <hr />

      {user?.role === "Admin" &&
        dashboardData && (
          <div>
            <h4>
              Admin Dashboard
            </h4>

            <p>
              Total Users:{" "}
              {
                dashboardData.totalUsers
              }
            </p>

            <p>
              Total Tasks:{" "}
              {
                dashboardData.totalTasks
              }
            </p>

            <p>
              Total Comments:{" "}
              {
                dashboardData.totalComments
              }
            </p>

            <p>
              Total Notifications:{" "}
              {
                dashboardData.totalNotifications
              }
            </p>
          </div>
        )}

      {user?.role === "Manager" &&
        dashboardData && (
          <div>
            <h4>
              Manager Dashboard
            </h4>

            <p>
              Total Tasks:{" "}
              {
                dashboardData.totalTasks
              }
            </p>
          </div>
        )}

      {user?.role === "Employee" &&
        dashboardData && (
          <div>
            <h4>
              Employee Dashboard
            </h4>

            <p>
              My Tasks:{" "}
              {
                dashboardData.myTasks
              }
            </p>
          </div>
        )}
    </div>
  );
}

export default Dashboard;