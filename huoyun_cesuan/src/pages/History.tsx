import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FreightCalculation, FreightResult } from '@/types/freight';

interface HistoryRecord {
  formData: FreightCalculation;
  result: FreightResult;
  timestamp: string;
}

export default function History() {
  const [records, setRecords] = useState<HistoryRecord[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<HistoryRecord[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<HistoryRecord | null>(null);
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: '',
    end: '',
  });
  const [transportType, setTransportType] = useState<string>('all');

  useEffect(() => {
    const loadRecords = () => {
      try {
        const savedRecords = localStorage.getItem('freightRecords');
        if (savedRecords) {
          const parsedRecords = JSON.parse(savedRecords);
          setRecords(parsedRecords);
          setFilteredRecords(parsedRecords);
        }
      } catch (error) {
        toast.error('加载历史记录失败');
      }
    };

    loadRecords();
  }, []);

  useEffect(() => {
    let result = [...records];
    
    // 按日期筛选
    if (dateRange.start || dateRange.end) {
      result = result.filter(record => {
        const recordDate = new Date(record.timestamp).getTime();
        const startDate = dateRange.start ? new Date(dateRange.start).getTime() : 0;
        const endDate = dateRange.end ? new Date(dateRange.end).getTime() : Date.now();
        return recordDate >= startDate && recordDate <= endDate;
      });
    }
    
    // 按运输方式筛选
    if (transportType !== 'all') {
      result = result.filter(record => record.formData.transportType === transportType);
    }
    
    setFilteredRecords(result);
  }, [records, dateRange, transportType]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // 修复运输方式类型不匹配问题
  // 修改 getTransportTypeName 函数，确保它能接受字符串类型的参数
  const getTransportTypeName = (type: string) => {
    switch (type) {
      case 'land': return '陆运';
      case 'air': return '空运';
      case 'sea': return '海运';
      default: return '未知';
    }
  };
  
  // 修改筛选逻辑，添加类型检查
  useEffect(() => {
    if (!records.length) return;
    
    const filtered = records.filter(record => {
      const recordDate = new Date(record.timestamp);
      const startDateObj = startDate ? new Date(startDate) : null;
      const endDateObj = endDate ? new Date(endDate) : null;
      
      const dateMatch = (!startDateObj || recordDate >= startDateObj) && 
                     (!endDateObj || recordDate <= endDateObj);
      
      // 确保类型安全
      const transportTypeMatch = transportType === 'all' || 
                                record.transportType === transportType;
      
      return dateMatch && transportTypeMatch;
    });
    
    setFilteredRecords(filtered);
  }, [records, startDate, endDate, transportType]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">历史记录</h1>
          
          {/* 筛选区域 */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">开始日期</label>
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">结束日期</label>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">运输方式</label>
                <select
                  value={transportType}
                  onChange={(e) => setTransportType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">全部</option>
                  <option value="land">陆运</option>
                  <option value="air">空运</option>
                  <option value="sea">海运</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* 记录列表 */}
          {filteredRecords.length > 0 ? (
            <div className="space-y-4">
              {filteredRecords.map((record, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedRecord(record)}
                  className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-gray-800">{formatDate(record.timestamp)}</h3>
                      // 修复前
                      <p className="text-sm text-gray-600">
                        {getTransportTypeName(record.formData.transportType)} · 
                        重量: {record.formData.weight}kg · 
                        距离: {record.formData.distance}km
                      </p>
                      
                      // 修复后
                      <p className="text-sm text-gray-600">
                        {getTransportTypeName(record.formData.transportType)} · 
                        车型: {record.formData.vehicleParams.vehicleType} · 
                        距离: {record.formData.transportParams.distance}km
                      </p>
                    </div>
                    <div className="text-lg font-bold text-blue-600">
                      ¥{record.result.totalCost.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-500">暂无历史记录</p>
              <Link
                to="/"
                className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-sm"
              >
                去计算运费
              </Link>
            </div>
          )}
        </div>
      </main>
      
      {/* 详情模态框 */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  {formatDate(selectedRecord.timestamp)}
                </h2>
                // 在文件开头添加引入
                import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
                import { faXmark, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
                
                // 修复图标使用
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">运输详情</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500">运输方式:</span>
                      <span className="ml-2">{getTransportTypeName(selectedRecord.formData.transportType)}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">重量:</span>
                      <span className="ml-2">{selectedRecord.formData.weight} kg</span>
                    </div>
                    <div>
                      <span className="text-gray-500">体积:</span>
                      <span className="ml-2">{selectedRecord.formData.volume} m³</span>
                    </div>
                    <div>
                      <span className="text-gray-500">距离:</span>
                      <span className="ml-2">{selectedRecord.formData.distance} km</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">特殊要求</h3>
                  <div className="text-sm">
                    {selectedRecord.formData.specialRequirements.urgent && <p>加急</p>}
                    {selectedRecord.formData.specialRequirements.insurance && <p>保险</p>}
                    {selectedRecord.formData.specialRequirements.cold && <p>冷藏</p>}
                    {!selectedRecord.formData.specialRequirements.urgent && 
                     !selectedRecord.formData.specialRequirements.insurance && 
                     !selectedRecord.formData.specialRequirements.cold && (
                      <p className="text-gray-500">无特殊要求</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">费用明细</h3>
                  <div className="space-y-1 text-sm">
                    {selectedRecord.result.details.map((detail, index) => (
                      <p key={index}>{detail}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
}
