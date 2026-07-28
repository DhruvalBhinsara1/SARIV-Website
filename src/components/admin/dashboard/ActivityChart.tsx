import React from "react";
import { ChevronDown } from "lucide-react";

export function ActivityChart() {
  // Dummy data representing activity levels across months
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const heights = [30, 45, 45, 75, 85, 65, 75, 30, 85, 95, 100, 100]; // percentages

  return (
    <div className="bg-surface rounded-3xl p-6 shadow-sm h-full flex flex-col border border-border/50">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-sm font-medium text-secondary">Activity</h3>
        <button className="flex items-center gap-1 text-xs font-medium text-secondary hover:text-primary transition-colors">
          Month <ChevronDown className="w-3 h-3" />
        </button>
      </div>
      
      <div className="flex-1 flex flex-col justify-end relative mt-4">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-[10px] text-muted font-medium w-6">
          <span>400</span>
          <span>300</span>
          <span>200</span>
          <span>100</span>
          <span>0</span>
        </div>

        {/* Chart area */}
        <div className="ml-8 flex-1 flex items-end justify-between gap-1 sm:gap-2">
          {months.map((month, i) => (
            <div key={month} className="flex flex-col items-center flex-1 group">
              <div className="w-full relative h-[180px] sm:h-[220px] flex items-end justify-center">
                <div 
                  className="w-2.5 sm:w-3.5 bg-info/80 group-hover:bg-info transition-colors rounded-full"
                  style={{ height: `${heights[i]}%` }}
                />
              </div>
              <span className="text-[10px] text-muted font-medium mt-3 uppercase tracking-wider">{month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
