import { format } from 'date-fns';
import { groups } from '@/data/groups';
import { Member } from '@/types/index';

interface WeekendEventProps {
  event: any;
  isAdmin: boolean;
  extraDutyMembers?: Array<{ memberId: string; date: string }>;
  onAddExtraDuty?: (date: Date) => void;
}

const WeekendEvent = ({ event, isAdmin, extraDutyMembers, onAddExtraDuty }: WeekendEventProps) => {
  // 检查该日期是否有额外值日人员
  const dateStr = format(event.start, 'yyyy-MM-dd');
  const extraDutyForDay = extraDutyMembers?.filter(em => em.date === dateStr);
  
  // 获取成员详情
  const extraDutyMemberDetails = extraDutyForDay?.map(duty => {
    const memberGroup = groups.find(g => 
      g.members.some((m: Member) => m.id === duty.memberId)
    );
    const member = memberGroup?.members.find((m: Member) => m.id === duty.memberId);
    
    return {
      member,
      group: memberGroup
    };
  });

  return (
    <div className="bg-gray-100 h-full flex flex-col p-1 rounded">
      <div className="text-xs font-semibold mb-1">周末/节假日</div>
      
      {extraDutyMemberDetails && extraDutyMemberDetails.length > 0 && (
        <div className="text-xs mt-1">
          <div className="font-semibold mb-1">额外值日人员:</div>
          {extraDutyMemberDetails.map((detail, idx) => (
            <div key={idx} className="bg-yellow-100 p-1 rounded mb-1 flex items-center">
              <span className="bg-blue-100 text-blue-800 rounded-full w-4 h-4 flex items-center justify-center mr-1 flex-shrink-0 text-[10px]">
                {detail.group?.name?.charAt(detail.group.name.length - 1)}
              </span>
              <span>{detail.member?.name || '未知成员'}</span>
            </div>
          ))}
        </div>
      )}
      
      {isAdmin && onAddExtraDuty && (
        <button 
          className="mt-auto text-xs bg-green-500 text-white p-1 rounded hover:bg-green-600 w-full"
          onClick={(e) => {
            e.stopPropagation();
            onAddExtraDuty(event.start);
          }}
        >
          添加值日
        </button>
      )}
    </div>
  );
};

export default WeekendEvent; 