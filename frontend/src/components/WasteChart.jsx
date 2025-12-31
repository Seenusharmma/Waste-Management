import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const dataPie = [
  { name: 'Wet Waste', value: 45, color: '#10b981' },
  { name: 'Dry Waste', value: 55, color: '#3b82f6' },
];

const dataBar = [
  { name: 'Mon', wet: 12, dry: 18 },
  { name: 'Tue', wet: 15, dry: 22 },
  { name: 'Wed', wet: 8, dry: 25 },
  { name: 'Thu', wet: 20, dry: 15 },
  { name: 'Fri', wet: 18, dry: 28 },
  { name: 'Sat', wet: 25, dry: 20 },
  { name: 'Sun', wet: 10, dry: 12 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-700 p-3 rounded-lg shadow-xl">
        <p className="font-bold text-white mb-1">{label}</p>
        {payload.map((entry, index) => (
             <p key={index} style={{ color: entry.color }}>
                {entry.name}: {entry.value}kg
             </p>
        ))}
      </div>
    );
  }
  return null;
};

const WasteChart = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full max-w-5xl mt-6 md:mt-8">
        {/* Pie Chart */}
        <div className="bg-slate-800/60 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-2xl flex flex-col items-center w-full">
            <h3 className="text-xl font-bold mb-4 text-slate-200">Waste Composition</h3>
            <div className="w-full h-48 md:h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={dataPie}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                        >
                        {dataPie.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" height={36}/>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-slate-800/60 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-2xl flex flex-col items-center w-full">
            <h3 className="text-xl font-bold mb-4 text-slate-200">Weekly Trends</h3>
            <div className="w-full h-48 md:h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dataBar} margin={{top: 10, right: 10, left: -20, bottom: 0}}>
                         <XAxis 
                            dataKey="name" 
                            stroke="#94a3b8" 
                            fontSize={12} 
                            tickLine={false} 
                            axisLine={false}
                         />
                         <YAxis 
                            stroke="#94a3b8" 
                            fontSize={12} 
                            tickLine={false} 
                            axisLine={false}
                         />
                         <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(255,255,255,0.05)'}} />
                         <Legend />
                         <Bar dataKey="wet" name="Wet (kg)" fill="#10b981" radius={[4, 4, 0, 0]} barSize={12} />
                         <Bar dataKey="dry" name="Dry (kg)" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={12} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    </div>
  );
};

export default WasteChart;
