export interface FreightCalculation {
  transportType: 'land' | 'air' | 'sea';
  vehicleParams: {
    brand: string; // 品牌
    vehicleType: '9.6m' | '17.5m' | 'other'; // 车型
    axleCount: number; // 整车轴数
    loadCapacity: number; // 荷载吨位 (吨)
  };
  fixedCosts: {
    vehiclePrice: number; // 购车金额 (元)
    serviceLife: number; // 使用年限 (年)
    depreciation: number; // 折旧 (元/年)
    driverSalary: number; // 司机薪酬 (元/年)
    repairFee: number; // 维修费 (元/年)
    vehicleInsurance: number; // 车辆保险费 (元/年)
    otherFixedCosts: number; // 其他固定成本 (元/年)
    totalFixedCost: number; // 固定成本总和 (元/年)
  };
  variableCosts: {
    fuelPrice: number; // 油价 (元/升)
    fuelConsumption: number; // 油耗 (升/百公里)
    fuelCost: number; // 油费 (元/公里)
    tireCost: number; // 轮胎 (元/公里)
    tollFee: number; // 路桥费 (元/公里)
    maintenanceFee: number; // 保养费 (元/公里)
    otherVariableCosts: number; // 其他变动成本 (元/公里)
    totalVariableCost: number; // 变动成本总和 (元/公里)
    expectedProfit: number; // 期望利润 (元/年)
  };
  transportParams: {
    distance: number; // 运距 (公里)
    loadingUnloadingTime: number; // 装卸货时间 (天)
    estimatedDailyMileage: number; // 预计行驶里程 (公里/天)
    estimatedAnnualOneWayMileage: number; // 预计单边行驶里程 (公里/年)
    estimatedTime: number; // 预计总用时 (天/趟)
    workingDays: number; // 发货工作日 (天/年)
    benchmarkDistance: number; // 基准运距 (公里)
    adjustmentFactor1: number; // 调整系数 (>1天/趟)
    adjustmentFactor2: number; // 调整系数 (≤1天/趟)
    tripsPerDay: number; // 趟次/天 (≤1天/趟)
    loadingWeight: number; // 配载重量（吨）
    loadingQuantity: number; // 配载数量（件）
    loadingVolume: number; // 配载体积（方）
  };
}

export interface FreightResult {
  baseCost: number;
  totalCost: number;
  fixedCost: number;
  variableCost: number;
  details: string[];
}

export const transportRates = {
  land: 1.5,
  air: 4.0,
  sea: 0.8,
};
