import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface SettingsData {
  prices: {
    land: number;
    air: number;
    sea: number;
    urgent: number;
    insurance: number;
    cold: number;
  };
  preferences: {
    defaultMethod: string;
    historyRetention: number;
  };
}

const defaultSettings: SettingsData = {
  prices: {
    land: 1.5,
    air: 4.0,
    sea: 0.8,
    urgent: 0.2,
    insurance: 0.15,
    cold: 0.3,
  },
  preferences: {
    defaultMethod: 'land',
    historyRetention: 30,
  },
};

export default function Settings() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<SettingsData>(defaultSettings);

  useEffect(() => {
    const loadSettings = () => {
      const savedSettings = localStorage.getItem('freightSettings');
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    };
    loadSettings();
  }, []);

  const handlePriceChange = (field: keyof SettingsData['prices'], value: number) => {
    setSettings(prev => ({
      ...prev,
      prices: {
        ...prev.prices,
        [field]: value,
      },
    }));
  };

  const handlePreferenceChange = (field: keyof SettingsData['preferences'], value: string | number) => {
    setSettings(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [field]: value,
      },
    }));
  };

  const saveSettings = () => {
    localStorage.setItem('freightSettings', JSON.stringify(settings));
    toast.success('设置已保存');
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center mb-6">
            <button
              onClick={() => navigate(-1)}
              className="mr-4 text-blue-600 hover:text-blue-800"
            >
              <i className="fa-solid fa-arrow-left"></i>
            </button>
            <h1 className="text-2xl font-bold text-gray-800">设置</h1>
          </div>
          
          <div className="space-y-6">
            {/* 计价规则设置 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">计价规则</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">陆运单价 (元/kg/km)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={settings.prices.land}
                    onChange={(e) => handlePriceChange('land', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">空运单价 (元/kg/km)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={settings.prices.air}
                    onChange={(e) => handlePriceChange('air', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">海运单价 (元/kg/km)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={settings.prices.sea}
                    onChange={(e) => handlePriceChange('sea', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">加急费率</label>
                  <input
                    type="number"
                    min="0"
                    max="1"
                    step="0.01"
                    value={settings.prices.urgent}
                    onChange={(e) => handlePriceChange('urgent', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">保险费率</label>
                  <input
                    type="number"
                    min="0"
                    max="1"
                    step="0.01"
                    value={settings.prices.insurance}
                    onChange={(e) => handlePriceChange('insurance', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">冷藏费率</label>
                  <input
                    type="number"
                    min="0"
                    max="1"
                    step="0.01"
                    value={settings.prices.cold}
                    onChange={(e) => handlePriceChange('cold', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
            
            {/* 偏好设置 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">偏好设置</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">默认运输方式</label>
                  <select
                    value={settings.preferences.defaultMethod}
                    onChange={(e) => handlePreferenceChange('defaultMethod', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="land">陆运</option>
                    <option value="air">空运</option>
                    <option value="sea">海运</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">历史记录保留期限 (天)</label>
                  <input
                    type="number"
                    min="1"
                    value={settings.preferences.historyRetention}
                    onChange={(e) => handlePreferenceChange('historyRetention', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
            
            <button
              onClick={saveSettings}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              保存设置
            </button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
