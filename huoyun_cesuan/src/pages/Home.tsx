import { useState } from 'react';
import { z } from 'zod';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  FreightCalculation,
  FreightResult,
} from '@/types/freight';

const formSchema = z.object({
  vehicleParams: z.object({
    brand: z.string(),
    vehicleType: z.enum(['9.6m', '17.5m', 'other']),
    // ... 其他验证规则
  })
});

import { useRef } from 'react';

export default function Home() {
  const [showVehicleTypePrompt, setShowVehicleTypePrompt] = useState(true);
  const distanceInputRef = useRef<HTMLInputElement>(null);
  const loadingWeightRef = useRef<HTMLInputElement>(null);

  const setVehicleDefaults = (vehicleType: '9.6m' | '17.5m' | 'other') => {
    let fixedDefaults, variableDefaults, brand, loadCapacity;
    let transportParamsDefaults: { loadingWeight: number; loadingQuantity: number; loadingVolume: number };
    
    switch(vehicleType) {
      case '9.6m':
        brand = '解放';
        loadCapacity = 15;
        fixedDefaults = {
          vehiclePrice: 250000,
          serviceLife: 10,
          driverSalary: 100000,
          repairFee: 10000,
          vehicleInsurance: 13000,
          otherFixedCosts: 0,
        };
  variableDefaults = {
    fuelConsumption: 25,
    tireCost: 0.12,
    tollFee: 1.5,
    maintenanceFee: 0.5,
    otherVariableCosts: 0,
    expectedProfit: 50000,
  };
        transportParamsDefaults = {
          loadingWeight: 15,
          loadingQuantity: 750,
          loadingVolume: 65,
        };
        break;
      case '17.5m':
        brand = '解放';
        loadCapacity = 30;
        fixedDefaults = {
          vehiclePrice: 540000,
          serviceLife: 10,
          driverSalary: 140000,
          repairFee: 12000,
          vehicleInsurance: 22000,
          otherFixedCosts: 0,
        };
  variableDefaults = {
    fuelConsumption: 35,
    tireCost: 0.26,
    tollFee: 2.26,
    maintenanceFee: 0.8,
    otherVariableCosts: 0,
  expectedProfit: 100000,
  };
        transportParamsDefaults = {
          loadingWeight: 30,
          loadingQuantity: 1500,
          loadingVolume: 120,
        };
        break;
      default: // other
        brand = '0';
        loadCapacity = 0;
        fixedDefaults = {
          vehiclePrice: 0,
          serviceLife: 0,
          driverSalary: 0,
          repairFee: 0,
          vehicleInsurance: 0,
          otherFixedCosts: 0,
        };
  variableDefaults = {
    fuelConsumption: 0,
    tireCost: 0,
    tollFee: 0,
    maintenanceFee: 0,
    otherVariableCosts: 0,
    expectedProfit: 0,
  };
        transportParamsDefaults = {
          loadingWeight: 0,
          loadingQuantity: 0,
          loadingVolume: 0,
        };
    }
    
    // 计算折旧
    const depreciation = fixedDefaults.vehiclePrice / (fixedDefaults.serviceLife || 1);
    // 计算固定成本总和
    const totalFixedCost = depreciation + fixedDefaults.driverSalary + fixedDefaults.repairFee + fixedDefaults.vehicleInsurance + fixedDefaults.otherFixedCosts;
    // 计算油费
    const fuelCost = formData.variableCosts.fuelPrice * variableDefaults.fuelConsumption / 100;
    // 计算变动成本总和
    const totalVariableCost = fuelCost + variableDefaults.tireCost + variableDefaults.tollFee + variableDefaults.maintenanceFee + variableDefaults.otherVariableCosts;
    
    setFormData(prev => ({
      ...prev,
      vehicleParams: {
        ...prev.vehicleParams,
        brand,
        vehicleType,
        axleCount: vehicleType === '9.6m' ? 3 : vehicleType === '17.5m' ? 6 : 0,
        loadCapacity
      },
      fixedCosts: {
        ...prev.fixedCosts,
        ...fixedDefaults,
        depreciation,
        totalFixedCost,
      },
      variableCosts: {
        ...prev.variableCosts,
        ...variableDefaults,
        fuelCost,
        totalVariableCost,
      },
  transportParams: {
  ...prev.transportParams,
  ...transportParamsDefaults,
  loadingUnloadingTime: 0.2,
  adjustmentFactor1: 1,
  adjustmentFactor2: 1,
  tripsPerDay: 1,
}
  }));
  };

  const [formData, setFormData] = useState<Omit<FreightCalculation, 'transportType'>>({
    vehicleParams: {
      brand: '',
  vehicleType: 'other',
      axleCount: 0,
      loadCapacity: 0,
    },
    fixedCosts: {
      vehiclePrice: 250000,
      serviceLife: 10,
      depreciation: 25000,
      driverSalary: 100000,
      repairFee: 10000,
      vehicleInsurance: 13000,
      otherFixedCosts: 0,
      totalFixedCost: 148000,
    },
    variableCosts: {
      fuelPrice: 6.94, // 默认油价
      fuelConsumption: 25,
      fuelCost: 6.94 * 25 / 100,
      tireCost: 0.12,
      tollFee: 1.5,
      maintenanceFee: 0.5,
      otherVariableCosts: 0,
      totalVariableCost: (6.94 * 25 / 100) + 0.12 + 1.5 + 0.5 + 0,
  expectedProfit: 50000,
    },
    transportParams: {
      actualLoad: 0,
      distance: 0,
  loadingUnloadingTime: 0.2,
      estimatedDailyMileage: 800, // 默认预计行驶里程
      estimatedAnnualOneWayMileage: 100000, // 默认预计单边行驶里程
      estimatedTime: 0,
      workingDays: 269, // 默认发货工作日
        benchmarkDistance: 0,
        adjustmentFactor1: 1,
        adjustmentFactor2: 1,
        tripsPerDay: 1,
    },
  });
  
  // 设置车型默认值
  const resetTransportParams = () => {
    // 根据当前车型设置对应的默认值
    let transportParamsDefaults;
    
    switch(formData.vehicleParams.vehicleType) {
      case '9.6m':
        transportParamsDefaults = {
          loadingWeight: 15,
          loadingQuantity: 750,
          loadingVolume: 65,
          distance: 0,
          loadingUnloadingTime: 0.2,
          adjustmentFactor1: 1,
          adjustmentFactor2: 1,
          tripsPerDay: 1,
          estimatedDailyMileage: 800,
          estimatedAnnualOneWayMileage: 100000,
          estimatedTime: 0,
          workingDays: 269,
          benchmarkDistance: 0,
        };
        break;
      case '17.5m':
        transportParamsDefaults = {
          loadingWeight: 30,
          loadingQuantity: 1500,
          loadingVolume: 120,
          distance: 0,
          loadingUnloadingTime: 0.2,
          adjustmentFactor1: 1,
          adjustmentFactor2: 1,
          tripsPerDay: 1,
          estimatedDailyMileage: 800,
          estimatedAnnualOneWayMileage: 100000,
          estimatedTime: 0,
          workingDays: 269,
          benchmarkDistance: 0,
        };
        break;
      default: // other
        transportParamsDefaults = {
          loadingWeight: 0,
          loadingQuantity: 0,
          loadingVolume: 0,
          distance: 0,
          loadingUnloadingTime: 0.2,
          adjustmentFactor1: 1,
          adjustmentFactor2: 1,
          tripsPerDay: 1,
          estimatedDailyMileage: 800,
          estimatedAnnualOneWayMileage: 100000,
          estimatedTime: 0,
          workingDays: 269,
          benchmarkDistance: 0,
        };
    }
    
    setFormData(prev => ({
      ...prev,
      transportParams: transportParamsDefaults
    }));
  };
  
  const resetVariableCosts = () => {
    let variableDefaults;
    
    switch(formData.vehicleParams.vehicleType) {
      case '9.6m':
        variableDefaults = {
          fuelConsumption: 25,
          tireCost: 0.12,
          tollFee: 1.5,
          maintenanceFee: 0.5,
          otherVariableCosts: 0,
          expectedProfit: 50000,
        };
        break;
      case '17.5m':
        variableDefaults = {
          fuelConsumption: 35,
          tireCost: 0.26,
          tollFee: 2.26,
          maintenanceFee: 0.8,
          otherVariableCosts: 0,
          expectedProfit: 100000,
        };
        break;
      default: // other
        variableDefaults = {
          fuelConsumption: 0,
          tireCost: 0,
          tollFee: 0,
          maintenanceFee: 0,
          otherVariableCosts: 0,
          expectedProfit: 0,
        };
    }
    
    // 计算油费和变动成本总和
    const fuelCost = formData.variableCosts.fuelPrice * variableDefaults.fuelConsumption / 100;
    const totalVariableCost = fuelCost + variableDefaults.tireCost + variableDefaults.tollFee + variableDefaults.maintenanceFee + variableDefaults.otherVariableCosts;
    
    setFormData(prev => ({
      ...prev,
      variableCosts: {
        ...prev.variableCosts,
        ...variableDefaults,
        fuelCost,
        totalVariableCost
      }
    }));
  };
  const [result, setResult] = useState<FreightResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const calculateFreight = () => {
    try {
      setLoading(true);
      
      // 验证表单数据
      formSchema.parse(formData);

      // 修改 calculateFreight 函数中的计算逻辑
const transportCost = 
  (formData.transportParams.workingDays > 0 && formData.transportParams.estimatedTime > 0 
    ? formData.fixedCosts.totalFixedCost / (formData.transportParams.workingDays / formData.transportParams.estimatedTime) 
    : 0) +
  (formData.variableCosts.totalVariableCost * formData.transportParams.distance);
      
        const details = [
  `固定成本: ¥${formData.fixedCosts.totalFixedCost.toFixed(2)}/年`,
  `变动成本: ¥${formData.variableCosts.totalVariableCost.toFixed(2)}/公里`,
  `期望利润: ¥${formData.variableCosts.expectedProfit.toFixed(2)}/年`,
  `运输成本: ¥${transportCost.toFixed(2)}`
];
      
      setResult({
        baseCost: 0,
        totalCost: transportCost,
        fixedCost: formData.fixedCosts.totalFixedCost,
        details,
      });
      
      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          newErrors[err.path.join('.')] = err.message;
        });
        setErrors(newErrors);
      }
    } finally {
      setLoading(false);
    }
  };

  const saveRecord = () => {
    if (!result) return;
    
    const records = JSON.parse(localStorage.getItem('freightRecords') || '[]');
    records.unshift({
      ...formData,
      transportType: 'land',
      result,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem('freightRecords', JSON.stringify(records));
    
    toast.success('记录已保存');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
         <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">货运成本价格模型（公路）</h1>
          
           {/* 车辆参数区域 */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
             <h2 className="text-lg font-semibold text-blue-600 mb-4 bg-blue-50 px-4 py-2 rounded-t-lg">运输参数</h2>
             <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">品牌</label>
                <input
                  type="text"
                  value={formData.vehicleParams.brand}
                  onChange={(e) => setFormData({
                    ...formData,
                    vehicleParams: {
                      ...formData.vehicleParams,
                      brand: e.target.value
                    }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors['vehicleParams.brand'] && <p className="mt-1 text-sm text-red-600">{errors['vehicleParams.brand']}</p>}
              </div>
              
               <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">车型</label>
                <select
                  value={formData.vehicleParams.vehicleType}
                   onChange={(e) => {
                     const vehicleType = e.target.value as '9.6m' | '17.5m' | 'other';
                     setVehicleDefaults(vehicleType);
                     setShowVehicleTypePrompt(false);
                     // 选择车型后自动聚焦到运距输入框
                     setTimeout(() => distanceInputRef.current?.focus(), 100);
                   }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="9.6m">9.6米（3轴）</option>
                  <option value="17.5m">17.5米（6轴）</option>
                  <option value="other">其他车型</option>
                </select>
                {showVehicleTypePrompt && (
                  <p className="mt-1 text-sm text-red-600">请选择车型</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">整车轴数</label>
                <input
                  type="number"
                  min="0"
                  value={formData.vehicleParams.axleCount}
                  onChange={(e) => setFormData({
                    ...formData,
                    vehicleParams: {
                      ...formData.vehicleParams,
                      axleCount: parseInt(e.target.value) || 0
                    }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors['vehicleParams.axleCount'] && <p className="mt-1 text-sm text-red-600">{errors['vehicleParams.axleCount']}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">荷载吨位 (吨)</label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={formData.vehicleParams.loadCapacity}
                  onChange={(e) => setFormData({
                    ...formData,
                    vehicleParams: {
                      ...formData.vehicleParams,
                      loadCapacity: parseFloat(e.target.value) || 0
                    }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors['vehicleParams.loadCapacity'] && <p className="mt-1 text-sm text-red-600">{errors['vehicleParams.loadCapacity']}</p>}
              </div>
            </div>
          </div>
          
           {/* 成本参数区域 */}


           {/* 第一部分：固定成本计算 */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
             <div className="flex justify-between items-center mb-4">
               <h2 className="text-lg font-semibold text-gray-800">固定成本 (元/年)</h2>
             </div>
             <div className="grid grid-cols-2 gap-4">
              <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">购车金额 (元)</label>
                <input
                  type="number"
                  min="0"
                  value={formData.fixedCosts.vehiclePrice === 0 ? '0' : (formData.fixedCosts.vehiclePrice !== undefined ? formData.fixedCosts.vehiclePrice : '')}
                  onChange={(e) => {
                    const vehiclePrice = parseFloat(e.target.value) || 0;
                    const serviceLife = formData.fixedCosts.serviceLife;
                    const depreciation = serviceLife > 0 ? vehiclePrice / serviceLife : 0;
                    setFormData({
                      ...formData,
                      fixedCosts: {
                        ...formData.fixedCosts,
                        vehiclePrice,
                        depreciation,
                        totalFixedCost: depreciation + formData.fixedCosts.driverSalary + formData.fixedCosts.repairFee + formData.fixedCosts.vehicleInsurance + formData.fixedCosts.otherFixedCosts,
                      },
                    });
                  }}
                  className={`w-full px-3 py-2 border ${errors['fixedCosts.vehiclePrice'] ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors['fixedCosts.vehiclePrice'] && <p className="mt-1 text-sm text-red-600">{errors['fixedCosts.vehiclePrice']}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">使用年限 (年)</label>
                <input
                  type="number"
                  min="1"
                  value={formData.fixedCosts.serviceLife !== undefined ? formData.fixedCosts.serviceLife : ''}
                  onChange={(e) => {
                    const serviceLife = parseFloat(e.target.value);
                    const depreciation = serviceLife > 0 ? formData.fixedCosts.vehiclePrice / serviceLife : 0;
                    setFormData({
                      ...formData,
                      fixedCosts: {
                        ...formData.fixedCosts,
                        serviceLife,
                        depreciation,
                        totalFixedCost: depreciation + formData.fixedCosts.driverSalary + formData.fixedCosts.repairFee + formData.fixedCosts.vehicleInsurance + formData.fixedCosts.otherFixedCosts,
                      },
                    });
                  }}
                  className={`w-full px-3 py-2 border ${errors['fixedCosts.serviceLife'] ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors['fixedCosts.serviceLife'] && <p className="mt-1 text-sm text-red-600">{errors['fixedCosts.serviceLife']}</p>}
              </div>
              
              <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">折旧 (元/年)</label>
                <input
                  type="number"
                  min="0"
                  value={formData.fixedCosts.depreciation.toFixed(2)}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50"
                />
              </div>
              
              <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">司机薪酬 (元/年)</label>
                <input
                  type="number"
                  min="0"
                  value={formData.fixedCosts.driverSalary !== undefined ? formData.fixedCosts.driverSalary : ''}
                  onChange={(e) => {
                    const driverSalary = parseFloat(e.target.value);
                    setFormData({
                      ...formData,
                      fixedCosts: {
                        ...formData.fixedCosts,
                        driverSalary,
                        totalFixedCost: formData.fixedCosts.depreciation + driverSalary + formData.fixedCosts.repairFee + formData.fixedCosts.vehicleInsurance + formData.fixedCosts.otherFixedCosts,
                      },
                    });
                  }}
                  className={`w-full px-3 py-2 border ${errors['fixedCosts.driverSalary'] ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors['fixedCosts.driverSalary'] && <p className="mt-1 text-sm text-red-600">{errors['fixedCosts.driverSalary']}</p>}
              </div>
              
               <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">维修费 (元/年)</label>
                 <input
                   type="number"
                   min="0"
                   value={formData.fixedCosts.repairFee !== undefined ? formData.fixedCosts.repairFee : ''}
                   onChange={(e) => {
                     const repairFee = parseFloat(e.target.value);
                     setFormData({
                       ...formData,
                       fixedCosts: {
                         ...formData.fixedCosts,
                         repairFee,
                         totalFixedCost: formData.fixedCosts.depreciation + formData.fixedCosts.driverSalary + repairFee + formData.fixedCosts.vehicleInsurance + formData.fixedCosts.otherFixedCosts,
                       },
                     });
                   }}
                   className={`w-full px-3 py-2 border ${errors['fixedCosts.repairFee'] ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                 />
                 {errors['fixedCosts.repairFee'] && <p className="mt-1 text-sm text-red-600">{errors['fixedCosts.repairFee']}</p>}
               </div>
              
               <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">车辆保险费 (元/年)</label>
                 <input
                   type="number"
                   min="0"
                   value={formData.fixedCosts.vehicleInsurance !== undefined ? formData.fixedCosts.vehicleInsurance : ''}
                   onChange={(e) => {
                     const vehicleInsurance = parseFloat(e.target.value);
                     setFormData({
                       ...formData,
                       fixedCosts: {
                         ...formData.fixedCosts,
                         vehicleInsurance,
                         totalFixedCost: formData.fixedCosts.depreciation + formData.fixedCosts.driverSalary + formData.fixedCosts.repairFee + vehicleInsurance + formData.fixedCosts.otherFixedCosts,
                       },
                     });
                   }}
                   className={`w-full px-3 py-2 border ${errors['fixedCosts.vehicleInsurance'] ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                 />
                 {errors['fixedCosts.vehicleInsurance'] && <p className="mt-1 text-sm text-red-600">{errors['fixedCosts.vehicleInsurance']}</p>}
               </div>
               
               <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">其他固定成本 (元/年)</label>
                 <input
                   type="number"
                   min="0"
                   value={formData.fixedCosts.otherFixedCosts !== undefined ? formData.fixedCosts.otherFixedCosts : ''}
                   onChange={(e) => {
                     const otherFixedCosts = parseFloat(e.target.value);
                     setFormData({
                       ...formData,
                       fixedCosts: {
                         ...formData.fixedCosts,
                         otherFixedCosts,
                         totalFixedCost: formData.fixedCosts.depreciation + formData.fixedCosts.driverSalary + formData.fixedCosts.repairFee + formData.fixedCosts.vehicleInsurance + otherFixedCosts,
                       },
                     });
                   }}
                   className={`w-full px-3 py-2 border ${errors['fixedCosts.otherFixedCosts'] ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                 />
                 {errors['fixedCosts.otherFixedCosts'] && <p className="mt-1 text-sm text-red-600">{errors['fixedCosts.otherFixedCosts']}</p>}
               </div>
              
              <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">固定成本总和 (元/年)</label>
                <input
                  type="number"
                  value={formData.fixedCosts.totalFixedCost.toFixed(2)}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 font-medium"
                />
              </div>
            </div>
          </div>
          
           {/* 第二部分：变动成本计算 */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
             <div className="flex justify-between items-center mb-4">
               <h2 className="text-lg font-semibold text-gray-800">变动成本 (元/公里)</h2>
             </div>
             <div className="grid grid-cols-2 gap-4">
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">油价 (元/升)</label>
                 <input
                   type="number"
                   min="0"
                   step="0.01"
                   value={formData.variableCosts.fuelPrice !== undefined ? formData.variableCosts.fuelPrice : ''}
                   onChange={(e) => {
                     const fuelPrice = parseFloat(e.target.value) || 0;
                     const fuelCost = fuelPrice * formData.variableCosts.fuelConsumption / 100;
                     setFormData({
                       ...formData,
                       variableCosts: {
                         ...formData.variableCosts,
                         fuelPrice,
                         fuelCost,
                         totalVariableCost: fuelCost + formData.variableCosts.tireCost + formData.variableCosts.tollFee + formData.variableCosts.maintenanceFee + formData.variableCosts.otherVariableCosts,
                       },
                     });
                   }}
                   className={`w-full px-3 py-2 border ${errors['variableCosts.fuelPrice'] ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                 />
                 {errors['variableCosts.fuelPrice'] && <p className="mt-1 text-sm text-red-600">{errors['variableCosts.fuelPrice']}</p>}
               </div>
               
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">油耗 (升/百公里)</label>
                 <input
                   type="number"
                   min="0"
                   step="0.01"
                   value={formData.variableCosts.fuelConsumption !== undefined ? formData.variableCosts.fuelConsumption : ''}
                   onChange={(e) => {
                     const fuelConsumption = parseFloat(e.target.value) || 0;
                     const fuelCost = formData.variableCosts.fuelPrice * fuelConsumption / 100;
                     setFormData({
                       ...formData,
                       variableCosts: {
                         ...formData.variableCosts,
                         fuelConsumption,
                         fuelCost,
                         totalVariableCost: fuelCost + formData.variableCosts.tireCost + formData.variableCosts.tollFee + formData.variableCosts.maintenanceFee + formData.variableCosts.otherVariableCosts,
                       },
                     });
                   }}
                   className={`w-full px-3 py-2 border ${errors['variableCosts.fuelConsumption'] ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                 />
                 {errors['variableCosts.fuelConsumption'] && <p className="mt-1 text-sm text-red-600">{errors['variableCosts.fuelConsumption']}</p>}
               </div>
               
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">油费 (元/公里)</label>
                 <input
                   type="number"
                   min="0"
                   step="0.01"
                   value={formData.variableCosts.fuelCost.toFixed(2)}
                   readOnly
                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50"
                 />
               </div>
               
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">轮胎 (元/公里)</label>
                 <input
                   type="number"
                   min="0"
                   step="0.01"
                   value={formData.variableCosts.tireCost !== undefined ? formData.variableCosts.tireCost : ''}
                   onChange={(e) => {
                     const tireCost = parseFloat(e.target.value) || 0;
                     setFormData({
                       ...formData,
                       variableCosts: {
                         ...formData.variableCosts,
                         tireCost,
                         totalVariableCost: formData.variableCosts.fuelCost + tireCost + formData.variableCosts.tollFee + formData.variableCosts.maintenanceFee + formData.variableCosts.otherVariableCosts,
                       },
                     });
                   }}
                   className={`w-full px-3 py-2 border ${errors['variableCosts.tireCost'] ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                 />
                 {errors['variableCosts.tireCost'] && <p className="mt-1 text-sm text-red-600">{errors['variableCosts.tireCost']}</p>}
               </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">路桥费 (元/公里)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.variableCosts.tollFee !== undefined ? formData.variableCosts.tollFee : ''}
                  onChange={(e) => {
                    const tollFee = parseFloat(e.target.value) || 0;
                    setFormData({
                      ...formData,
                      variableCosts: {
                        ...formData.variableCosts,
                        tollFee,
                        totalVariableCost: formData.variableCosts.fuelCost + formData.variableCosts.tireCost + tollFee + formData.variableCosts.maintenanceFee + formData.variableCosts.otherVariableCosts,
                      },
                    });
                  }}
                  className={`w-full px-3 py-2 border ${errors['variableCosts.tollFee'] ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors['variableCosts.tollFee'] && <p className="mt-1 text-sm text-red-600">{errors['variableCosts.tollFee']}</p>}
              </div>
              
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">保养费 (元/公里)</label>
                 <input
                   type="number"
                   min="0"
                   step="0.01"
                   value={formData.variableCosts.maintenanceFee !== undefined ? formData.variableCosts.maintenanceFee : ''}
                   onChange={(e) => {
                     const maintenanceFee = parseFloat(e.target.value) || 0;
                     setFormData({
                       ...formData,
                       variableCosts: {
                         ...formData.variableCosts,
                         maintenanceFee,
                         totalVariableCost: formData.variableCosts.fuelCost + formData.variableCosts.tireCost + formData.variableCosts.tollFee + maintenanceFee + formData.variableCosts.otherVariableCosts,
                       },
                     });
                   }}
                   className={`w-full px-3 py-2 border ${errors['variableCosts.maintenanceFee'] ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                 />
                 {errors['variableCosts.maintenanceFee'] && <p className="mt-1 text-sm text-red-600">{errors['variableCosts.maintenanceFee']}</p>}
               </div>
               
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">其他变动成本 (元/公里)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.variableCosts.otherVariableCosts !== undefined ? formData.variableCosts.otherVariableCosts : ''}
                    onChange={(e) => {
                      const otherVariableCosts = parseFloat(e.target.value) || 0;
                      setFormData({
                        ...formData,
                        variableCosts: {
                          ...formData.variableCosts,
                          otherVariableCosts,
                          totalVariableCost: formData.variableCosts.fuelCost + formData.variableCosts.tireCost + formData.variableCosts.tollFee + formData.variableCosts.maintenanceFee + otherVariableCosts,
                        },
                      });
                    }}
                    className={`w-full px-3 py-2 border ${errors['variableCosts.otherVariableCosts'] ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                   />{errors['variableCosts.otherVariableCosts'] && <p className="mt-1 text-sm text-red-600">{errors['variableCosts.otherVariableCosts']}</p>}
                </div>
               
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">变动成本总和 (元/公里)</label>
                 <input
                   type="number"
                   value={formData.variableCosts.totalVariableCost.toFixed(2)}
                   readOnly
                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 font-medium"
                 />
               </div>


            </div>
          </div>
          


          
           {/* 第三部分：运输参数 */}
           <div className="bg-white rounded-lg shadow-md p-6 mb-6">
               <div className="flex justify-between items-center mb-4">
                  {/* 运输参数标题已移至蓝色条框内 */}
               </div>
                <div className="grid grid-cols-2 gap-6">
                <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">运距 (公里)</label>
                 <input
                   type="number"
                   min="0"
                   value={formData.transportParams.distance !== undefined ? formData.transportParams.distance : ''}
                   onChange={(e) => {
                     const distance = parseFloat(e.target.value) || 0;
                     const estimatedDailyMileage = Math.max(formData.transportParams.estimatedDailyMileage, 0.1); // 确保不为0
const estimatedTime = distance / estimatedDailyMileage + formData.transportParams.loadingUnloadingTime;
const denominator = formData.transportParams.workingDays / 2 / estimatedTime;
const benchmarkDistance = denominator > 0 ? Math.round(formData.transportParams.estimatedAnnualOneWayMileage / denominator) : 0;
                     setFormData({
                       ...formData,
                       transportParams: {
                         ...formData.transportParams,
                         distance,
                         estimatedTime,
                         benchmarkDistance
                       }
                     });
                   }}
                   ref={distanceInputRef}
                   className={`w-full px-3 py-2 border ${errors['transportParams.distance'] || formData.vehicleParams.vehicleType !== '' && formData.transportParams.distance === 0 ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                 />
                 {(errors['transportParams.distance'] || (formData.vehicleParams.vehicleType !== '' && formData.transportParams.distance === 0)) && (
                   <p className="mt-1 text-sm text-red-600">{errors['transportParams.distance'] || '请输入运距'}</p>
                 )}
               </div>
               
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">装卸货时间 (天)</label>
                 <input
                   type="number"
                   min="0"
                   step="0.1"
                   value={formData.transportParams.loadingUnloadingTime !== undefined ? formData.transportParams.loadingUnloadingTime : ''}
                   onChange={(e) => {
                     const loadingUnloadingTime = parseFloat(e.target.value) || 0;
                     const estimatedDailyMileage = Math.max(formData.transportParams.estimatedDailyMileage, 0.1); // 确保不为0
const estimatedTime = formData.transportParams.distance / estimatedDailyMileage + loadingUnloadingTime;
const denominator = formData.transportParams.workingDays / 2 / estimatedTime;
const benchmarkDistance = denominator > 0 ? Math.round(formData.transportParams.estimatedAnnualOneWayMileage / denominator) : 0;
                     setFormData({
                       ...formData,
                       transportParams: {
                         ...formData.transportParams,
                         loadingUnloadingTime,
                         estimatedTime,
                         benchmarkDistance
                       }
                     });
                   }}
                   className={`w-full px-3 py-2 border ${errors['transportParams.loadingUnloadingTime'] ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                 />
                 {errors['transportParams.loadingUnloadingTime'] && <p className="mt-1 text-sm text-red-600">{errors['transportParams.loadingUnloadingTime']}</p>}
               </div>
               
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">预计行驶里程 (公里/天)</label>
                 <input
                   type="number"
                   min="0.1"
                   value={formData.transportParams.estimatedDailyMileage !== undefined ? formData.transportParams.estimatedDailyMileage : ''}
                   onChange={(e) => {
                     const estimatedDailyMileage = parseFloat(e.target.value) || 0;
                     const safeEstimatedDailyMileage = Math.max(estimatedDailyMileage, 0.1); // 确保不为0
const estimatedTime = formData.transportParams.distance / safeEstimatedDailyMileage + formData.transportParams.loadingUnloadingTime;
const denominator = formData.transportParams.workingDays / 2 / estimatedTime;
const benchmarkDistance = denominator > 0 ? Math.round(formData.transportParams.estimatedAnnualOneWayMileage / denominator) : 0;
                     setFormData({
                       ...formData,
                       transportParams: {
                         ...formData.transportParams,
                         estimatedDailyMileage,
                         estimatedTime,
                         benchmarkDistance
                       }
                     });
                   }}
                   className={`w-full px-3 py-2 border ${errors['transportParams.estimatedDailyMileage'] ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                 />
                 {errors['transportParams.estimatedDailyMileage'] && <p className="mt-1 text-sm text-red-600">{errors['transportParams.estimatedDailyMileage']}</p>}
               </div>
               
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">预计单边行驶里程 (公里/年)</label>
                 <input
                   type="number"
                   min="0"
                   value={formData.transportParams.estimatedAnnualOneWayMileage !== undefined ? formData.transportParams.estimatedAnnualOneWayMileage : ''}
                   onChange={(e) => {
                     const estimatedAnnualOneWayMileage = parseFloat(e.target.value) || 0;
const denominator = formData.transportParams.workingDays / 2 / formData.transportParams.estimatedTime;
const benchmarkDistance = denominator > 0 ? Math.round(estimatedAnnualOneWayMileage / denominator) : 0;
                     setFormData({
                       ...formData,
                       transportParams: {
                         ...formData.transportParams,
                         estimatedAnnualOneWayMileage,
                         benchmarkDistance
                       }
                     });
                   }}
                   className={`w-full px-3 py-2 border ${errors['transportParams.estimatedAnnualOneWayMileage'] ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                 />
                 {errors['transportParams.estimatedAnnualOneWayMileage'] && <p className="mt-1 text-sm text-red-600">{errors['transportParams.estimatedAnnualOneWayMileage']}</p>}
               </div>
               
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">预计总用时 (天/趟)</label>
                 <input
                   type="number"
                   min="0.1"
                   step="0.1"
                   value={formData.transportParams.estimatedTime.toFixed(1)}
                   readOnly
                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50"
                 />
               </div>
               
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">发货工作日 (天/年)</label>
                 <input
                   type="number"
                   min="1"
                   value={formData.transportParams.workingDays !== undefined ? formData.transportParams.workingDays : ''}
                   onChange={(e) => {
                     const workingDays = parseFloat(e.target.value) || 0;
const denominator = workingDays / 2 / formData.transportParams.estimatedTime;
const benchmarkDistance = denominator > 0 ? Math.round(formData.transportParams.estimatedAnnualOneWayMileage / denominator) : 0;
                     setFormData({
                       ...formData,
                       transportParams: {
                         ...formData.transportParams,
                         workingDays,
                         benchmarkDistance
                       }
                     });
                   }}
                   className={`w-full px-3 py-2 border ${errors['transportParams.workingDays'] ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                 />
                 {errors['transportParams.workingDays'] && <p className="mt-1 text-sm text-red-600">{errors['transportParams.workingDays']}</p>}
               </div>
               
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">基准运距 (公里)</label>
                  <input
                    type="number"
                    min="0"
step="1"
value={formData.transportParams.benchmarkDistance.toFixed(0)}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50"
                  />
                </div>
                
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">期望利润 (元/年)</label>
                   <input
                     type="number"
                     min="0"
                     value={formData.variableCosts.expectedProfit !== undefined ? formData.variableCosts.expectedProfit : ''}
                     onChange={(e) => setFormData({
                       ...formData,
                       variableCosts: {
                         ...formData.variableCosts,
                         expectedProfit: parseFloat(e.target.value) || 0,
                       },
                     })}
                     className={`w-full px-3 py-2 border ${errors['variableCosts.expectedProfit'] ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                   />
                   {errors['variableCosts.expectedProfit'] && <p className="mt-1 text-sm text-red-600">{errors['variableCosts.expectedProfit']}</p>}
                 </div>
               </div>
               
               {/* 新增配载参数输入 */}
               <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">配载重量（吨）</label>
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      value={formData.transportParams.loadingWeight}
                      onChange={(e) => setFormData({
                        ...formData,
                        transportParams: {
                          ...formData.transportParams,
                          loadingWeight: parseFloat(e.target.value) || 0
                        }
                      })}
                      ref={loadingWeightRef}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                 </div>
                 
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">配载数量（件）</label>
                   <input
                     type="number"
                     min="0"
                     value={formData.transportParams.loadingQuantity}
                     onChange={(e) => setFormData({
                       ...formData,
                       transportParams: {
                         ...formData.transportParams,
                         loadingQuantity: parseInt(e.target.value) || 0
                       }
                     })}
                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                   />
                 </div>
                 
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">配载体积（方）</label>
                   <input
                     type="number"
                     min="0"
                     step="0.1"
                     value={formData.transportParams.loadingVolume}
                     onChange={(e) => setFormData({
                       ...formData,
                       transportParams: {
                         ...formData.transportParams,
                         loadingVolume: parseFloat(e.target.value) || 0
                       }
                     })}
                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                   />
                 </div>
               </div>
             </div>
             
             {/* 运输成本计算区域 */}
             <div className="bg-white rounded-lg shadow-md p-6 mb-6">

               
               {/* 计算所需数据 */}
               {(() => {
  // 计算每趟固定成本 (>1天/趟)
  const fixedCost = formData.transportParams.workingDays > 0 && formData.transportParams.estimatedTime > 0 
    ? formData.fixedCosts.totalFixedCost / (formData.transportParams.workingDays / formData.transportParams.estimatedTime) 
    : 0;
  const variableCost = formData.variableCosts.totalVariableCost * formData.transportParams.distance;
  const grossProfit = formData.transportParams.estimatedAnnualOneWayMileage > 0 
    ? (formData.variableCosts.expectedProfit / formData.transportParams.estimatedAnnualOneWayMileage) * formData.transportParams.benchmarkDistance 
    : 0;
  const totalCostOver1Day = (fixedCost + variableCost + grossProfit) * formData.transportParams.adjustmentFactor1;
                
                 // 定义短途运输的基础成本变量
                 const fixedCostPerTrip = fixedCost;
                 const profitPerTrip = grossProfit;
                 const variableCostPerTrip = variableCost;
                 
                  // 计算≤1天/趟的固定成本、变动成本和毛利
                  const fixedCostPerTripShort = formData.fixedCosts.totalFixedCost / formData.transportParams.workingDays / formData.transportParams.tripsPerDay;
                  const variableCostPerTripShort = formData.variableCosts.totalVariableCost * formData.transportParams.distance;
                  const profitPerTripShort = formData.variableCosts.expectedProfit / formData.transportParams.workingDays / formData.transportParams.tripsPerDay;
                  const totalCostShort = (fixedCostPerTripShort + variableCostPerTripShort + profitPerTripShort) * formData.transportParams.adjustmentFactor2;
                
// 计算单位成本
// 元/公里下面第一格的值=2187.13位置的值/运距（2187.13对应单趟运费>1天/趟行的合计值）
const costPerKmOver1Day = totalCostOver1Day / formData.transportParams.distance;
const costPerKmShort = totalCostShort / formData.transportParams.distance;

// 更新元/吨·公里计算：单趟运费合计值 / (配载重量 * 运距)
const costPerTonKmOver1Day = formData.transportParams.loadingWeight > 0 && formData.transportParams.distance > 0
  ? totalCostOver1Day / (formData.transportParams.loadingWeight * formData.transportParams.distance)
  : 0;
  
const costPerTonKmShort = formData.transportParams.loadingWeight > 0 ? costPerKmShort / formData.transportParams.loadingWeight : 0;

// 更新元/吨计算：单趟运费合计值 / 配载重量
const costPerTonOver1Day = formData.transportParams.loadingWeight > 0
  ? totalCostOver1Day / formData.transportParams.loadingWeight
  : 0;
  
const costPerTonShort = totalCostShort / formData.transportParams.actualLoad;

// >1天/趟 元/担=（>1天/趟单趟运费合计值）/（配载重量*20）
const costPerDanOver1Day = formData.transportParams.loadingWeight > 0 
  ? totalCostOver1Day / (formData.transportParams.loadingWeight * 20) 
  : 0;

// 添加元/件计算：单趟运费合计值 / 配载数量
const costPerPieceOver1Day = formData.transportParams.loadingQuantity > 0
  ? totalCostOver1Day / formData.transportParams.loadingQuantity
  : 0;

// 添加元/方计算：单趟运费合计值 / 配载体积
const costPerVolumeOver1Day = formData.transportParams.loadingVolume > 0
  ? totalCostOver1Day / formData.transportParams.loadingVolume
   : 0;

                  // 计算≤1天/趟 元/吨·公里、元/吨、元/件、元/方和元/担
                  const costPerTonKmShortNew = formData.transportParams.loadingWeight > 0 && formData.transportParams.distance > 0
                    ? totalCostShort / (formData.transportParams.loadingWeight * formData.transportParams.distance)
                    : 0;
                  
                  const costPerTonShortNew = formData.transportParams.loadingWeight > 0
                    ? totalCostShort / formData.transportParams.loadingWeight
                    : 0;
                  
                  const costPerDanShortNew = formData.transportParams.loadingWeight > 0
                    ? totalCostShort / (formData.transportParams.loadingWeight * 20)
                    : 0;
                  
                  const costPerPieceShortNew = formData.transportParams.loadingQuantity > 0
                    ? totalCostShort / formData.transportParams.loadingQuantity
                    : 0;
                  
                  const costPerVolumeShortNew = formData.transportParams.loadingVolume > 0
                    ? totalCostShort / formData.transportParams.loadingVolume
                    : 0;
                
                return (
                  <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-200">
                      <tbody>

                        
                        {/* 计算过程标题行 */}
                         <tr className="border-b border-gray-200 bg-gray-50">
                            <td className="py-2 px-3 font-medium min-w-[100px]">单趟运费</td>
                          <td className="py-2 px-3 font-medium min-w-[120px]">固定成本</td>
                          <td className="py-2 px-3 font-medium min-w-[120px]">变动成本</td>
                          <td className="py-2 px-3 font-medium min-w-[120px]">毛利</td>
                          <td className="py-2 px-3 font-medium">合计</td>
                          <td className="py-2 px-3 font-medium">调整系数</td>
                          <td className="py-2 px-3 font-medium">趟次/天</td>
                        </tr>
                        
                        {/* >1天/趟 计算过程 */}
                         <tr className="border-b border-gray-200">
  <td className="py-2 px-3 min-w-[100px]">{'>'}1天/趟</td>
  <td className="py-2 px-3 min-w-[120px]">{fixedCost.toFixed(2)}</td>
  <td className="py-2 px-3 min-w-[120px]">{variableCost.toFixed(2)}</td>
  <td className="py-2 px-3 min-w-[120px]">{grossProfit.toFixed(2)}</td>
                          <td className="py-2 px-3">{totalCostOver1Day.toFixed(2)}</td>
                          <td className="py-2 px-3">
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={formData.transportParams.adjustmentFactor1}
                              onChange={(e) => setFormData({
                                ...formData,
                                transportParams: {
                                  ...formData.transportParams,
                                  adjustmentFactor1: parseFloat(e.target.value) || 0
                                }
                              })}
                              className="w-full px-3 py-1 border border-gray-300 rounded-md text-sm"
                            />
                          </td>
                          <td className="py-2 px-3"></td>
                        </tr>
                        
                        {/* ≤1天/趟 计算过程 */}
                         <tr className="border-b border-gray-200">
                          <td className="py-2 px-3 min-w-[100px]">≤1天/趟</td>
                           <td className="py-2 px-3 min-w-[120px]">{fixedCostPerTripShort.toFixed(2)}</td>
                           <td className="py-2 px-3 min-w-[120px]">{variableCostPerTripShort.toFixed(2)}</td>
                           <td className="py-2 px-3 min-w-[120px]">{profitPerTripShort.toFixed(2)}</td>
                           <td className="py-2 px-3">{totalCostShort.toFixed(2)}</td>
                          <td className="py-2 px-3">
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={formData.transportParams.adjustmentFactor2}
                              onChange={(e) => setFormData({
                                ...formData,
                                transportParams: {
                                  ...formData.transportParams,
                                  adjustmentFactor2: parseFloat(e.target.value) || 0
                                }
                              })}
                              className="w-full px-3 py-1 border border-gray-300 rounded-md text-sm"
                            />
                          </td>
                          <td className="py-2 px-3">
                            <input
                              type="number"
                              min="0"
                       step="1"
                              value={formData.transportParams.tripsPerDay}
                              onChange={(e) => setFormData({
                                ...formData,
                                transportParams: {
                                  ...formData.transportParams,
                                  tripsPerDay: parseFloat(e.target.value) || 0
                                }
                              })}
                              className="w-full px-3 py-1 border border-gray-300 rounded-md text-sm"
                            />
                          </td>
                        </tr>
                        
                        {/* 折算运费标题行 */}
                          <tr className="border-b border-gray-200 bg-gray-50">
                          <td className="py-2 px-3 font-medium min-w-[100px]">运输单价</td>
                           <td className="py-2 px-3 font-medium min-w-[120px]">元/公里</td>
                           <td className="py-2 px-3 font-medium min-w-[120px]">元/担</td>
                           <td className="py-2 px-3 font-medium min-w-[120px]">元/吨·公里</td>
                           <td className="py-2 px-3 font-medium">元/吨</td>
                           <td className="py-2 px-3 font-medium min-w-[120px]">元/件</td>
                           <td className="py-2 px-3 font-medium min-w-[120px]">元/方</td>
                           <td className="py-2 px-3"></td>
                           <td className="py-2 px-3"></td>
                         </tr>
                        
                        {/* >1天/趟 折算运费 */}
                          <tr className="border-b border-gray-200">
                            <td className="py-2 px-3 min-w-[100px]">{'>'}1天/趟</td>
                            <td className="py-2 px-3 min-w-[120px]">{costPerKmOver1Day.toFixed(2)}</td>
                            <td className="py-2 px-3 min-w-[120px]">{costPerDanOver1Day.toFixed(2)}</td>
                            <td className="py-2 px-3 min-w-[120px]">{costPerTonKmOver1Day.toFixed(3)}</td>
                            <td className="py-2 px-3">{costPerTonOver1Day.toFixed(2)}</td>
                            <td className="py-2 px-3 min-w-[120px]">{costPerPieceOver1Day.toFixed(2)}</td>
                            <td className="py-2 px-3 min-w-[120px]">{costPerVolumeOver1Day.toFixed(2)}</td>
                            <td className="py-2 px-3"></td>
                            <td className="py-2 px-3"></td>
                          </tr>
                        
                        {/* ≤1天/趟 折算运费 */}
                          <tr className="border-b border-gray-200">
                           <td className="py-2 px-3 min-w-[100px]">≤1天/趟</td>
                           <td className="py-2 px-3 min-w-[120px]">{costPerKmShort.toFixed(2)}</td>
                            <td className="py-2 px-3 min-w-[120px]">{costPerDanShortNew.toFixed(2)}</td>
                            <td className="py-2 px-3 min-w-[120px]">{costPerTonKmShortNew.toFixed(3)}</td>
                            <td className="py-2 px-3">{costPerTonShortNew.toFixed(2)}</td>
                            <td className="py-2 px-3 min-w-[120px]">{costPerPieceShortNew.toFixed(2)}</td>
                            <td className="py-2 px-3 min-w-[120px]">{costPerVolumeShortNew.toFixed(2)}</td>
                           <td className="py-2 px-3"></td>
                           <td className="py-2 px-3"></td>
                         </tr>
                      </tbody>
                    </table>
                  </div>
                );
              })()}
            </div>
            
          {/* 计算结果 */}
          {result && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-blue-800 mb-2">计算结果</h2>
              
              <div className="space-y-1 text-sm text-gray-700">
                {result.details.map((detail, index) => (
                  <p key={index}>{detail}</p>
                ))}

              </div>
            </div>
          )}
          
          {/* 保存记录 */}
          {result && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <button
                onClick={saveRecord}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                保存记录
              </button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}