import React, { useState, useEffect, useMemo } from 'react';
import { 
  Fuel, 
  Gauge, 
  DollarSign, 
  TrendingUp, 
  Plus, 
  Calendar, 
  Trash2, 
  Edit3, 
  Download, 
  Search, 
  X, 
  BarChart3, 
  ListFilter, 
  HelpCircle, 
  RefreshCw,
  ChevronRight,
  ArrowUpRight,
  Sparkles,
  BarChart2,
  Table as TableIcon
} from 'lucide-react';

const GAS_STATIONS = [
  { id: 'ptt', name: 'PTT Station', bg: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  { id: 'bangchak', name: 'Bangchak', bg: 'bg-cyan-100 text-cyan-800 border-cyan-200' },
  { id: 'shell', name: 'Shell', bg: 'bg-red-100 text-red-800 border-red-200' },
  { id: 'caltex', name: 'Caltex', bg: 'bg-blue-100 text-blue-800 border-blue-200' },
  { id: 'pt', name: 'PT', bg: 'bg-green-100 text-green-800 border-green-200' },
  { id: 'esso', name: 'Esso/Exxon', bg: 'bg-rose-100 text-rose-800 border-rose-200' },
  { id: 'other', name: 'อื่นๆ', bg: 'bg-slate-100 text-slate-800 border-slate-200' }
];

const FUEL_TYPES = [
  'Gasohol 95', 'Gasohol E20', 'Gasohol 91', 'Gasohol E85', 
  'Diesel B7', 'Diesel B20', 'Premium Diesel', 'Premium Gasohol 95', 'EV Charge'
];

const MONTH_NAMES = [
  'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
  'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
];

const MONTH_NAMES_SHORT = [
  'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
  'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
];

const SAMPLE_DATA = [
  // --- 2026 Data ---
  { id: '2026-1', date: '2026-09-28T18:30', odometer: 46610, liters: 34.8, cost: 1320, station: 'Caltex', fuelType: 'Gasohol 95', isFullTank: true, notes: 'ขับทำงานในเมือง' },
  { id: '2026-2', date: '2026-09-20T12:15', odometer: 46180, liters: 35.0, cost: 1330, station: 'Shell', fuelType: 'Gasohol 95', isFullTank: true, notes: 'เตรียมเดินทางไปต่างอำเภอ' },
  { id: '2026-3', date: '2026-09-10T17:45', odometer: 45720, liters: 36.2, cost: 1375, station: 'Bangchak', fuelType: 'Gasohol E20', isFullTank: true, notes: 'ใช้งานช่วงฝนตกหนัก' },
  { id: '2026-4', date: '2026-09-01T08:30', odometer: 45200, liters: 38.5, cost: 1460, station: 'PTT Station', fuelType: 'Gasohol 95', isFullTank: true, notes: 'กลับจากเที่ยวตากอากาศ' },
  
  { id: '2026-5', date: '2026-08-22T19:10', odometer: 44680, liters: 37.0, cost: 1400, station: 'PTT Station', fuelType: 'Gasohol 95', isFullTank: true, notes: 'เติมก่อนเดินทางไกล' },
  { id: '2026-6', date: '2026-08-11T09:00', odometer: 44190, liters: 35.5, cost: 1350, station: 'Bangchak', fuelType: 'Gasohol E20', isFullTank: true, notes: 'เติมน้ำมันเต็มถัง' },

  { id: '2026-7', date: '2026-07-25T16:20', odometer: 43700, liters: 36.0, cost: 1380, station: 'Shell', fuelType: 'Gasohol 95', isFullTank: true, notes: 'ขับใช้งานประจำวัน' },
  { id: '2026-8', date: '2026-07-10T11:30', odometer: 43220, liters: 36.8, cost: 1410, station: 'PTT Station', fuelType: 'Gasohol 95', isFullTank: true, notes: 'วิ่งต่างจังหวัด' },

  { id: '2026-9', date: '2026-06-28T20:00', odometer: 42710, liters: 37.2, cost: 1420, station: 'PT', fuelType: 'Gasohol 95', isFullTank: true, notes: 'ขับชิลๆ ช่วงวันหยุด' },
  { id: '2026-10', date: '2026-06-12T14:15', odometer: 42200, liters: 35.9, cost: 1360, station: 'Caltex', fuelType: 'Gasohol 95', isFullTank: true, notes: 'เติมระหว่างทาง' },

  { id: '2026-11', date: '2026-05-30T10:00', odometer: 41720, liters: 36.5, cost: 1390, station: 'PTT Station', fuelType: 'Gasohol 95', isFullTank: true, notes: 'วิ่งในกรุงเทพฯ' },
  { id: '2026-12', date: '2026-05-14T18:40', odometer: 41230, liters: 35.0, cost: 1330, station: 'Bangchak', fuelType: 'Gasohol E20', isFullTank: true, notes: 'เติมน้ำมันประจำสัปดาห์' },

  // --- 2025 Data ---
  { id: '2025-1', date: '2025-12-28T17:00', odometer: 36500, liters: 38.0, cost: 1440, station: 'PTT Station', fuelType: 'Gasohol 95', isFullTank: true, notes: 'เติมเต็มถังต้อนรับปีใหม่' },
  { id: '2025-2', date: '2025-12-15T08:15', odometer: 35980, liters: 37.5, cost: 1420, station: 'Shell', fuelType: 'Gasohol 95', isFullTank: true, notes: 'เดินทางส่งของ' },
  { id: '2025-3', date: '2025-11-20T19:30', odometer: 35450, liters: 36.0, cost: 1360, station: 'Bangchak', fuelType: 'Gasohol E20', isFullTank: true, notes: 'ขับในเมืองเป็นหลัก' },
  { id: '2025-4', date: '2025-10-18T12:00', odometer: 34950, liters: 35.2, cost: 1330, station: 'Caltex', fuelType: 'Gasohol 95', isFullTank: true, notes: 'วิ่งสายออกต่างจังหวัด' },
  { id: '2025-5', date: '2025-09-10T15:45', odometer: 34480, liters: 36.0, cost: 1350, station: 'PTT Station', fuelType: 'Gasohol 95', isFullTank: true, notes: 'เติมปั๊มประจำ' }
];

export default function App() {
  const [logs, setLogs] = useState(() => {
    const saved = localStorage.getItem('fuel_tracker_logs_v2');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return SAMPLE_DATA; }
    }
    return SAMPLE_DATA;
  });

  // State
  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedMonth, setSelectedMonth] = useState('2026-09');
  const [activeTab, setActiveTab] = useState('analytics'); // 'analytics' | 'history'
  const [chartMetric, setChartMetric] = useState('cost'); // 'cost' | 'distance' | 'efficiency'
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStation, setFilterStation] = useState('ALL');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLog, setEditingLog] = useState(null);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().slice(0, 16),
    odometer: '',
    liters: '',
    cost: '',
    station: 'PTT Station',
    fuelType: 'Gasohol 95',
    isFullTank: true,
    notes: ''
  });

  useEffect(() => {
    localStorage.setItem('fuel_tracker_logs_v2', JSON.stringify(logs));
  }, [logs]);

  const enrichedLogs = useMemo(() => {
    const chrono = [...logs].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    const computed = chrono.map((item, index) => {
      let distance = 0;
      let kmPerLiter = null;

      if (index > 0) {
        const prev = chrono[index - 1];
        if (item.odometer > prev.odometer) {
          distance = item.odometer - prev.odometer;
          if (item.liters > 0 && item.isFullTank && prev.isFullTank) {
            kmPerLiter = distance / item.liters;
          }
        }
      }

      return {
        ...item,
        distance,
        kmPerLiter
      };
    });

    return computed.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [logs]);

  // Extract available years from dataset
  const availableYears = useMemo(() => {
    const years = new Set(logs.map(log => new Date(log.date).getFullYear().toString()));
    if (years.size === 0) years.add(new Date().getFullYear().toString());
    return Array.from(years).sort((a, b) => b - a);
  }, [logs]);

  const yearlyAnalytics = useMemo(() => {
    // Filter logs belonging to selected year
    const yearLogs = enrichedLogs.filter(log => new Date(log.date).getFullYear().toString() === selectedYear);

    // Annual Totals
    const totalCost = yearLogs.reduce((sum, item) => sum + Number(item.cost || 0), 0);
    const totalLiters = yearLogs.reduce((sum, item) => sum + Number(item.liters || 0), 0);
    const totalDistance = yearLogs.reduce((sum, item) => sum + (item.distance || 0), 0);
    
    const validKmPerLiters = yearLogs.filter(item => item.kmPerLiter !== null);
    const avgKmPerLiter = validKmPerLiters.length > 0 
      ? validKmPerLiters.reduce((sum, item) => sum + item.kmPerLiter, 0) / validKmPerLiters.length 
      : (totalDistance > 0 && totalLiters > 0 ? totalDistance / totalLiters : 0);

    const avgPricePerLiter = totalLiters > 0 ? totalCost / totalLiters : 0;

    // Monthly breakdown (January to December)
    const monthlyList = Array.from({ length: 12 }, (_, monthIdx) => {
      const monthNumStr = String(monthIdx + 1).padStart(2, '0');
      const monthKey = `${selectedYear}-${monthNumStr}`;
      
      const logsInMonth = yearLogs.filter(log => log.date.startsWith(monthKey));

      const mCost = logsInMonth.reduce((sum, item) => sum + Number(item.cost || 0), 0);
      const mLiters = logsInMonth.reduce((sum, item) => sum + Number(item.liters || 0), 0);
      const mDistance = logsInMonth.reduce((sum, item) => sum + (item.distance || 0), 0);

      const mValidKmL = logsInMonth.filter(item => item.kmPerLiter !== null);
      const mAvgKmPerLiter = mValidKmL.length > 0
        ? mValidKmL.reduce((sum, item) => sum + item.kmPerLiter, 0) / mValidKmL.length
        : (mDistance > 0 && mLiters > 0 ? mDistance / mLiters : 0);

      const mAvgPricePerLiter = mLiters > 0 ? mCost / mLiters : 0;

      return {
        monthIndex: monthIdx,
        monthKey,
        monthName: MONTH_NAMES[monthIdx],
        monthShort: MONTH_NAMES_SHORT[monthIdx],
        refuelCount: logsInMonth.length,
        totalCost: mCost,
        totalLiters: mLiters,
        totalDistance: mDistance,
        avgKmPerLiter: mAvgKmPerLiter,
        avgPricePerLiter: mAvgPricePerLiter
      };
    });

    // Find max value in monthly metrics for scaling chart bars
    const maxCost = Math.max(...monthlyList.map(m => m.totalCost), 1);
    const maxDistance = Math.max(...monthlyList.map(m => m.totalDistance), 1);
    const maxEfficiency = Math.max(...monthlyList.map(m => m.avgKmPerLiter), 1);

    return {
      totalCost,
      totalLiters,
      totalDistance,
      avgKmPerLiter,
      avgPricePerLiter,
      refuelCount: yearLogs.length,
      monthlyList,
      maxCost,
      maxDistance,
      maxEfficiency
    };
  }, [enrichedLogs, selectedYear]);

  // Filter logs for History Tab
  const filteredHistoryLogs = useMemo(() => {
    return enrichedLogs.filter(log => {
      const matchesMonth = selectedMonth ? log.date.startsWith(selectedMonth) : true;
      const matchesSearch = log.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            log.station.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            log.fuelType.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStation = filterStation === 'ALL' || log.station === filterStation;
      return matchesMonth && matchesSearch && matchesStation;
    });
  }, [enrichedLogs, selectedMonth, searchTerm, filterStation]);

  const handleOpenAddModal = () => {
    setEditingLog(null);
    const latestOdo = enrichedLogs.length > 0 ? enrichedLogs[0].odometer : '';
    setFormData({
      date: new Date().toISOString().slice(0, 16),
      odometer: latestOdo ? Number(latestOdo) + 350 : '',
      liters: '',
      cost: '',
      station: 'PTT Station',
      fuelType: 'Gasohol 95',
      isFullTank: true,
      notes: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (log) => {
    setEditingLog(log);
    setFormData({
      date: log.date,
      odometer: log.odometer,
      liters: log.liters,
      cost: log.cost,
      station: log.station,
      fuelType: log.fuelType,
      isFullTank: log.isFullTank ?? true,
      notes: log.notes || ''
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.odometer || !formData.liters || !formData.cost) {
      alert('กรุณากรอกข้อมูล เลขไมล์, จำนวนลิตร และราคารวม ให้ครบถ้วน');
      return;
    }

    const payload = {
      id: editingLog ? editingLog.id : Date.now().toString(),
      date: formData.date,
      odometer: Number(formData.odometer),
      liters: Number(formData.liters),
      cost: Number(formData.cost),
      station: formData.station,
      fuelType: formData.fuelType,
      isFullTank: formData.isFullTank,
      notes: formData.notes
    };

    if (editingLog) {
      setLogs(prev => prev.map(item => item.id === editingLog.id ? payload : item));
    } else {
      setLogs(prev => [...prev, payload]);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('คุณต้องการลบรายการบันทึกนี้ใช่หรือไม่?')) {
      setLogs(prev => prev.filter(item => item.id !== id));
    }
  };

  const navigateToMonthHistory = (monthKey) => {
    setSelectedMonth(monthKey);
    setActiveTab('history');
  };

  const exportToCSV = () => {
    const headers = ['ID,วันที่เวลา,เลขไมล์(กม.),จำนวนลิตร,ราคารวม(บาท),ปั๊มน้ำมัน,ประเภทน้ำมัน,เติมเต็มถัง,บันทึกเพิ่มเติม\n'];
    const rows = enrichedLogs.map(l => 
      `"${l.id}","${l.date}",${l.odometer},${l.liters},${l.cost},"${l.station}","${l.fuelType}","${l.isFullTank ? 'ใช่' : 'ไม่'}","${l.notes.replace(/"/g, '""')}"`
    );
    const blob = new Blob(['\uFEFF' + headers.concat(rows).join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `fuel_tracker_export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetToSampleData = () => {
    if (window.confirm('ต้องการล้างข้อมูลปัจจุบันและโหลดข้อมูลตัวอย่างย้อนหลังเพื่อทดลองใช้งานหรือไม่?')) {
      setLogs(SAMPLE_DATA);
    }
  };

  const formatNumber = (val, decimals = 1) => Number(val || 0).toLocaleString('th-TH', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  
  const getStationBadge = (stationName) => {
    const found = GAS_STATIONS.find(s => s.name === stationName);
    return found ? found.bg : 'bg-slate-100 text-slate-800 border-slate-200';
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 pb-24 font-sans">
      
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 text-white shadow-md">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <Fuel className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight">บันทึกค่าน้ำมัน</h1>
              <p className="text-xs text-blue-200 font-light">Monthly & Yearly Fuel Efficiency Tracker</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button 
              onClick={exportToCSV}
              className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors flex items-center text-xs space-x-1"
              title="ส่งออกไฟล์ CSV"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">ส่งออก CSV</span>
            </button>
            <button 
              onClick={resetToSampleData}
              className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors flex items-center text-xs space-x-1"
              title="โหลดข้อมูลตัวอย่าง"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 pt-4 space-y-4">

        {/* View Switcher Tabs */}
        <div className="flex border border-slate-200 bg-white rounded-2xl p-1.5 shadow-sm">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition-all ${
              activeTab === 'analytics' 
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>สถิติ & สรุปผลรายเดือน</span>
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition-all ${
              activeTab === 'history' 
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <ListFilter className="w-4 h-4" />
            <span>ประวัติรายการเติม ({logs.length})</span>
          </button>
        </div>

        {/* ================= TAB 1: ANNUAL & MONTHLY ANALYTICS ================= */}
        {activeTab === 'analytics' && (
          <div className="space-y-4">
            
            {/* Year Selector Toolbar */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider">เลือกปีสถิติ</label>
                  <select 
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="bg-transparent font-bold text-slate-800 text-lg focus:outline-none cursor-pointer pr-2"
                  >
                    {availableYears.map(yr => (
                      <option key={yr} value={yr}>ปี {Number(yr) + 543} ({yr})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="text-xs text-slate-500 font-medium bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/80">
                รายการเติมตลอดปี: <span className="text-indigo-600 font-bold">{yearlyAnalytics.refuelCount}</span> ครั้ง
              </div>
            </div>

            {/* Annual Overview Cards for Selected Year */}
            {}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              
              {/* Total Cost */}
              <div className="bg-gradient-to-br from-indigo-600 to-blue-700 text-white p-4 rounded-2xl shadow-sm relative overflow-hidden">
                <div className="absolute -right-3 -bottom-3 opacity-15">
                  <DollarSign className="w-20 h-20" />
                </div>
                <p className="text-xs font-medium text-indigo-100">รวมค่าใช้จ่ายทั้งปี {selectedYear}</p>
                <h3 className="text-2xl font-extrabold mt-1 tracking-tight">
                  ฿{formatNumber(yearlyAnalytics.totalCost, 0)}
                </h3>
                <p className="text-[11px] text-indigo-200 mt-2">
                  เฉลี่ย ฿{formatNumber(yearlyAnalytics.totalCost / 12, 0)}/เดือน
                </p>
              </div>

              {/* Total Liters */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm relative">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-slate-500">ปริมาณน้ำมันรวม</p>
                  <div className="p-1.5 bg-amber-50 rounded-lg text-amber-600">
                    <Fuel className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mt-1">
                  {formatNumber(yearlyAnalytics.totalLiters, 1)} <span className="text-xs font-normal text-slate-500">ลิตร</span>
                </h3>
                <p className="text-[11px] text-slate-500 mt-2">
                  เฉลี่ย ฿{formatNumber(yearlyAnalytics.avgPricePerLiter, 2)}/ลิตร
                </p>
              </div>

              {/* Total Distance */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm relative">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-slate-500">ระยะทางรวมทั้งปี</p>
                  <div className="p-1.5 bg-blue-50 rounded-lg text-blue-600">
                    <Gauge className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mt-1">
                  {formatNumber(yearlyAnalytics.totalDistance, 0)} <span className="text-xs font-normal text-slate-500">กม.</span>
                </h3>
                <p className="text-[11px] text-slate-500 mt-2">
                  ระยะทางจากการเติม
                </p>
              </div>

              {/* Avg Efficiency */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm relative">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-slate-500">อัตราสิ้นเปลืองเฉลี่ย</p>
                  <div className="p-1.5 bg-emerald-50 rounded-lg text-emerald-600">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mt-1">
                  {yearlyAnalytics.avgKmPerLiter > 0 ? formatNumber(yearlyAnalytics.avgKmPerLiter, 2) : '-'} <span className="text-xs font-normal text-slate-500">กม./ลิตร</span>
                </h3>
                <p className="text-[11px] text-slate-500 mt-2">
                  ประหยัดพลังงานเฉลี่ย
                </p>
              </div>

            </div>

            {/* Interactive Monthly Comparison Bar Chart */}
            {}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <BarChart2 className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-sm font-bold text-slate-800">
                    แนวโน้มและสถิติรายเดือน (ปี {selectedYear})
                  </h3>
                </div>

                {/* Metric Selector Buttons */}
                <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                  <button 
                    onClick={() => setChartMetric('cost')}
                    className={`px-3 py-1 rounded-lg transition-all ${chartMetric === 'cost' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}
                  >
                    ค่าใช้จ่าย (฿)
                  </button>
                  <button 
                    onClick={() => setChartMetric('distance')}
                    className={`px-3 py-1 rounded-lg transition-all ${chartMetric === 'distance' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}
                  >
                    ระยะทาง (กม.)
                  </button>
                  <button 
                    onClick={() => setChartMetric('efficiency')}
                    className={`px-3 py-1 rounded-lg transition-all ${chartMetric === 'efficiency' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}
                  >
                    กม./ลิตร
                  </button>
                </div>
              </div>

              {/* Bars Graphic Visual */}
              <div className="pt-6 pb-2">
                <div className="h-44 flex items-end justify-between gap-1 sm:gap-2 border-b border-slate-200 pb-2">
                  {yearlyAnalytics.monthlyList.map((m) => {
                    let val = 0;
                    let maxVal = 1;
                    let unit = '';

                    if (chartMetric === 'cost') {
                      val = m.totalCost;
                      maxVal = yearlyAnalytics.maxCost;
                      unit = '฿';
                    } else if (chartMetric === 'distance') {
                      val = m.totalDistance;
                      maxVal = yearlyAnalytics.maxDistance;
                      unit = ' กม.';
                    } else {
                      val = m.avgKmPerLiter;
                      maxVal = yearlyAnalytics.maxEfficiency;
                      unit = ' กม./ล.';
                    }

                    const heightPercent = maxVal > 0 ? Math.max((val / maxVal) * 100, 4) : 4;
                    const hasData = m.refuelCount > 0;

                    return (
                      <div key={m.monthIndex} className="flex-1 flex flex-col items-center group relative">
                        
                        {/* Tooltip on Hover */}
                        {hasData && (
                          <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-[10px] py-1 px-2 rounded-lg whitespace-nowrap z-20 pointer-events-none shadow-md">
                            {m.monthName}: {formatNumber(val, chartMetric === 'efficiency' ? 1 : 0)}{unit}
                          </div>
                        )}

                        {/* Bar Pillar */}
                        <div className="w-full bg-slate-100 rounded-t-lg h-full flex items-end overflow-hidden">
                          <div 
                            className={`w-full rounded-t-lg transition-all duration-500 ${
                              hasData 
                                ? chartMetric === 'cost' 
                                  ? 'bg-gradient-to-t from-indigo-600 to-indigo-400 group-hover:from-indigo-700 group-hover:to-indigo-500'
                                  : chartMetric === 'distance'
                                  ? 'bg-gradient-to-t from-blue-600 to-cyan-400'
                                  : 'bg-gradient-to-t from-emerald-600 to-emerald-400'
                                : 'bg-slate-200'
                            }`}
                            style={{ height: `${hasData ? heightPercent : 0}%` }}
                          />
                        </div>

                        {/* Month Label */}
                        <span className="text-[10px] font-medium text-slate-500 mt-2 truncate w-full text-center">
                          {m.monthShort}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Detailed Monthly Summary Table */}
            {}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TableIcon className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-sm font-bold text-slate-800">
                    ตารางสรุปค่าน้ำมันรายเดือน (ปี {selectedYear})
                  </h3>
                </div>
                <span className="text-xs text-slate-400 font-light">
                  คลิกที่เดือนเพื่อดูประวัติ
                </span>
              </div>

              {/* Table view for Desktop / Tablet */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-slate-500">
                      <th className="py-2.5 px-3 font-semibold">เดือน</th>
                      <th className="py-2.5 px-3 font-semibold text-center">ครั้งที่เติม</th>
                      <th className="py-2.5 px-3 font-semibold text-right">ค่าใช้จ่ายรวม</th>
                      <th className="py-2.5 px-3 font-semibold text-right">ปริมาณ (ลิตร)</th>
                      <th className="py-2.5 px-3 font-semibold text-right">ระยะทาง (กม.)</th>
                      <th className="py-2.5 px-3 font-semibold text-right">อัตราสิ้นเปลือง</th>
                      <th className="py-2.5 px-3 font-semibold text-right">เฉลี่ย ฿/ลิตร</th>
                      <th className="py-2.5 px-3 font-semibold text-center"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {yearlyAnalytics.monthlyList.map((m) => {
                      const hasData = m.refuelCount > 0;
                      return (
                        <tr 
                          key={m.monthIndex} 
                          className={`hover:bg-indigo-50/50 transition-colors ${!hasData ? 'text-slate-300' : 'text-slate-700'}`}
                        >
                          <td className="py-3 px-3 font-bold text-slate-800">
                            {m.monthName}
                          </td>
                          <td className="py-3 px-3 text-center">
                            {hasData ? (
                              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium text-[11px]">
                                {m.refuelCount} ครั้ง
                              </span>
                            ) : '-'}
                          </td>
                          <td className="py-3 px-3 text-right font-semibold text-slate-900">
                            {hasData ? `฿${formatNumber(m.totalCost, 0)}` : '-'}
                          </td>
                          <td className="py-3 px-3 text-right">
                            {hasData ? `${formatNumber(m.totalLiters, 1)} ล.` : '-'}
                          </td>
                          <td className="py-3 px-3 text-right">
                            {hasData ? `${formatNumber(m.totalDistance, 0)} กม.` : '-'}
                          </td>
                          <td className="py-3 px-3 text-right font-medium text-emerald-600">
                            {hasData && m.avgKmPerLiter > 0 ? `${formatNumber(m.avgKmPerLiter, 2)} กม./ล.` : '-'}
                          </td>
                          <td className="py-3 px-3 text-right text-slate-500">
                            {hasData && m.avgPricePerLiter > 0 ? `฿${formatNumber(m.avgPricePerLiter, 2)}` : '-'}
                          </td>
                          <td className="py-3 px-3 text-center">
                            {hasData && (
                              <button
                                onClick={() => navigateToMonthHistory(m.monthKey)}
                                className="p-1 text-indigo-600 hover:bg-indigo-100 rounded-lg transition-colors inline-flex items-center text-[11px]"
                                title="ดูประวัติการเติมเดือนนี้"
                              >
                                <ChevronRight className="w-4 h-4" />
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Cards view for Mobile Screens */}
              <div className="grid grid-cols-1 gap-2.5 sm:hidden">
                {yearlyAnalytics.monthlyList.map((m) => {
                  const hasData = m.refuelCount > 0;
                  if (!hasData) return null;

                  return (
                    <div 
                      key={m.monthIndex} 
                      onClick={() => navigateToMonthHistory(m.monthKey)}
                      className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl space-y-2 cursor-pointer active:bg-slate-100 transition-colors"
                    >
                      <div className="flex justify-between items-center border-b border-slate-200/60 pb-2">
                        <span className="font-bold text-slate-800 text-sm">
                          {m.monthName}
                        </span>
                        <span className="text-xs font-bold text-indigo-600">
                          ฿{formatNumber(m.totalCost, 0)}
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-1 text-[11px] text-slate-600">
                        <div>
                          <p className="text-slate-400 text-[10px]">ปริมาณ</p>
                          <p className="font-semibold">{formatNumber(m.totalLiters, 1)} ลิตร</p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-[10px]">ระยะทาง</p>
                          <p className="font-semibold">{formatNumber(m.totalDistance, 0)} กม.</p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-[10px]">กม./ลิตร</p>
                          <p className="font-semibold text-emerald-600">
                            {m.avgKmPerLiter > 0 ? formatNumber(m.avgKmPerLiter, 1) : '-'}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

          </div>
        )}

        {/* ================= TAB 2: HISTORY LOG LIST ================= */}
        {}
        {activeTab === 'history' && (
          <div className="space-y-3">
            
            {/* Filter Toolbar for History */}
            <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                
                {/* Month Picker Filter */}
                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">เลือกเดือน</label>
                  <input 
                    type="month" 
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Station Filter */}
                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">ปั๊มน้ำมัน</label>
                  <select
                    value={filterStation}
                    onChange={(e) => setFilterStation(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="ALL">ทุกปั๊มน้ำมัน</option>
                    {GAS_STATIONS.map(s => (
                      <option key={s.id} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                </div>

                {/* Search Text Input */}
                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">ค้นหา</label>
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                    <input 
                      type="text"
                      placeholder="คำค้นหา..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

              </div>
            </div>

            {/* List Entries */}
            {filteredHistoryLogs.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 shadow-sm">
                <Fuel className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="text-sm text-slate-600 font-bold">ไม่พบประวัติการเติมน้ำมันในเดือนนี้</p>
                <p className="text-xs text-slate-400 mt-1">ลองสลับเดือน หรือกดปุ่มเพิ่มข้อมูลใหม่</p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {filteredHistoryLogs.map((log) => {
                  const dateObj = new Date(log.date);
                  const formattedDate = dateObj.toLocaleDateString('th-TH', {
                    day: 'numeric',
                    month: 'short',
                    year: '2-digit'
                  });
                  const formattedTime = dateObj.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });

                  return (
                    <div 
                      key={log.id} 
                      className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition-all relative"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-center space-x-2">
                          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${getStationBadge(log.station)}`}>
                            {log.station}
                          </span>
                          <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full text-[11px] font-medium">
                            {log.fuelType}
                          </span>
                          {log.isFullTank && (
                            <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-[10px] font-semibold border border-blue-200">
                              เต็มถัง
                            </span>
                          )}
                        </div>

                        <div className="flex items-center space-x-1">
                          <button 
                            onClick={() => handleOpenEditModal(log)}
                            className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-slate-100 transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(log.id)}
                            className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-slate-100 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Main Data Numbers */}
                      <div className="mt-3 flex justify-between items-end">
                        <div>
                          <div className="text-xl font-extrabold text-slate-900">
                            ฿{formatNumber(log.cost, 0)}
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {formatNumber(log.liters, 2)} ลิตร (฿{formatNumber(log.cost / log.liters, 2)}/ลิตร)
                          </p>
                        </div>

                        <div className="text-right">
                          <div className="text-xs font-bold text-slate-800 flex items-center justify-end space-x-1">
                            <Gauge className="w-3.5 h-3.5 text-slate-400" />
                            <span>{log.odometer.toLocaleString()} กม.</span>
                          </div>

                          {log.distance > 0 && (
                            <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">
                              +{log.distance} กม. {log.kmPerLiter ? `(${formatNumber(log.kmPerLiter, 1)} กม./ล.)` : ''}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Note Footer */}
                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                        <span className="truncate max-w-[200px] text-slate-500 italic">
                          {log.notes ? `"${log.notes}"` : 'ไม่มีบันทึกเพิ่มเติม'}
                        </span>
                        <span>{formattedDate} • {formattedTime} น.</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

      </main>

      {/* Floating Action Button (Add Entry) */}
      <button
        onClick={handleOpenAddModal}
        className="fixed right-5 bottom-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-full shadow-lg hover:shadow-indigo-500/30 active:scale-95 transition-all z-20 flex items-center space-x-2"
      >
        <Plus className="w-6 h-6" />
        <span className="font-semibold text-sm pr-1 hidden sm:inline">บันทึกค่าน้ำมัน</span>
      </button>

      {/* Modal Add/Edit Log */}
      {}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-4 px-6 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Fuel className="w-5 h-5 text-indigo-400" />
                <h2 className="font-bold text-base">
                  {editingLog ? 'แก้ไขบันทึกค่าน้ำมัน' : 'บันทึกรายการเติมน้ำมัน'}
                </h2>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              
              {/* Date & Time Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">วันและเวลาที่เติม</label>
                <input 
                  type="datetime-local" 
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  required
                />
              </div>

              {/* Odometer & Liters */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">เลขไมล์ปัจจุบัน (กม.)</label>
                  <input 
                    type="number" 
                    placeholder="เช่น 45200"
                    value={formData.odometer}
                    onChange={(e) => setFormData({ ...formData, odometer: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none font-semibold"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">จำนวนลิตร</label>
                  <input 
                    type="number" 
                    step="0.01"
                    placeholder="เช่น 35.5"
                    value={formData.liters}
                    onChange={(e) => setFormData({ ...formData, liters: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none font-semibold"
                    required
                  />
                </div>
              </div>

              {/* Cost Amount */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">ราคารวม (บาท)</label>
                <input 
                  type="number" 
                  step="0.01"
                  placeholder="เช่น 1350"
                  value={formData.cost}
                  onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-base font-bold text-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  required
                />
              </div>

              {/* Station & Fuel Type */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">ปั๊มน้ำมัน</label>
                  <select 
                    value={formData.station}
                    onChange={(e) => setFormData({ ...formData, station: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    {GAS_STATIONS.map(s => (
                      <option key={s.id} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">ประเภทน้ำมัน</label>
                  <select 
                    value={formData.fuelType}
                    onChange={(e) => setFormData({ ...formData, fuelType: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    {FUEL_TYPES.map(ft => (
                      <option key={ft} value={ft}>{ft}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Checkbox: Full Tank */}
              <div className="flex items-center space-x-2 pt-1">
                <input 
                  type="checkbox"
                  id="fullTankCheckbox"
                  checked={formData.isFullTank}
                  onChange={(e) => setFormData({ ...formData, isFullTank: e.target.checked })}
                  className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                />
                <label htmlFor="fullTankCheckbox" className="text-xs font-medium text-slate-700 cursor-pointer">
                  เติมเต็มถัง (ใช้คำนวณอัตราสิ้นเปลือง กม./ลิตร)
                </label>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">บันทึกเพิ่มเติม</label>
                <textarea 
                  rows={2}
                  placeholder="เช่น ขับต่างจังหวัด, จราจรติดขัด..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-200 transition-colors"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-colors"
                >
                  {editingLog ? 'บันทึกการแก้ไข' : 'บันทึกข้อมูล'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}