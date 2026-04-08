import React from "react";

const tasks = [
  {
    id: 1,
    clientName: "Shades of Beauty",
    title: "Website Design",
    owner: "Muskan",
    department: "Website Delivery",
    status: "New Lead",
    priority: "Urgent",
    dueDate: "2024-07-29",
    source: "Instagram",
    delivered: false,
  },
  {
    id: 2,
    clientName: "GlowSkin Clinic",
    title: "Facebook Ads Setup",
    owner: "Ravi",
    department: "Facebook Sales",
    status: "In Progress",
    priority: "Normal",
    dueDate: "2024-07-20",
    source: "Facebook",
    delivered: false,
  },
  {
    id: 3,
    clientName: "Urban Wear",
    title: "Ecommerce Store Setup",
    owner: "Ankit",
    department: "Ecommerce",
    status: "Client Review",
    priority: "Low",
    dueDate: "2024-07-18",
    source: "Referral",
    delivered: false,
  },
  {
    id: 4,
    clientName: "FitZone Gym",
    title: "Landing Page Delivery",
    owner: "Neha",
    department: "Website Delivery",
    status: "Delivered",
    priority: "Normal",
    dueDate: "2024-07-10",
    source: "Website",
    delivered: true,
  },
];

const columns = [
  {
    title: "New Leads",
    tasks: tasks.filter((t) => t.status === "New Lead"),
  },
  {
    title: "In Progress",
    tasks: tasks.filter((t) => t.status === "In Progress"),
  },
  {
    title: "Client Review",
    tasks: tasks.filter((t) => t.status === "Client Review"),
  },
  {
    title: "Delivered",
    tasks: tasks.filter((t) => t.status === "Delivered"),
  },
];

function TaskCard({ task }: any) {
  return (
    <div
      style={{
        background: "#fff",
        padding: "12px",
        borderRadius: "12px",
        marginBottom: "10px",
        border: "1px solid #eee",
      }}
    >
      <h3>{task.clientName}</h3>
      <p>{task.title}</p>
      <p>
        <b>Owner:</b> {task.owner}
      </p>
      <p>
        <b>Dept:</b> {task.department}
      </p>
      <p>
        <b>Status:</b> {task.status}
      </p>
      <p>
        <b>Priority:</b> {task.priority}
      </p>
      <p>
        <b>Due:</b> {task.dueDate}
      </p>
      <p>
        <b>{task.delivered ? "Delivered" : "Pending"}</b>
      </p>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Agency Operations</h1>

      <div style={{ display: "flex", gap: "20px" }}>
        {columns.map((col) => (
          <div key={col.title} style={{ flex: 1 }}>
            <h2>
              {col.title} ({col.tasks.length})
            </h2>

            {col.tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
