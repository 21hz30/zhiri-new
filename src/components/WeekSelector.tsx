import { useState, useEffect } from 'react';
import { format, eachWeekOfInterval, startOfYear, endOfYear } from 'date-fns';
import { zhCN } from 'date-fns/locale';

interface WeekSelectorProps {
  currentDate: Date;
  onChange: (date: Date) => void;
}

const WeekSelector = ({ 
  currentDate, 
  onChange 
}: WeekSelectorProps) => {
  const [year, setYear] = useState(currentDate.getFullYear().toString());
  const [selectedWeek, setSelectedWeek] = useState('');

  // 获取一年中的所有工作周
  const getWorkWeeks = (year: number) => {
    const startDate = startOfYear(new Date(year, 0, 1));
    const endDate = endOfYear(new Date(year, 0, 1));
    
    const weekStarts = eachWeekOfInterval(
      { start: startDate, end: endDate },
      { weekStartsOn: 1 } // 周一为一周的开始
    );
    
    return weekStarts.map(weekStart => {
      // 计算这周的结束日期（周五）
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 4); // 周一 + 4 = 周五
      
      // 格式化日期范围
      const weekLabel = `${format(weekStart, 'MM月dd日', { locale: zhCN })} - ${format(weekEnd, 'MM月dd日', { locale: zhCN })}`;
      
      return { 
        date: weekStart,
        label: weekLabel 
      };
    });
  };

  // 当年份或周发生变化时，更新选择的日期
  useEffect(() => {
    if (selectedWeek) {
      const date = new Date(selectedWeek);
      onChange(date);
    }
  }, [selectedWeek, onChange]);

  // 当日期发生变化时，更新选择的年份和周
  useEffect(() => {
    setYear(currentDate.getFullYear().toString());
    setSelectedWeek(currentDate.toISOString());
  }, [currentDate]);

  // 获取可选的年份列表（从2025年到2030年）
  const yearOptions = Array.from({ length: 6 }, (_, i) => (2025 + i).toString());

  // 获取当前年份的所有周
  const weekOptions = getWorkWeeks(parseInt(year));

  return (
    <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-y-0 md:space-x-4">
      <div className="flex items-center">
        <label htmlFor="year-select" className="mr-2 text-sm font-medium text-gray-700">年份:</label>
        <select
          id="year-select"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="bg-white border border-gray-300 rounded-md py-1 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {yearOptions.map((y) => (
            <option key={y} value={y}>{y}年</option>
          ))}
        </select>
      </div>
      
      <div className="flex items-center flex-1">
        <label htmlFor="week-select" className="mr-2 text-sm font-medium text-gray-700">周次:</label>
        <select
          id="week-select"
          value={selectedWeek}
          onChange={(e) => setSelectedWeek(e.target.value)}
          className="bg-white border border-gray-300 rounded-md py-1 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
        >
          {weekOptions.map((week, index) => (
            <option key={index} value={week.date.toISOString()}>
              第{index + 1}周: {week.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default WeekSelector; 