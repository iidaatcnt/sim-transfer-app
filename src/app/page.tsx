"use client";

import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Home() {
  const [currentPlan, setCurrentPlan] = useState(5000);
  const [newPlan, setNewPlan] = useState(2000);
  const [transferMonth, setTransferMonth] = useState(1);
  const [cancellationFee, setCancellationFee] = useState(20000);
  const [mnpFee, setMnpFee] = useState(3000);
  const [chartData, setChartData] = useState({});
  const [resultText, setResultText] = useState("");

  const calculateChartData = () => {
    const labels = Array.from({ length: 61 }, (_, i) => `${i}ヶ月`);

    const currentPlanData = labels.map((_, i) => currentPlan * i);

    const newPlanData = labels.map((_, i) => {
      if (i < transferMonth) {
        return currentPlan * i;
      } else {
        const initialCost = cancellationFee + mnpFee;
        const oldPlanCost = currentPlan * (transferMonth > 0 ? transferMonth - 1 : 0);
        const monthsOnNewPlan = i - (transferMonth > 0 ? transferMonth - 1 : 0);
        const newPlanCost = newPlan * monthsOnNewPlan;
        return oldPlanCost + initialCost + newPlanCost;
      }
    });

    let breakEvenPoint = -1;
    for (let i = 1; i < labels.length; i++) {
      if (newPlanData[i] < currentPlanData[i]) {
        breakEvenPoint = i;
        break;
      }
    }

    let text = "";
    if (breakEvenPoint !== -1) {
      text = `乗り換え${transferMonth}ヶ月目から、${breakEvenPoint}ヶ月目以降は常にお得になります。`;
      const yearlySavings = (currentPlan - newPlan) * 12;
      text += `\n乗り換え後は、年間${yearlySavings.toLocaleString()}円の節約効果が見込めます。`;
      const threeYearSavings = (currentPlan - newPlan) * 36 - (cancellationFee + mnpFee);
      text += `\n3年間の累計節約額は、${threeYearSavings.toLocaleString()}円です。`;
    } else {
      text = "この設定では、5年以内に乗り換え費用を回収できません。";
    }
    setResultText(text);

    setChartData({
      labels,
      datasets: [
        {
          label: "現在のプラン",
          data: currentPlanData,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: "新しいプラン",
          data: newPlanData,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    });
  };

  useEffect(() => {
    calculateChartData();
  }, [currentPlan, newPlan, transferMonth, cancellationFee, mnpFee]);

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          格安SIM乗り換えシミュレーター
        </p>
      </div>

      <div className="w-full max-w-5xl mt-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
          <div>
            <label htmlFor="currentPlan" className="block text-sm font-medium text-gray-700">
              現在の月額料金
            </label>
            <input
              type="number"
              name="currentPlan"
              id="currentPlan"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={currentPlan}
              onChange={(e) => setCurrentPlan(Number(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="newPlan" className="block text-sm font-medium text-gray-700">
              新しい月額料金
            </label>
            <input
              type="number"
              name="newPlan"
              id="newPlan"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={newPlan}
              onChange={(e) => setNewPlan(Number(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="transferMonth" className="block text-sm font-medium text-gray-700">
              乗り換えタイミング (ヶ月後)
            </label>
            <input
              type="number"
              name="transferMonth"
              id="transferMonth"
              min="1"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={transferMonth}
              onChange={(e) => setTransferMonth(Number(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="cancellationFee" className="block text-sm font-medium text-gray-700">
              解約金
            </label>
            <input
              type="number"
              name="cancellationFee"
              id="cancellationFee"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={cancellationFee}
              onChange={(e) => setCancellationFee(Number(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="mnpFee" className="block text-sm font-medium text-gray-700">
              MNP手数料
            </label>
            <input
              type="number"
              name="mnpFee"
              id="mnpFee"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={mnpFee}
              onChange={(e) => setMnpFee(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="mt-8">
          {chartData.labels && (
            <Line
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                  },
                  title: {
                    display: true,
                    text: "累計支払額の比較",
                  },
                },
              }}
              data={chartData}
            />
          )}
        </div>
        <div className="mt-8 text-center whitespace-pre-line">
          <p>{resultText}</p>
        </div>
      </div>
    </main>
  );
}