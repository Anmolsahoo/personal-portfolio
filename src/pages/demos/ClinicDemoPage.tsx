import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Stethoscope,
  Users,
  Clock,
  CheckCircle2,
  AlertCircle,
  Search,
  Plus,
  ArrowLeft,
  Calendar,
  IndianRupee,
  Activity,
  HeartPulse,
  UserCheck,
  Building2,
  Dumbbell,
  GraduationCap,
  Sparkles,
  Phone,
  FileText,
  X
} from 'lucide-react';

interface PatientQueueItem {
  id: string;
  token: number;
  name: string;
  age: number;
  gender: string;
  phone: string;
  doctor: string;
  department: string;
  time: string;
  priority: 'Urgent' | 'Regular' | 'Follow-up';
  status: 'Waiting' | 'In Consultation' | 'Completed';
  symptoms: string;
  bloodGroup: string;
  fee: number;
}

export const ClinicDemoPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'queue' | 'patients' | 'doctors' | 'billing'>('queue');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  // New patient state
  const [newPatient, setNewPatient] = useState({
    name: '',
    age: '',
    gender: 'Male',
    phone: '',
    doctor: 'Dr. Rajesh Sharma',
    department: 'Cardiology',
    priority: 'Regular' as const,
    symptoms: '',
    bloodGroup: 'B+'
  });

  const [queue, setQueue] = useState<PatientQueueItem[]>([
    {
      id: 'p-1',
      token: 101,
      name: 'Ramesh Sundaram',
      age: 54,
      gender: 'Male',
      phone: '+91 98450 12890',
      doctor: 'Dr. Rajesh Sharma',
      department: 'Cardiology',
      time: '18:15',
      priority: 'Urgent',
      status: 'In Consultation',
      symptoms: 'Chest tightness, elevated BP (150/95)',
      bloodGroup: 'O+',
      fee: 800
    },
    {
      id: 'p-2',
      token: 102,
      name: 'Ananya Deshmukh',
      age: 28,
      gender: 'Female',
      phone: '+91 98230 45612',
      doctor: 'Dr. Priya Patel',
      department: 'Pediatrics & Family',
      time: '18:25',
      priority: 'Regular',
      status: 'Waiting',
      symptoms: 'Seasonal allergic rhinitis, mild fever',
      bloodGroup: 'A+',
      fee: 600
    },
    {
      id: 'p-3',
      token: 103,
      name: 'Vikramaditya Rao',
      age: 42,
      gender: 'Male',
      phone: '+91 97110 33499',
      doctor: 'Dr. Amit Verma',
      department: 'General Medicine',
      time: '18:35',
      priority: 'Regular',
      status: 'Waiting',
      symptoms: 'Migraine episodes, routine checkup',
      bloodGroup: 'B+',
      fee: 600
    },
    {
      id: 'p-4',
      token: 104,
      name: 'Sunita Mehra',
      age: 61,
      gender: 'Female',
      phone: '+91 99010 88231',
      doctor: 'Dr. Sneha Rao',
      department: 'Orthopedics',
      time: '18:40',
      priority: 'Follow-up',
      status: 'Waiting',
      symptoms: 'Post-op knee mobility review',
      bloodGroup: 'AB+',
      fee: 400
    },
    {
      id: 'p-5',
      token: 105,
      name: 'Kavita Chawla',
      age: 33,
      gender: 'Female',
      phone: '+91 91223 90123',
      doctor: 'Dr. Priya Patel',
      department: 'Pediatrics & Family',
      time: '17:45',
      priority: 'Regular',
      status: 'Completed',
      symptoms: 'Pediatric vaccination dose 3',
      bloodGroup: 'O+',
      fee: 600
    },
    {
      id: 'p-6',
      token: 106,
      name: 'Harish Nair',
      age: 49,
      gender: 'Male',
      phone: '+91 98840 77120',
      doctor: 'Dr. Rajesh Sharma',
      department: 'Cardiology',
      time: '17:20',
      priority: 'Follow-up',
      status: 'Completed',
      symptoms: 'Echo review & medication renewal',
      bloodGroup: 'A+',
      fee: 800
    }
  ]);

  const doctors = [
    {
      name: 'Dr. Rajesh Sharma',
      degrees: 'MD (AIIMS), DM Cardiology',
      department: 'Cardiology',
      cabin: 'Cabin 101',
      status: 'In Consultation',
      patientsSeenToday: 15,
      avgTime: '18 mins'
    },
    {
      name: 'Dr. Priya Patel',
      degrees: 'MD Pediatrics, DCH',
      department: 'Pediatrics & Family',
      cabin: 'Cabin 104',
      status: 'Available',
      patientsSeenToday: 19,
      avgTime: '12 mins'
    },
    {
      name: 'Dr. Amit Verma',
      degrees: 'MBBS, DNB General Medicine',
      department: 'General Medicine',
      cabin: 'Cabin 102',
      status: 'Available',
      patientsSeenToday: 14,
      avgTime: '14 mins'
    },
    {
      name: 'Dr. Sneha Rao',
      degrees: 'MS Orthopedics, Fellowship Joint Replacement',
      department: 'Orthopedics',
      cabin: 'Cabin 108',
      status: 'On Break (Until 19:00)',
      patientsSeenToday: 11,
      avgTime: '20 mins'
    }
  ];

  // Actions
  const updateStatus = (id: string, newStatus: 'Waiting' | 'In Consultation' | 'Completed') => {
    setQueue(prev =>
      prev.map(item => (item.id === id ? { ...item, status: newStatus } : item))
    );
    const item = queue.find(q => q.id === id);
    showAlert(`Status for ${item?.name || 'Patient'} changed to "${newStatus}"`);
  };

  const showAlert = (msg: string) => {
    setAlertMessage(msg);
    setTimeout(() => setAlertMessage(null), 3500);
  };

  const handleAddPatient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPatient.name) return;

    const nextToken = Math.max(...queue.map(q => q.token), 100) + 1;
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const created: PatientQueueItem = {
      id: `p-${Date.now()}`,
      token: nextToken,
      name: newPatient.name,
      age: parseInt(newPatient.age) || 30,
      gender: newPatient.gender,
      phone: newPatient.phone || '+91 98000 00000',
      doctor: newPatient.doctor,
      department: newPatient.department,
      time: timeString,
      priority: newPatient.priority,
      status: 'Waiting',
      symptoms: newPatient.symptoms || 'General OPD consultation',
      bloodGroup: newPatient.bloodGroup,
      fee: newPatient.department === 'Cardiology' ? 800 : 600
    };

    setQueue([created, ...queue]);
    setShowAddModal(false);
    setNewPatient({
      name: '',
      age: '',
      gender: 'Male',
      phone: '',
      doctor: 'Dr. Rajesh Sharma',
      department: 'Cardiology',
      priority: 'Regular',
      symptoms: '',
      bloodGroup: 'B+'
    });
    showAlert(`✓ Added token #${nextToken} (${created.name}) to live OPD queue!`);
  };

  // Metrics
  const totalPatients = queue.length + 38;
  const waitingCount = queue.filter(q => q.status === 'Waiting').length;
  const inConsultCount = queue.filter(q => q.status === 'In Consultation').length;
  const completedCount = queue.filter(q => q.status === 'Completed').length + 36;
  const totalOpdRevenue = queue.reduce((sum, item) => sum + item.fee, 28400);

  // Filtered queue
  const filteredQueue = queue.filter(item => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.symptoms.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.token.toString().includes(searchQuery);
    const matchesDept = filterDepartment === 'All' || item.department === filterDepartment;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-teal-500/20 selection:text-teal-900 flex flex-col font-sans">
      
      {/* Top Demo Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs px-3 sm:px-6 py-2.5 sm:py-3">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          
          {/* Left: Back Link & Platform Title */}
          <div className="flex items-center justify-between sm:justify-start gap-3">
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 border border-slate-200 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Portfolio</span>
            </Link>

            <div className="h-4 w-px bg-slate-200 hidden sm:block" />

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white shadow-sm flex-shrink-0">
                <Stethoscope className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-slate-900">MediPulse Clinic</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                    LIVE
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 hidden md:block">OPD Patient Triage, Doctor Queue & Practice Management</p>
              </div>
            </div>
          </div>

          {/* Quick Demo Switcher Tabs */}
          <div className="flex items-center justify-center sm:justify-end gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            <span className="px-3 py-1 rounded-lg bg-teal-600 text-white font-semibold flex items-center gap-1.5 shadow-xs">
              <HeartPulse className="w-3.5 h-3.5" />
              <span>Clinic</span>
            </span>
            <Link
              to="/demos/school"
              className="px-3 py-1 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-white transition-colors flex items-center gap-1.5 font-medium"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>School</span>
            </Link>
            <Link
              to="/demos/gym"
              className="px-3 py-1 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-white transition-colors flex items-center gap-1.5 font-medium"
            >
              <Dumbbell className="w-3.5 h-3.5" />
              <span>Gym</span>
            </Link>
          </div>

        </div>
      </header>

      {/* Alert Notification Toast */}
      {alertMessage && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce border border-slate-700 max-w-sm">
          <Sparkles className="w-5 h-5 text-teal-400 flex-shrink-0" />
          <span className="text-xs sm:text-sm font-medium">{alertMessage}</span>
        </div>
      )}

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8">
        
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          
          <div className="rounded-2xl bg-white border border-slate-200 p-4 sm:p-5 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500">Total OPD Today</span>
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-0.5">{totalPatients}</div>
            <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
              <span>↑ +14.2%</span>
              <span className="text-slate-400 font-normal">vs yesterday</span>
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 p-4 sm:p-5 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500">Waiting in Queue</span>
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 mb-0.5">{waitingCount}</div>
            <div className="text-[11px] text-slate-500">
              Avg wait: ~14 mins
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 p-4 sm:p-5 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500">In Consultation</span>
              <div className="p-2 rounded-xl bg-purple-50 text-purple-600 border border-purple-100">
                <Activity className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-purple-600 mb-0.5">{inConsultCount}</div>
            <div className="text-[11px] text-emerald-600 font-medium">
              {doctors.length} Doctors Active
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 p-4 sm:p-5 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500">Day's Collection</span>
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                <IndianRupee className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-0.5">₹{totalOpdRevenue.toLocaleString('en-IN')}</div>
            <div className="text-[11px] text-emerald-600 font-medium">
              {completedCount} consultations billed
            </div>
          </div>

        </div>

        {/* Action Header & Tabs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl border border-slate-200 overflow-x-auto">
            <button
              onClick={() => setActiveTab('queue')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'queue'
                  ? 'bg-white text-teal-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Live OPD Queue ({queue.length})
            </button>
            <button
              onClick={() => setActiveTab('patients')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'patients'
                  ? 'bg-white text-teal-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Patient Directory
            </button>
            <button
              onClick={() => setActiveTab('doctors')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'doctors'
                  ? 'bg-white text-teal-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Doctors & Cabins
            </button>
            <button
              onClick={() => setActiveTab('billing')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'billing'
                  ? 'bg-white text-teal-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Billing Slip
            </button>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Walk-in Patient</span>
          </button>
        </div>

        {/* TAB 1: LIVE OPD QUEUE */}
        {activeTab === 'queue' && (
          <div className="space-y-4">
            
            {/* Search & Department Filters */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by token, patient, symptom..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                {['All', 'Cardiology', 'Pediatrics & Family', 'General Medicine', 'Orthopedics'].map(dept => (
                  <button
                    key={dept}
                    onClick={() => setFilterDepartment(dept)}
                    className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap font-medium transition-colors ${
                      filterDepartment === dept
                        ? 'bg-slate-800 text-white'
                        : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            </div>

            {/* Queue Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {filteredQueue.map(item => (
                <div
                  key={item.id}
                  className={`rounded-2xl border p-4 sm:p-5 transition-all flex flex-col justify-between shadow-xs ${
                    item.status === 'In Consultation'
                      ? 'bg-purple-50/50 border-purple-200'
                      : item.status === 'Completed'
                      ? 'bg-slate-50 border-slate-200 opacity-80'
                      : 'bg-white border-slate-200 hover:border-teal-400'
                  }`}
                >
                  <div>
                    {/* Token & Badges */}
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="text-base sm:text-lg font-black font-mono px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-800">
                          #{item.token}
                        </span>
                        <span className="text-[11px] text-slate-500 font-mono flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {item.time}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            item.priority === 'Urgent'
                              ? 'bg-rose-100 text-rose-700'
                              : item.priority === 'Follow-up'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {item.priority}
                        </span>

                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            item.status === 'In Consultation'
                              ? 'bg-purple-100 text-purple-700'
                              : item.status === 'Completed'
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-amber-100 text-amber-700'
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                    </div>

                    {/* Patient Info */}
                    <h3 className="text-base font-bold text-slate-900 mb-0.5">{item.name}</h3>
                    <div className="text-xs text-slate-500 mb-3">
                      {item.age} yrs • {item.gender} • Blood Group: <span className="text-rose-600 font-semibold">{item.bloodGroup}</span>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 mb-3">
                      <div className="text-[11px] text-slate-700 mb-1">
                        <span className="text-slate-400">Consultant:</span> <strong className="text-slate-800">{item.doctor}</strong>
                      </div>
                      <div className="text-[11px] text-slate-600">
                        <span className="text-slate-400">Complaint:</span> {item.symptoms}
                      </div>
                    </div>
                  </div>

                  {/* Interactive Status Actions */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    {item.status === 'Waiting' && (
                      <button
                        onClick={() => updateStatus(item.id, 'In Consultation')}
                        className="w-full py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold transition-all shadow-xs flex items-center justify-center gap-1.5"
                      >
                        <Activity className="w-3.5 h-3.5" />
                        <span>Call to Cabin</span>
                      </button>
                    )}

                    {item.status === 'In Consultation' && (
                      <button
                        onClick={() => updateStatus(item.id, 'Completed')}
                        className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-all shadow-xs flex items-center justify-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Mark Consultation Done</span>
                      </button>
                    )}

                    {item.status === 'Completed' && (
                      <div className="w-full flex items-center justify-between text-xs text-emerald-700 font-medium">
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Consultation Finished
                        </span>
                        <button
                          onClick={() => updateStatus(item.id, 'Waiting')}
                          className="text-[11px] text-slate-500 hover:text-slate-800 underline"
                        >
                          Reopen
                        </button>
                      </div>
                    )}
                  </div>

                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 2: PATIENTS DIRECTORY */}
        {activeTab === 'patients' && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">OPD Patient Records</h3>
                <p className="text-xs text-slate-500">Electronic Health Record (EHR) quick view</p>
              </div>
              <div className="text-xs text-slate-500">Showing {queue.length} registered today</div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[650px]">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-[11px] uppercase tracking-wider border-b border-slate-200">
                    <th className="py-3 px-4 font-semibold">Token</th>
                    <th className="py-3 px-4 font-semibold">Patient Name</th>
                    <th className="py-3 px-4 font-semibold">Contact</th>
                    <th className="py-3 px-4 font-semibold">Doctor Assigned</th>
                    <th className="py-3 px-4 font-semibold">Diagnosis / Notes</th>
                    <th className="py-3 px-4 font-semibold">Status</th>
                    <th className="py-3 px-4 font-semibold text-right">Fee</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {queue.map(item => (
                    <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                        #{item.token}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-900">{item.name}</div>
                        <div className="text-[11px] text-slate-500">{item.age}y / {item.gender} • {item.bloodGroup}</div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        <div className="flex items-center gap-1.5">
                          <Phone className="w-3 h-3 text-slate-400" />
                          <span>{item.phone}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-700">
                        <div>{item.doctor}</div>
                        <div className="text-[10px] text-slate-500">{item.department}</div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 max-w-xs truncate">
                        {item.symptoms}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            item.status === 'Completed'
                              ? 'bg-emerald-100 text-emerald-700'
                              : item.status === 'In Consultation'
                              ? 'bg-purple-100 text-purple-700'
                              : 'bg-amber-100 text-amber-700'
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-semibold text-slate-900">
                        ₹{item.fee}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: DOCTORS & CABINS */}
        {activeTab === 'doctors' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {doctors.map((doc, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-slate-200 p-5 shadow-xs hover:border-teal-400 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200 mb-2 inline-block font-semibold">
                      {doc.cabin}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">{doc.name}</h3>
                    <p className="text-xs text-slate-500">{doc.degrees}</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-teal-50 text-teal-600">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100 text-center mb-4">
                  <div>
                    <div className="text-[10px] text-slate-500">Department</div>
                    <div className="text-xs font-semibold text-slate-800 truncate">{doc.department}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500">Patients Seen</div>
                    <div className="text-xs font-semibold text-teal-700 font-mono">{doc.patientsSeenToday}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500">Avg Slot</div>
                    <div className="text-xs font-semibold text-slate-700 font-mono">{doc.avgTime}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${
                      doc.status === 'Available' ? 'bg-emerald-500' :
                      doc.status.includes('Consultation') ? 'bg-purple-500 animate-pulse' : 'bg-amber-500'
                    }`} />
                    <span className="text-slate-700 font-medium">{doc.status}</span>
                  </div>
                  <button
                    onClick={() => showAlert(`Notified reception: Next token assigned to ${doc.name}`)}
                    className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition-colors"
                  >
                    Assign Next Token
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: BILLING & PRESCRIPTION SLIP */}
        {activeTab === 'billing' && (
          <div className="max-w-2xl mx-auto rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-5 mb-5">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">MediPulse OPD Slip & Invoice</h3>
                <p className="text-xs text-slate-500">Electronic Receipt • Tax Invoice #OPD-2026-0891</p>
              </div>
              <div className="text-right">
                <div className="text-xs font-mono text-slate-500">Date: Today</div>
                <div className="text-xs font-semibold text-emerald-600">Status: PAID</div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 mb-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <div className="text-slate-500 mb-0.5">Patient Name:</div>
                <div className="font-bold text-slate-900">Ramesh Sundaram (54y / Male)</div>
              </div>
              <div>
                <div className="text-slate-500 mb-0.5">Consultant:</div>
                <div className="font-bold text-slate-900">Dr. Rajesh Sharma (Cardiology)</div>
              </div>
              <div>
                <div className="text-slate-500 mb-0.5">Symptoms:</div>
                <div className="text-slate-700">Elevated BP & Mild Palpitation</div>
              </div>
              <div>
                <div className="text-slate-500 mb-0.5">Payment Mode:</div>
                <div className="text-slate-700">UPI / Digital QR</div>
              </div>
            </div>

            <div className="space-y-2.5 mb-6">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Fee Breakdown</div>
              <div className="flex justify-between text-xs text-slate-700 py-1 border-b border-slate-100">
                <span>Super-Specialist Consultation Fee</span>
                <span className="font-mono font-semibold">₹800.00</span>
              </div>
              <div className="flex justify-between text-xs text-slate-700 py-1 border-b border-slate-100">
                <span>Digital ECG & Vitals Screening</span>
                <span className="font-mono font-semibold">₹450.00</span>
              </div>
              <div className="flex justify-between text-xs text-slate-700 py-1 border-b border-slate-100">
                <span>Automated Blood Glucose Test</span>
                <span className="font-mono font-semibold">₹120.00</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-slate-900 pt-2">
                <span>Total Amount Paid</span>
                <span className="font-mono text-teal-700">₹1,370.00</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5">
              <button
                onClick={() => showAlert('✓ Print command sent to thermal receipt printer!')}
                className="flex-1 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-xs transition-all flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>Print OPD Receipt</span>
              </button>
              <button
                onClick={() => showAlert('✓ Prescription PDF generated & sent via WhatsApp to patient!')}
                className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
              >
                Share on WhatsApp
              </button>
            </div>
          </div>
        )}

      </main>

      {/* Add Walk-In Patient Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 max-w-md w-full shadow-2xl relative">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Add Walk-in OPD Patient</h3>
                <p className="text-xs text-slate-500">Generates immediate queue token</p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddPatient} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Patient Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sunil Mahapatra"
                  value={newPatient.name}
                  onChange={e => setNewPatient({ ...newPatient, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Age</label>
                  <input
                    type="number"
                    placeholder="35"
                    value={newPatient.age}
                    onChange={e => setNewPatient({ ...newPatient, age: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Gender</label>
                  <select
                    value={newPatient.gender}
                    onChange={e => setNewPatient({ ...newPatient, gender: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Department & Doctor</label>
                <select
                  value={newPatient.doctor}
                  onChange={e => {
                    const docName = e.target.value;
                    const docObj = doctors.find(d => d.name === docName);
                    setNewPatient({
                      ...newPatient,
                      doctor: docName,
                      department: docObj ? docObj.department : 'General Medicine'
                    });
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                >
                  {doctors.map(d => (
                    <option key={d.name} value={d.name}>
                      {d.name} ({d.department})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Chief Complaint / Symptoms</label>
                <input
                  type="text"
                  placeholder="e.g. Fever, cough for 3 days"
                  value={newPatient.symptoms}
                  onChange={e => setNewPatient({ ...newPatient, symptoms: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-xs"
                >
                  Issue Token & Register
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
