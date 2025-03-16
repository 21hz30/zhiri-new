import { format } from 'date-fns';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  currentGroup: string;
  newGroup: string;
  weekStart: Date;
}

const ConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  currentGroup, 
  newGroup,
  weekStart 
}: ConfirmModalProps) => {
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">确认更改值日安排</h2>
        <p className="mb-4">
          确定要将 <span className="font-bold">{format(weekStart, 'yyyy-MM-dd')}</span> 开始的一周值日组从 
          <span className="font-bold text-red-600">{currentGroup}</span> 更改为 
          <span className="font-bold text-green-600">{newGroup}</span> 吗?
        </p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
          >
            取消
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            确认更改
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal; 