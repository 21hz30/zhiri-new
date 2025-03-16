import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { AttendanceStatus, Member } from '@/types/index';
import { groups } from '@/data/groups';

interface SubstitutionInfoProps {
  date: Date;
  records: AttendanceStatus[];
}

const SubstitutionInfo = ({ date, records }: SubstitutionInfoProps) => {
  // 找出所有代值日的记录
  const substitutedRecords = records.filter(r => 
    r.date === format(date, 'yyyy-MM-dd') && 
    (r.isSubstituted || r.isExchanged)
  );
  
  if (substitutedRecords.length === 0) {
    return null;
  }
  
  return (
    <div className="mt-4 bg-blue-50 p-3 rounded-md">
      <h3 className="text-sm font-semibold text-blue-800 mb-2">
        {format(date, 'MM月dd日', { locale: zhCN })} 值日调整信息
      </h3>
      <ul className="space-y-1 text-xs">
        {substitutedRecords.map(record => {
          const memberGroup = groups.find(g => 
            g.members.some((m: Member) => m.id === record.memberId)
          );
          const member = memberGroup?.members.find((m: Member) => m.id === record.memberId);
          
          let substitutedByMember;
          if (record.substitutedBy) {
            const substitutedByGroup = groups.find(g => 
              g.members.some((m: Member) => m.id === record.substitutedBy)
            );
            substitutedByMember = substitutedByGroup?.members.find((m: Member) => m.id === record.substitutedBy);
          }
          
          let exchangedWithMember;
          if (record.exchangedWith) {
            const exchangedWithGroup = groups.find(g => 
              g.members.some((m: Member) => m.id === record.exchangedWith)
            );
            exchangedWithMember = exchangedWithGroup?.members.find((m: Member) => m.id === record.exchangedWith);
          }
          
          return (
            <li key={record.id} className="flex items-start">
              <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">
                {record.isSubstituted ? "代" : "换"}
              </span>
              <div>
                {record.isSubstituted ? (
                  <>
                    <span className="font-medium">{member?.name}</span> 
                    <span className="text-gray-500 mx-1">由</span>
                    <span className="font-medium">{substitutedByMember?.name}</span>
                    <span className="text-gray-500 ml-1">代值日</span>
                  </>
                ) : (
                  <>
                    <span className="font-medium">{member?.name}</span>
                    <span className="text-gray-500 mx-1">与</span>
                    <span className="font-medium">{exchangedWithMember?.name}</span>
                    <span className="text-gray-500 ml-1">互换值日</span>
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SubstitutionInfo; 