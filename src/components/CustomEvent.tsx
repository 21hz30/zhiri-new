import { useState } from 'react';
import { format, isSameDay } from 'date-fns';
import { groups } from '@/data/groups';
import ConfirmModal from './ConfirmModal';
import { Member } from '@/types/index';

interface ExtraDutyMember {
  memberId: string;
  date: string;
}

// 定义事件类型
interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  type: string;
  groupId?: string;
  groupName?: string;
  members?: Member[];
  resource?: string;
  [key: string]: any; // 允许其他属性
}

interface CustomEventProps {
  event: CalendarEvent;
  isAdmin: boolean;
  onUpdateSchedule?: (weekStart: Date, newGroupId: string) => void;
  extraDutyMembers?: ExtraDutyMember[];
  onAddExtraDuty?: (date: Date) => void;
}

const CustomEvent = ({ 
  event, 
  isAdmin, 
  onUpdateSchedule,
  extraDutyMembers,
  onAddExtraDuty 
}: CustomEventProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  if (!event.group) return null;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAdmin && onUpdateSchedule) {
      setShowDropdown(!showDropdown);
    }
  };

  const handleGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.stopPropagation();
    setSelectedGroup(e.target.value);
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    if (onUpdateSchedule && selectedGroup) {
      onUpdateSchedule(event.weekStart, selectedGroup);
      setShowConfirm(false);
      setShowDropdown(false);
    }
  };

  const handleMemberClick = (e: React.MouseEvent, member: Member) => {
    // ... existing code ...
  };

  // 按日期分组额外值日人员
  const extraMembers = extraDutyMembers
    ? extraDutyMembers.filter(em => {
      const emDate = new Date(em.date);
      return emDate >= event.weekStart && 
        emDate < new Date(event.weekStart.getTime() + 7 * 24 * 60 * 60 * 1000);
    })
    : [];
  
  // 获取额外值日人员的详细信息
  const extraMembersDetails = extraMembers.map(em => {
    const memberGroup = groups.find(g => 
      g.members.some((m: Member) => m.id === em.memberId)
    );
    const member = memberGroup ? memberGroup.members.find((m: Member) => m.id === em.memberId) : undefined;
    
    return {
      member,
      group: memberGroup,
      date: new Date(em.date)
    };
  });

  // 按日期对额外值日人员进行排序
  extraMembersDetails.sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <div 
      className="flex flex-col h-full cursor-pointer overflow-hidden"
      onClick={handleClick}
    >
      <div className="mb-1 font-bold text-sm bg-blue-100 p-1 rounded flex justify-between items-center">
        <span>值日组: {event.group.name}</span>
        {isAdmin && onUpdateSchedule && (
          <div className="relative" onClick={e => e.stopPropagation()}>
            {showDropdown && (
              <select 
                className="absolute right-0 top-full z-10 bg-white rounded shadow-lg p-1 text-xs"
                onChange={handleGroupChange}
                value={selectedGroup}
              >
                <option value="">请选择</option>
                {groups.map(g => (
                  <option key={g.id} value={g.id}>
                    {g.name}
                  </option>
                ))}
              </select>
            )}
            <button className="text-xs bg-blue-500 text-white px-1 rounded hover:bg-blue-600">
              {showDropdown ? '取消' : '修改'}
            </button>
          </div>
        )}
      </div>
      
      <div className="space-y-1 flex-grow overflow-auto text-xs">
        {event.group.members.map((member: Member) => (
          <div 
            key={member.id}
            className="bg-gray-100 p-1 rounded hover:bg-gray-200 transition-colors"
            onClick={(e) => handleMemberClick(e, member)}
          >
            {member.name}
          </div>
        ))}
      </div>
      
      {extraMembersDetails.length > 0 && (
        <div className="mt-1 border-t pt-1">
          <div className="text-xs font-semibold mb-1">额外值日人员:</div>
          {extraMembersDetails.map((detail, idx) => (
            <div key={idx} className="text-xs bg-yellow-100 p-1 rounded mb-1">
              <div className="font-medium">{format(detail.date, 'MM/dd')}: {detail.member?.name}</div>
              <div className="text-gray-500">{detail.group?.name}</div>
            </div>
          ))}
        </div>
      )}
      
      {isAdmin && onAddExtraDuty && (
        <button 
          className="mt-auto text-xs bg-green-500 text-white p-1 rounded hover:bg-green-600 w-full"
          onClick={(e) => {
            e.stopPropagation();
            if (onAddExtraDuty) onAddExtraDuty(event.weekStart);
          }}
        >
          添加额外值日
        </button>
      )}
      
      {showConfirm && (
        <ConfirmModal
          isOpen={showConfirm}
          onClose={() => setShowConfirm(false)}
          onConfirm={handleConfirm}
          currentGroup={event.group.name}
          newGroup={groups.find(g => g.id === selectedGroup)?.name || ''}
          weekStart={event.weekStart}
        />
      )}
    </div>
  );
};

export default CustomEvent; 