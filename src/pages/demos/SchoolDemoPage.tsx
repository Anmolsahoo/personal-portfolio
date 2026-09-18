import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  ArrowLeft,
  Calendar,
  IndianRupee,
  Activity,
  HeartPulse,
  Dumbbell,
  Sparkles,
  Phone,
  BookOpen,
  Award,
  AlertTriangle,
  Send,
  UserCheck
} from 'lucide-react';

interface Student {
  id: string;
  rollNo: string;
  name: string;
  gender: 'M' | 'F';
  parentName: string;
  parentPhone: string;
  class: string;
  overallAttendance: number;
  todayStatus: 'P' | 'A' | 'L';
  feeStatus: 'Paid' | 'Pending' | 'Overdue';
  feeAmount: number;
}

export const SchoolDemoPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'attendance' | 'students' | 'exams'>('attendance');
  const [selectedClass, setSelectedClass] = useState<string>('Class 10-A');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [feeFilter, setFeeFilter] = useState<string>('All');
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  // Initial student roster
  const [students, setStudents] = useState<Student[]>([
    {
      id: 's-1',
      rollNo: '1001',
      name: 'Aarav Patel',
      gender: 'M',
      parentName: 'Sanjay Patel',
      parentPhone: '+91 98210 99421',
      class: 'Class 10-A',
      overallAttendance: 96,
      todayStatus: 'P',
      feeStatus: 'Paid',
      feeAmount: 18500
    },
    {
      id: 's-2',
      rollNo: '1002',
      name: 'Aditi Mohanty',
      gender: 'F',
      parentName: 'Debashish Mohanty',
      parentPhone: '+91 94370 12345',
      class: 'Class 10-A',
      overallAttendance: 98,
      todayStatus: 'P',
      feeStatus: 'Paid',
      feeAmount: 18500
    },
    {
      id: 's-3',
      rollNo: '1003',
      name: 'Bhavya Sharma',
      gender: 'F',
      parentName: 'Rajendra Sharma',
      parentPhone: '+91 97112 88401',
      class: 'Class 10-A',
      overallAttendance: 84,
      todayStatus: 'A',
      feeStatus: 'Pending',
      feeAmount: 18500
    },
    {
      id: 's-4',
      rollNo: '1004',
      name: 'Chirag Senapati',
      gender: 'M',
      parentName: 'Manoj Senapati',
      parentPhone: '+91 98610 54321',
      class: 'Class 10-A',
      overallAttendance: 92,
      todayStatus: 'P',
      feeStatus: 'Paid',
      feeAmount: 18500
    },
    {
      id: 's-5',
      rollNo: '1005',
      name: 'Divya Nanda',
      gender: 'F',
      parentName: 'Kishore Nanda',
      parentPhone: '+91 94391 76543',
      class: 'Class 10-A',
      overallAttendance: 91,
      todayStatus: 'L',
      feeStatus: 'Paid',
      feeAmount: 18500
    },
    {
      id: 's-6',
      rollNo: '1006',
      name: 'Ishaan Verma',
      gender: 'M',
      parentName: 'Vikram Verma',
      parentPhone: '+91 98110 33411',
      class: 'Class 10-A',
      overallAttendance: 78,
      todayStatus: 'A',
      feeStatus: 'Overdue',
      feeAmount: 18500
    },
    {
      id: 's-7',
      rollNo: '1007',
      name: 'Meera Kulkarni',
      gender: 'F',
      parentName: 'Anand Kulkarni',
      parentPhone: '+91 98200 45678',
      class: 'Class 10-A',
      overallAttendance: 99,
      todayStatus: 'P',
      feeStatus: 'Paid',
      feeAmount: 18500
    },
    {
      id: 's-8',
      rollNo: '1008',
      name: 'Nikhil Samal',
      gender: 'M',
      parentName: 'Pradeep Samal',
      parentPhone: '+91 99370 88990',
      class: 'Class 10-A',
      overallAttendance: 89,
      todayStatus: 'P',
      feeStatus: 'Pending',
      feeAmount: 18500
    },
    {
      id: 's-9',
      rollNo: '1009',
      name: 'Prisha Das',
      gender: 'F',
      parentName: 'Alok Das',
      parentPhone: '+91 94380 99887',
      class: 'Class 10-A',
      overallAttendance: 95,
      todayStatus: 'P',
      feeStatus: 'Paid',
      feeAmount: 18500
    },
    {
      id: 's-10',
      rollNo: '1010',
      name: 'Rohan Banerjee',
      gender: 'M',
      parentName: 'Subir Banerjee',
      parentPhone: '+91 98300 11223',
      class: 'Class 10-A',
      overallAttendance: 93,
      todayStatus: 'P',
      feeStatus: 'Paid',
      feeAmount: 18500
    },
    // Class 10-B samples
    {
      id: 's-11',
      rollNo: '2001',
      name: 'Aryan Mishra',
      gender: 'M',
      parentName: 'Santosh Mishra',
      parentPhone: '+91 94371 66554',
      class: 'Class 10-B',
      overallAttendance: 94,
      todayStatus: 'P',
      feeStatus: 'Paid',
      feeAmount: 18500
    },
    {
      id: 's-12',
      rollNo: '2002',
      name: 'Diya Rath',
      gender: 'F',
      parentName: 'Bijay Rath',
      parentPhone: '+91 98611 22334',
      class: 'Class 10-B',
      overallAttendance: 90,
      todayStatus: 'P',
      feeStatus: 'Paid',
      feeAmount: 18500
    },
    {
      id: 's-13',
      rollNo: '2003',
      name: 'Harshvardhan Jena',
      gender: 'M',
      parentName: 'Tapan Jena',
      parentPhone: '+91 99372 44332',
      class: 'Class 10-B',
      overallAttendance: 82,
      todayStatus: 'A',
      feeStatus: 'Pending',
      feeAmount: 18500
    }
  ]);

  const showAlert = (msg: string) => {
    setAlertMessage(msg);
    setTimeout(() => setAlertMessage(null), 3500);
  };

  // Change individual attendance
  const setAttendance = (id: string, status: 'P' | 'A' | 'L') => {
    setStudents(prev =>
      prev.map(s => (s.id === id ? { ...s, todayStatus: status } : s))
    );
    const st = students.find(s => s.id === id);
    const label = status === 'P' ? 'Present' : status === 'A' ? 'Absent' : 'Late';
    showAlert(`Marked ${st?.name || 'Student'} as ${label}`);
  };

  // Mark all present for selected class
  const markAllClassPresent = () => {
    setStudents(prev =>
      prev.map(s => (s.class === selectedClass ? { ...s, todayStatus: 'P' } : s))
    );
    showAlert(`All students in ${selectedClass} marked Present!`);
  };

  // Toggle Fee
  const toggleFeeStatus = (id: string) => {
    setStudents(prev =>
      prev.map(s => {
        if (s.id === id) {
          const nextStatus = s.feeStatus === 'Paid' ? 'Pending' : 'Paid';
          showAlert(`Fee status for ${s.name} updated to "${nextStatus}"`);
          return { ...s, feeStatus: nextStatus };
        }
        return s;
      })
    );
  };

  // Class specific data
  const classStudents = students.filter(s => s.class === selectedClass);
  const totalClass = classStudents.length;
  const presentCount = classStudents.filter(s => s.todayStatus === 'P').length;
  const absentCount = classStudents.filter(s => s.todayStatus === 'A').length;
  const lateCount = classStudents.filter(s => s.todayStatus === 'L').length;
  const classRate = totalClass > 0 ? Math.round(((presentCount + lateCount * 0.5) / totalClass) * 100) : 0;

  // Filtered students for roster
  const filteredStudents = students.filter(s => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.rollNo.includes(searchQuery) ||
      s.parentPhone.includes(searchQuery);
    const matchesFee = feeFilter === 'All' || s.feeStatus === feeFilter;
    return matchesSearch && matchesFee;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-blue-500/20 selection:text-blue-900 flex flex-col font-sans">
      
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
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm flex-shrink-0">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-slate-900">EduTrack Pro</span>
                  <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                    LIVE
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 hidden md:block">School Attendance, Student Records & Academics Suite</p>
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
            <span className="px-3 py-1 rounded-lg bg-blue-600 text-white font-semibold flex items-center gap-1.5 shadow-xs">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>School</span>
            </span>
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
          <Sparkles className="w-5 h-5 text-blue-400 flex-shrink-0" />
          <span className="text-xs sm:text-sm font-medium">{alertMessage}</span>
        </div>
      )}

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8">
        
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          
          <div className="rounded-2xl bg-white border border-slate-200 p-4 sm:p-5 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500">Total Enrolled</span>
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-0.5">1,240</div>
            <div className="text-[11px] text-blue-600 font-medium">
              36 Sections • K-12
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 p-4 sm:p-5 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500">Today's Class Rate</span>
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                <UserCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 mb-0.5">{classRate}%</div>
            <div className="text-[11px] text-slate-500">
              {presentCount} Present / {totalClass} Total
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 p-4 sm:p-5 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500">Absent / Late</span>
              <div className="p-2 rounded-xl bg-rose-50 text-rose-600 border border-rose-100">
                <AlertTriangle className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-rose-600 mb-0.5">
              {absentCount} <span className="text-xs font-normal text-slate-400">absent</span> / {lateCount} <span className="text-xs font-normal text-slate-400">late</span>
            </div>
            <div className="text-[11px] text-slate-500">
              Automated SMS queued
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 p-4 sm:p-5 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500">Term-2 Fee Status</span>
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
                <IndianRupee className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-0.5">91.4%</div>
            <div className="text-[11px] text-emerald-600 font-medium">
              ₹22.4L collected this month
            </div>
          </div>

        </div>

        {/* Tab Selector */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl border border-slate-200 overflow-x-auto">
            <button
              onClick={() => setActiveTab('attendance')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'attendance'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Daily Roll Call
            </button>
            <button
              onClick={() => setActiveTab('students')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'students'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Student Directory & Fees
            </button>
            <button
              onClick={() => setActiveTab('exams')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'exams'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Exams & Grades Report
            </button>
          </div>

          {activeTab === 'attendance' && (
            <button
              onClick={markAllClassPresent}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold border border-slate-200 shadow-xs transition-all"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Mark All Present</span>
            </button>
          )}
        </div>

        {/* TAB 1: DAILY ATTENDANCE REGISTER */}
        {activeTab === 'attendance' && (
          <div className="space-y-4 sm:space-y-6">
            
            {/* Class Switcher & Class Overview */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                {['Class 10-A', 'Class 10-B', 'Class 9-A', 'Class 8-A'].map(cls => (
                  <button
                    key={cls}
                    onClick={() => setSelectedClass(cls)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedClass === cls
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
                    }`}
                  >
                    {cls}
                  </button>
                ))}
              </div>

              {/* Class Live Counter Pill */}
              <div className="flex flex-wrap items-center gap-2.5 text-xs">
                <span className="text-slate-500">Roll: <strong className="text-slate-900">{totalClass}</strong></span>
                <span className="text-emerald-700 font-medium">Present: <strong>{presentCount}</strong></span>
                <span className="text-rose-700 font-medium">Absent: <strong>{absentCount}</strong></span>
                <span className="text-amber-700 font-medium">Late: <strong>{lateCount}</strong></span>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono font-bold">
                  {classRate}% Rate
                </span>
              </div>
            </div>

            {/* Attendance Roster Table */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Daily Roll Call — {selectedClass}</h3>
                  <p className="text-xs text-slate-500">Tap [P], [A], or [L] to update student attendance live</p>
                </div>
                <div className="text-xs font-mono text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Today</span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[620px]">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-[11px] uppercase tracking-wider border-b border-slate-200">
                      <th className="py-3 px-4 font-semibold">Roll No</th>
                      <th className="py-3 px-4 font-semibold">Student Name</th>
                      <th className="py-3 px-4 font-semibold">Parent Contact</th>
                      <th className="py-3 px-4 font-semibold">Annual Rate</th>
                      <th className="py-3 px-4 font-semibold text-center">Attendance Toggle</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {classStudents.map(student => (
                      <tr key={student.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                          #{student.rollNo}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-slate-900">{student.name}</div>
                          <div className="text-[11px] text-slate-500">Gender: {student.gender === 'M' ? 'Male' : 'Female'}</div>
                        </td>
                        <td className="py-3.5 px-4 text-slate-600">
                          <div>{student.parentName}</div>
                          <div className="text-[11px] text-slate-400 font-mono">{student.parentPhone}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-semibold text-slate-800">{student.overallAttendance}%</span>
                            <div className="w-16 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  student.overallAttendance >= 90
                                    ? 'bg-emerald-500'
                                    : student.overallAttendance >= 80
                                    ? 'bg-amber-500'
                                    : 'bg-rose-500'
                                }`}
                                style={{ width: `${student.overallAttendance}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          {/* 3 Clickable Toggle Buttons */}
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => setAttendance(student.id, 'P')}
                              className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all ${
                                student.todayStatus === 'P'
                                  ? 'bg-emerald-600 text-white shadow-xs scale-105'
                                  : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200'
                              }`}
                            >
                              P
                            </button>
                            <button
                              type="button"
                              onClick={() => setAttendance(student.id, 'A')}
                              className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all ${
                                student.todayStatus === 'A'
                                  ? 'bg-rose-600 text-white shadow-xs scale-105'
                                  : 'bg-slate-100 text-slate-600 hover:bg-rose-50 hover:text-rose-700 border border-slate-200'
                              }`}
                            >
                              A
                            </button>
                            <button
                              type="button"
                              onClick={() => setAttendance(student.id, 'L')}
                              className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all ${
                                student.todayStatus === 'L'
                                  ? 'bg-amber-500 text-slate-950 font-black shadow-xs scale-105'
                                  : 'bg-slate-100 text-slate-600 hover:bg-amber-50 hover:text-amber-700 border border-slate-200'
                              }`}
                            >
                              L
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

        {/* TAB 2: STUDENT DIRECTORY & FEES */}
        {activeTab === 'students' && (
          <div className="space-y-4">
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search student, roll number, phone..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                {['All', 'Paid', 'Pending', 'Overdue'].map(status => (
                  <button
                    key={status}
                    onClick={() => setFeeFilter(status)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                      feeFilter === status
                        ? 'bg-slate-800 text-white'
                        : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[620px]">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-[11px] uppercase tracking-wider border-b border-slate-200">
                      <th className="py-3 px-4 font-semibold">Roll No</th>
                      <th className="py-3 px-4 font-semibold">Student Name</th>
                      <th className="py-3 px-4 font-semibold">Class</th>
                      <th className="py-3 px-4 font-semibold">Term-2 Tuition Fee</th>
                      <th className="py-3 px-4 font-semibold">Fee Status</th>
                      <th className="py-3 px-4 font-semibold text-right">Quick Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {filteredStudents.map(s => (
                      <tr key={s.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-slate-800">#{s.rollNo}</td>
                        <td className="py-3.5 px-4 font-semibold text-slate-900">{s.name}</td>
                        <td className="py-3.5 px-4 text-slate-500">{s.class}</td>
                        <td className="py-3.5 px-4 font-mono font-semibold text-slate-800">
                          ₹{s.feeAmount.toLocaleString('en-IN')}
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-block text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${
                              s.feeStatus === 'Paid'
                                ? 'bg-emerald-100 text-emerald-700'
                                : s.feeStatus === 'Pending'
                                ? 'bg-amber-100 text-amber-700'
                                : 'bg-rose-100 text-rose-700'
                            }`}
                          >
                            {s.feeStatus}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="inline-flex items-center gap-2">
                            <button
                              onClick={() => toggleFeeStatus(s.id)}
                              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold transition-colors"
                            >
                              Toggle Paid
                            </button>
                            <button
                              onClick={() => showAlert(`WhatsApp fee reminder dispatched to ${s.parentPhone}`)}
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

        {/* TAB 3: EXAMS & GRADES REPORT */}
        {activeTab === 'exams' && (
          <div className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-xs">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-5 h-5 text-amber-500" />
                  <h4 className="text-base font-bold text-slate-900">Class Top Performers</h4>
                </div>
                <div className="space-y-2.5">
                  {[
                    { name: 'Meera Kulkarni', score: '98.6%', rank: 'Rank 1' },
                    { name: 'Aditi Mohanty', score: '97.2%', rank: 'Rank 2' },
                    { name: 'Aarav Patel', score: '95.4%', rank: 'Rank 3' },
                    { name: 'Prisha Das', score: '94.8%', rank: 'Rank 4' },
                  ].map((top, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 text-xs">
                      <div>
                        <div className="font-bold text-slate-900">{top.name}</div>
                        <div className="text-[10px] text-slate-500">{top.rank}</div>
                      </div>
                      <div className="font-mono font-bold text-blue-700">{top.score}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-xs md:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  <h4 className="text-base font-bold text-slate-900">Subject Average Scores (Term-1 Examinations)</h4>
                </div>
                <div className="space-y-3.5">
                  {[
                    { subject: 'Mathematics', avg: 86, passRate: '98%' },
                    { subject: 'Physics & Science', avg: 82, passRate: '94%' },
                    { subject: 'English Language & Lit', avg: 91, passRate: '100%' },
                    { subject: 'Computer Applications & Coding', avg: 94, passRate: '100%' },
                    { subject: 'Social Studies', avg: 80, passRate: '93%' },
                  ].map((sub, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-semibold text-slate-800">{sub.subject}</span>
                        <span className="font-mono text-slate-500">Class Avg: <strong className="text-emerald-600">{sub.avg}%</strong> (Pass: {sub.passRate})</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                          style={{ width: `${sub.avg}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

    </div>
  );
};
