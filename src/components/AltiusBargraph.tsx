"use client";
import React, { useState, useEffect } from "react";
import { BarChart } from "@mui/x-charts/BarChart";

interface DatasetItem {
  department: string;
  point: number;
  isMax?: boolean;
}

type DatasetElementType<T = string | number | Date | null | undefined> = {
  [key: string]: T;
};

const initialDataset: DatasetItem[] = [
  { department: "CSE", point: 6 },
  { department: "ECE", point: 50 },
  { department: "EEE", point: 40 },
  { department: "CIVIL", point: 23 },
  { department: "MECH", point: 70 },
  { department: "IT", point: 6 },
  { department: "AIML", point: 150 },
  { department: "BT", point: 40 },
  { department: "AERO", point: 70 },
];

export default function AltiuspointChart() {
  const [dataset, setDataset] = useState<DatasetItem[]>(initialDataset);
  const [isMobile, setIsMobile] = useState(false);

 
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 3000); 
    };

    checkIfMobile(); 
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);


  const sortDataset = (data: DatasetItem[]) => {
    return [...data].sort((a, b) => b.point - a.point);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDataset((prevDataset) => {
        const maxpoint = Math.max(...prevDataset.map((data) => data.point));

        const updatedDataset = prevDataset.map((data) => ({
          ...data,
          point: Math.max(10, data.point + (Math.random() * 20 - 10)),
          isMax: data.point === maxpoint,
        }));

        return sortDataset(updatedDataset);
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

 
  const chartDataset: DatasetElementType[] = dataset.map((item) => ({
    department: item.department,
    point: item.point,
    isMax: item.isMax ? "true" : "false",
    color: item.isMax ? "red" : undefined,
  }));

  const chartSetting = {
    xAxis: [
      {
        label: "Point",
      },
    ],
    width: isMobile ? 800 : 380,
    height: isMobile ? 600 : 400,
  };

  return (
    <div className="px-4 mx-auto max-w-full sm:max-w-md md:max-w-lg lg:max-w-2xl">
      <BarChart
        dataset={chartDataset}
        yAxis={[{ scaleType: "band", dataKey: "department" }]}
        series={[
          {
            dataKey: "point",
            label: "Point",
            valueFormatter: (value: number | null | undefined) =>
              value !== null && value !== undefined ? `${value.toFixed(2)}` : "",
          },
        ]}
        layout="horizontal"
        grid={{ vertical: true }}
        {...chartSetting}
      />
    </div>
  );
}
