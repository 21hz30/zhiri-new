import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay, startOfMonth, endOfMonth, startOfWeek as getWeekStart, addDays } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { AttendanceStatus, STATUS_COLORS } from '@/types/index';
import { groups } from '@/data/groups';
import CustomEvent from './CustomEvent';
import WeekendEvent from './WeekendEvent';
import DutyCalendar from './DutyCalendar';

const locales = {
  'zh-CN': zhCN,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface CalendarViewProps {
  dutySchedule: Array<{
    weekStart: Date;
    group: {
      id: string;
      name: string;
      members: Array<{
        id: string;
        name: string;
      }>;
    };
  }>;
  attendanceRecords: AttendanceStatus[];
  onSelectDate?: (date: Date) => void;
  isAdmin: boolean;
  currentDate: Date;
  onUpdateSchedule?: (weekStart: Date, newGroupId: string) => void;
  extraDutyMembers?: { memberId: string; date: string }[];
  onAddExtraDuty?: (date: Date) => void;
}

interface ExtraDutyMember {
  memberId: string;
  date: string;
}

interface ExtraMemberDetail {
  member: {
    id: string;
    name: string;
    groupId: string;
  } | undefined;
  group: {
    id: string;
    name: string;
    members: Array<{
      id: string;
      name: string;
      groupId: string;
    }>;
  } | undefined;
}

// 修改CalendarEvent接口定义，使其兼容实际使用的事件对象
interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  type?: 'duty' | 'weekend' | 'holiday'; // 将type改为可选属性
  resource?: string; // 添加resource字段
  allDay?: boolean; // 添加allDay字段
  groupId?: string;
  groupName?: string;
  group?: any; // 添加group字段
  weekStart?: Date; // 添加weekStart字段
  members?: Array<{
    id: string;
    name: string;
  }>;
  [key: string]: any; // 允许其他属性
}

const CalendarView = ({
  dutySchedule,
  attendanceRecords,
  onSelectDate,
  isAdmin,
  currentDate,
  onUpdateSchedule,
  extraDutyMembers,
  onAddExtraDuty,
}: CalendarViewProps) => {
  // 生成日历事件
  const calendarEvents = dutySchedule.map(ds => ({
    id: `${ds.weekStart.getTime()}`,
    title: ds.group.name,
    start: ds.weekStart,
    end: addDays(ds.weekStart, 5), // 周一到周五
    allDay: true,
    resource: 'duty',
    group: ds.group,
    weekStart: ds.weekStart,
  }));

  // 周末事件
  const weekendEvents = dutySchedule.flatMap(ds => {
    const saturday = addDays(ds.weekStart, 5);
    const sunday = addDays(ds.weekStart, 6);
    
    return [
      {
        id: `weekend-${saturday.getTime()}`,
        title: '周末',
        start: saturday,
        end: addDays(saturday, 1),
        allDay: true,
        resource: 'weekend',
      },
      {
        id: `weekend-${sunday.getTime()}`,
        title: '周末',
        start: sunday,
        end: addDays(sunday, 1),
        allDay: true,
        resource: 'weekend',
      }
    ];
  });

  const allEvents = [...calendarEvents, ...weekendEvents];

  const eventStyleGetter = (event: CalendarEvent) => {
    if (event.resource === 'duty') {
      return {
        style: {
          backgroundColor: '#2a63b7', // 蓝色
          borderRadius: '4px',
          opacity: 0.8,
          color: 'white',
          border: '0',
          display: 'block',
          padding: '4px',
        }
      };
    } else if (event.resource === 'weekend') {
      return {
        style: {
          backgroundColor: '#f3f4f6', // 灰色
          borderRadius: '4px',
          opacity: 0.8,
          color: 'black',
          border: '0',
          display: 'block',
          padding: '4px',
        }
      };
    }
    return {};
  };

  const customComponents = {
    event: (props: any) => {
      const { event } = props;
      
      if (event.resource === 'duty') {
        return (
          <CustomEvent 
            event={event} 
            isAdmin={isAdmin} 
            onUpdateSchedule={onUpdateSchedule}
            extraDutyMembers={extraDutyMembers}
            onAddExtraDuty={onAddExtraDuty}
          />
        );
      } else if (event.resource === 'weekend') {
        return (
          <WeekendEvent 
            event={event} 
            isAdmin={isAdmin}
            extraDutyMembers={extraDutyMembers}
            onAddExtraDuty={onAddExtraDuty}
          />
        );
      }
      return <div>{event.title}</div>;
    }
  };

  // 定义格式化函数
  const formats = {
    monthHeaderFormat: (date: Date) => format(date, 'yyyy年MM月'),
    dayHeaderFormat: (date: Date) => format(date, 'yyyy年MM月dd日 eeee', { locale: zhCN }),
    dayRangeHeaderFormat: ({ start, end }: { start: Date; end: Date }) => 
      `${format(start, 'yyyy年MM月dd日')} - ${format(end, 'MM月dd日')}`,
  };

  // 定义日历文本
  const messages = {
    today: '今天',
    previous: '上一月',
    next: '下一月',
    month: '月',
    week: '周',
    day: '日',
    agenda: '日程',
    date: '日期',
    time: '时间',
    event: '事件',
    showMore: (total: number) => `+${total} 更多`,
  };

  return (
    <div className="h-[600px] bg-white p-4 rounded-lg shadow-md">
      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        views={['month', 'week']}
        defaultView="month"
        eventPropGetter={eventStyleGetter}
        selectable
        onSelectSlot={(slotInfo) => {
          if (onSelectDate) {
            onSelectDate(slotInfo.start);
          }
        }}
        components={customComponents}
        date={currentDate}
        onNavigate={date => {}} // 日历导航由父组件控制
        formats={formats}
        messages={messages}
      />
    </div>
  );
};

export default CalendarView; 