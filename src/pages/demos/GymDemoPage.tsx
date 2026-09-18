import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Dumbbell,
  Users,
  CheckCircle2,
  Clock,
  Search,
  ArrowLeft,
  Calendar,
  IndianRupee,
  Activity,
  HeartPulse,
  GraduationCap,
  Sparkles,
  Phone,
  Flame,
  ShieldCheck,
  QrCode,
  AlertCircle,
  Zap,
  UserCheck,
  LogOut,
  Send
} from 'lucide-react';

interface GymMember {
  id: string;
  memberCode: string;
  name: string;
  phone: string;
  plan: 'VIP Tier' | 'Gold Tier' | 'Silver Tier';
  status: 'Active' | 'Expiring Soon' | 'Expired';
  expiryDate: string;
  daysRemaining: number;
  trainer: string;
  monthlyFee: number;
}

interface CheckInLog {
  id: string;
  memberCode: string;
  name: string;
  plan: string;
  checkInTime: string;
  lockerNo: string;
  trainer: string;
}

export const GymDemoPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'floor' | 'members' | 'classes'>('floor');
  const [searchQuery, setSearchQuery] = useState('');
  const [planFilter, setPlanFilter] = useState('All');
  const [selectedScanMember, setSelectedScanMember] = useState('M-101');
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  // Live floor capacity count
  const maxCapacity = 75;

  const [members, setMembers] = useState<GymMember[]>([
    {
      id: 'm-1',
      memberCode: 'M-101',
      name: 'Rohit Sharma',
      phone: '+91 98201 12345',
      plan: 'VIP Tier',
      status: 'Active',
      expiryDate: '2026-11-15',
      daysRemaining: 58,
      trainer: 'Coach Vikram (Personal)',
      monthlyFee: 4500
    },
    {
      id: 'm-2',
      memberCode: 'M-102',
      name: 'Pooja Hegde',
      phone: '+91 98450 67890',
      plan: 'Gold Tier',
      status: 'Active',
      expiryDate: '2026-10-20',
      daysRemaining: 32,
      trainer: 'Coach Priya (CrossFit)',
      monthlyFee: 2800
    },
    {
      id: 'm-3',
      memberCode: 'M-103',
      name: 'Arjun Das',
      phone: '+91 97113 44556',
      plan: 'VIP Tier',
      status: 'Expiring Soon',
      expiryDate: '2026-09-24',
      daysRemaining: 6,
      trainer: 'Coach Arjun (Strength)',
      monthlyFee: 4500
    },
    {
      id: 'm-4',
      memberCode: 'M-104',
      name: 'Simran Sethi',
      phone: '+91 99011 88776',
      plan: 'Silver Tier',
      status: 'Active',
      expiryDate: '2026-12-01',
      daysRemaining: 74,
      trainer: 'Floor General Trainer',
      monthlyFee: 1800
    },
    {
      id: 'm-5',
      memberCode: 'M-105',
      name: 'Kabir Singhania',
      phone: '+91 98100 22334',
      plan: 'Gold Tier',
      status: 'Expiring Soon',
      expiryDate: '2026-09-21',
      daysRemaining: 3,
      trainer: 'Coach Priya (CrossFit)',
      monthlyFee: 2800
    },
    {
      id: 'm-6',
      memberCode: 'M-106',
      name: 'Neha Choudhury',
      phone: '+91 91234 55667',
      plan: 'Silver Tier',
      status: 'Expired',
      expiryDate: '2026-09-10',
      daysRemaining: 0,
      trainer: 'Floor General Trainer',
      monthlyFee: 1800
    },
    {
      id: 'm-7',
      memberCode: 'M-107',
      name: 'Varun Grover',
      phone: '+91 94370 77889',
      plan: 'VIP Tier',
      status: 'Active',
      expiryDate: '2026-12-30',
      daysRemaining: 103,
      trainer: 'Coach Vikram (Personal)',
      monthlyFee: 4500
    }
  ]);

  // Live Check-in activity feed
  const [checkIns, setCheckIns] = useState<CheckInLog[]>([
    {
      id: 'log-1',
      memberCode: 'M-101',
      name: 'Rohit Sharma',
      plan: 'VIP Tier',
      checkInTime: '18:15',
      lockerNo: 'L-14',
      trainer: 'Coach Vikram'
    },
    {
      id: 'log-2',
      memberCode: 'M-102',
      name: 'Pooja Hegde',
      plan: 'Gold Tier',
      checkInTime: '18:24',
      lockerNo: 'L-08',
      trainer: 'Coach Priya'
    },
    {
      id: 'log-3',
      memberCode: 'M-104',
      name: 'Simran Sethi',
      plan: 'Silver Tier',
      checkInTime: '18:32',
      lockerNo: 'L-22',
      trainer: 'General Floor'
    },
    {
      id: 'log-4',
      memberCode: 'M-107',
      name: 'Varun Grover',
      plan: 'VIP Tier',
      checkInTime: '18:40',
      lockerNo: 'L-31',
      trainer: 'Coach Vikram'
    }
  ]);

  const showAlert = (msg: string) => {
    setAlertMessage(msg);
    setTimeout(() => setAlertMessage(null), 3500);
  };

  // Check In simulation
  const handleCheckIn = () => {
    const member = members.find(m => m.memberCode === selectedScanMember);
    if (!member) return;

    if (member.status === 'Expired') {
      showAlert(`⚠️ Access Denied: Membership for ${member.name} expired on ${member.expiryDate}. Please renew!`);
      return;
    }

    // Check if already checked in
    const alreadyIn = checkIns.some(c => c.memberCode === member.memberCode);
    if (alreadyIn) {
      showAlert(`Notice: ${member.name} is already checked in on the floor!`);
      return;
    }

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const lockerNum = `L-${Math.floor(Math.random() * 40 + 1).toString().padStart(2, '0')}`;

    const newLog: CheckInLog = {
      id: `log-${Date.now()}`,
      memberCode: member.memberCode,
      name: member.name,
      plan: member.plan,
      checkInTime: timeStr,
      lockerNo: lockerNum,
      trainer: member.trainer.split('(')[0].trim()
    };

    setCheckIns([newLog, ...checkIns]);
    showAlert(`✓ ACCESS GRANTED — ${member.name} (${member.plan}) checked in at ${timeStr} • Assigned Locker ${lockerNum}`);
  };

  // Member Check out
  const handleCheckOut = (logId: string) => {
    const entry = checkIns.find(c => c.id === logId);
    setCheckIns(prev => prev.filter(c => c.id !== logId));
    showAlert(`Checked out ${entry?.name || 'Member'}. Locker freed.`);
  };

  // Plan Renewal (+30 days)
  const renewMemberPlan = (id: string) => {
    setMembers(prev =>
      prev.map(m => {
        if (m.id === id) {
          const newDays = m.daysRemaining + 30;
          showAlert(`✓ Plan renewed for ${m.name}! Added 30 days. Status set to Active.`);
          return {
            ...m,
            daysRemaining: newDays,
            status: 'Active',
            expiryDate: '2026-10-31'
          };
        }
        return m;
      })
    );
  };

  // Current floor occupancy
  const currentOccupancy = checkIns.length + 34;
  const occupancyPercent = Math.round((currentOccupancy / maxCapacity) * 100);

  // Filtered members
  const filteredMembers = members.filter(m => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.memberCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.phone.includes(searchQuery);
    const matchesPlan = planFilter === 'All' || m.plan === planFilter;
    return matchesSearch && matchesPlan;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-orange-500/20 selection:text-orange-900 flex flex-col font-sans">
      
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
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-sm flex-shrink-0">
                <Dumbbell className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-slate-900">IronPulse Fitness</span>
                  <span className="px-2 py-0.5 rounded-full bg-orange-50 text-orange-700 border border-orange-200 text-[10px] font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-600 animate-pulse" />
                    LIVE
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 hidden md:block">Gym Front-Desk Check-In, Memberships & Floor Capacity</p>
              </div>
            </div>
          </div>

          {/* Quick Demo Switcher Tabs */}
          <div className="flex items-center justify-center sm:justify-end gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            <Link
              to="/demos/clinic"
              className="px-3 py-1 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-white transition-colors flex items-center gap-1.5 font-medium"
            >
              <HeartPulse className="w-3.5 h-3.5" />
              <span>Clinic</span>
            </Link>
            <Link
              to="/demos/school"
              className="px-3 py-1 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-white transition-colors flex items-center gap-1.5 font-medium"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>School</span>
            </Link>
            <span className="px-3 py-1 rounded-lg bg-orange-600 text-white font-semibold flex items-center gap-1.5 shadow-xs">
              <Dumbbell className="w-3.5 h-3.5" />
              <span>Gym</span>
            </span>
          </div>

        </div>
      </header>

      {/* Alert Notification Toast */}
      {alertMessage && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce border border-slate-700 max-w-sm">
          <Sparkles className="w-5 h-5 text-orange-400 flex-shrink-0" />
          <span className="text-xs sm:text-sm font-medium">{alertMessage}</span>
        </div>
      )}

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8">
        
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          
          <div className="rounded-2xl bg-white border border-slate-200 p-4 sm:p-5 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500">Floor Occupancy</span>
              <div className="p-2 rounded-xl bg-orange-50 text-orange-600 border border-orange-100">
                <Flame className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-0.5">
              {currentOccupancy} <span className="text-xs text-slate-400 font-normal">/ {maxCapacity} max</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-2">
              <div
                className="bg-gradient-to-r from-emerald-500 via-amber-500 to-orange-600 h-full"
                style={{ width: `${occupancyPercent}%` }}
              />
            </div>
            <div className="text-[10px] text-slate-500 mt-1">{occupancyPercent}% in use right now</div>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 p-4 sm:p-5 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500">Active Members</span>
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-0.5">480</div>
            <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
              <span>↑ +28 new</span>
              <span className="text-slate-400 font-normal">this month</span>
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 p-4 sm:p-5 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500">Expiring in 7 Days</span>
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 mb-0.5">14</div>
            <div className="text-[11px] text-slate-500">
              Renewal SMS triggered
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 p-4 sm:p-5 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500">Monthly Subscriptions</span>
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                <IndianRupee className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-0.5">₹3,85,000</div>
            <div className="text-[11px] text-emerald-600 font-medium">
              88% renewal retention
            </div>
          </div>

        </div>

        {/* Front-Desk Quick Check-In Station */}
        <div className="bg-white rounded-2xl border border-orange-200 p-5 sm:p-6 mb-6 sm:mb-8 shadow-xs">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 sm:gap-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-orange-50 border border-orange-100 text-orange-600 flex-shrink-0">
                <QrCode className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">Front-Desk Access Control Scanner</h3>
                <p className="text-xs text-slate-500">Select a member or simulate RFID turnstile scan to record real-time floor entry</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full lg:w-auto">
              <select
                value={selectedScanMember}
                onChange={e => setSelectedScanMember(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              >
                {members.map(m => (
                  <option key={m.id} value={m.memberCode}>
                    {m.memberCode} — {m.name} ({m.plan} • {m.status})
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={handleCheckIn}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold shadow-xs transition-all flex-shrink-0"
              >
                <Zap className="w-4 h-4" />
                <span>Simulate Scan & Check In</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl border border-slate-200 overflow-x-auto w-full sm:w-auto mb-6">
          <button
            onClick={() => setActiveTab('floor')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'floor'
                ? 'bg-white text-orange-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Live Floor Check-In Feed ({checkIns.length})
          </button>
          <button
            onClick={() => setActiveTab('members')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'members'
                ? 'bg-white text-orange-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Members & Subscriptions
          </button>
          <button
            onClick={() => setActiveTab('classes')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'classes'
                ? 'bg-white text-orange-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Trainer Shifts & Classes
          </button>
        </div>

        {/* TAB 1: LIVE FLOOR FEED */}
        {activeTab === 'floor' && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Active Floor Sessions</h3>
                <p className="text-xs text-slate-500">Live RFID & biometric turnstile entry log</p>
              </div>
              <div className="text-xs text-emerald-700 font-mono flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Turnstile Online</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[620px]">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-[11px] uppercase tracking-wider border-b border-slate-200">
                    <th className="py-3 px-4 font-semibold">Member ID</th>
                    <th className="py-3 px-4 font-semibold">Member Name</th>
                    <th className="py-3 px-4 font-semibold">Plan Tier</th>
                    <th className="py-3 px-4 font-semibold">Check-In Time</th>
                    <th className="py-3 px-4 font-semibold">Locker</th>
                    <th className="py-3 px-4 font-semibold">Trainer</th>
                    <th className="py-3 px-4 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {checkIns.map(item => (
                    <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-800">{item.memberCode}</td>
                      <td className="py-3.5 px-4 font-semibold text-slate-900">{item.name}</td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            item.plan === 'VIP Tier'
                              ? 'bg-purple-100 text-purple-700'
                              : item.plan === 'Gold Tier'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {item.plan}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-emerald-700 font-mono font-semibold flex items-center gap-1">
                        <Clock className="w-3 h-3 text-emerald-600" />
                        <span>{item.checkInTime}</span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-700">{item.lockerNo}</td>
                      <td className="py-3.5 px-4 text-slate-500">{item.trainer}</td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => handleCheckOut(item.id)}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors text-[11px] font-semibold"
                        >
                          <LogOut className="w-3 h-3" />
                          <span>Check Out</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: MEMBER DIRECTORY & SUBSCRIPTIONS */}
        {activeTab === 'members' && (
          <div className="space-y-4">
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search member, ID, or phone..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                {['All', 'VIP Tier', 'Gold Tier', 'Silver Tier'].map(plan => (
                  <button
                    key={plan}
                    onClick={() => setPlanFilter(plan)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                      planFilter === plan
                        ? 'bg-slate-800 text-white'
                        : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
                    }`}
                  >
                    {plan}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[620px]">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-[11px] uppercase tracking-wider border-b border-slate-200">
                      <th className="py-3 px-4 font-semibold">ID</th>
                      <th className="py-3 px-4 font-semibold">Member Name</th>
                      <th className="py-3 px-4 font-semibold">Plan Tier</th>
                      <th className="py-3 px-4 font-semibold">Expiry Date</th>
                      <th className="py-3 px-4 font-semibold">Days Left</th>
                      <th className="py-3 px-4 font-semibold">Status</th>
                      <th className="py-3 px-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {filteredMembers.map(m => (
                      <tr key={m.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-slate-800">{m.memberCode}</td>
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-slate-900">{m.name}</div>
                          <div className="text-[11px] text-slate-400 font-mono">{m.phone}</div>
                        </td>
                        <td className="py-3.5 px-4 text-slate-700">{m.plan}</td>
                        <td className="py-3.5 px-4 font-mono text-slate-500">{m.expiryDate}</td>
                        <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                          {m.daysRemaining} days
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-block text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${
                              m.status === 'Active'
                                ? 'bg-emerald-100 text-emerald-700'
                                : m.status === 'Expiring Soon'
                                ? 'bg-amber-100 text-amber-700 font-bold'
                                : 'bg-rose-100 text-rose-700'
                            }`}
                          >
                            {m.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="inline-flex items-center gap-2">
                            <button
                              onClick={() => renewMemberPlan(m.id)}
                              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold transition-colors"
                            >
                              Renew +30d
                            </button>
                            <button
                              onClick={() => showAlert(`Dispatched renewal link & discount voucher to ${m.phone} via WhatsApp`)}
                              className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
                              title="Send WhatsApp Reminder"
                            >
                              <Send className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: CLASSES & TRAINER SCHEDULE */}
        {activeTab === 'classes' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {[
              {
                title: 'Morning HIIT Blast',
                time: '06:30 AM – 07:30 AM',
                trainer: 'Coach Vikram',
                capacity: '18 / 20 Booked',
                intensity: 'High Intensity',
                badgeColor: 'text-rose-700 bg-rose-50 border-rose-200'
              },
              {
                title: 'Powerlifting & Form Clinic',
                time: '08:00 AM – 09:15 AM',
                trainer: 'Coach Arjun',
                capacity: '12 / 15 Booked',
                intensity: 'Strength & Core',
                badgeColor: 'text-amber-700 bg-amber-50 border-amber-200'
              },
              {
                title: 'CrossFit WOD Endurance',
                time: '06:00 PM – 07:00 PM',
                trainer: 'Coach Priya',
                capacity: '24 / 25 Booked',
                intensity: 'Peak Cardio',
                badgeColor: 'text-orange-700 bg-orange-50 border-orange-200'
              },
              {
                title: 'Mobility, Recovery & Yoga',
                time: '07:30 PM – 08:30 PM',
                trainer: 'Coach Sneha',
                capacity: '16 / 20 Booked',
                intensity: 'Low Impact',
                badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200'
              }
            ].map((cls, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-slate-200 p-5 shadow-xs hover:border-orange-300 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border mb-2 inline-block ${cls.badgeColor}`}>
                      {cls.intensity}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">{cls.title}</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{cls.time}</span>
                    </p>
                  </div>
                  <div className="p-3 rounded-2xl bg-orange-50 text-orange-600">
                    <Dumbbell className="w-5 h-5" />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-100">
                  <div>
                    <span className="text-slate-400">Trainer:</span> <strong className="text-slate-800">{cls.trainer}</strong>
                  </div>
                  <div className="font-mono text-orange-700 font-semibold">
                    {cls.capacity}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </main>

    </div>
  );
};
