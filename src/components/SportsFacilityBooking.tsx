import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import sportsMapImage from '@/assets/sports-facility-map.jpg';

const SportsFacilityBooking = () => {
  const [activeTab, setActiveTab] = useState('Baby Pool');

  const currentDate = new Date();
  const dateString = currentDate.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  const timeString = currentDate.toLocaleTimeString('en-US', { 
    hour12: true, 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  const sports = [
    'Baby Pool', 'Badminton', 'Basketball', 'Cricket', 'Football', 
    'Hockey', 'Squash', 'Swimming Pool', 'Table Tennis', 'Volleyball'
  ];

  const timeSlots = [
    '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM',
    '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM'
  ];

  const facilityMarkers = [
    { id: 1, x: 25, y: 35, status: 'available' },
    { id: 2, x: 45, y: 25, status: 'booked' },
    { id: 3, x: 65, y: 30, status: 'available' },
    { id: 4, x: 35, y: 60, status: 'closed' },
    { id: 5, x: 75, y: 45, status: 'available' },
    { id: 6, x: 15, y: 70, status: 'available' },
    { id: 7, x: 85, y: 65, status: 'booked' },
    { id: 8, x: 55, y: 75, status: 'available' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-status-available';
      case 'booked': return 'bg-status-booked';
      case 'closed': return 'bg-status-closed';
      default: return 'bg-muted';
    }
  };

  const getStatusText = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-2xl">🐻</span>
          </div>
          <h1 className="text-3xl font-bold text-primary">Sports Facility Booking Status</h1>
        </div>
        <div className="flex flex-col items-end">
          <div className="bg-secondary px-4 py-2 rounded-lg mb-2">
            <span className="text-secondary-foreground font-medium">{dateString}</span>
          </div>
          <div className="bg-secondary px-4 py-2 rounded-lg">
            <span className="text-secondary-foreground font-medium">{timeString}</span>
          </div>
        </div>
      </div>

      {/* Sport Category Tabs */}
      <div className="flex flex-wrap gap-3 mb-8">
        {sports.map((sport) => (
          <Button
            key={sport}
            variant={activeTab === sport ? "default" : "secondary"}
            onClick={() => setActiveTab(sport)}
            className={`px-6 py-2 transition-all duration-200 ${
              activeTab === sport 
                ? 'bg-sport-tab-active text-background hover:bg-sport-tab-active/90' 
                : 'bg-sport-tab text-foreground hover:bg-sport-tab/80'
            }`}
          >
            {sport}
          </Button>
        ))}
      </div>

      {/* Map Section */}
      <Card className="mb-8 bg-map-bg border-border">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-primary mb-6 text-center">
            IITB Sports Facilities Map
          </h2>
          <div className="relative mx-auto max-w-4xl">
            <img 
              src={sportsMapImage} 
              alt="Sports Facilities Map" 
              className="w-full h-auto rounded-lg"
            />
            {/* Facility Markers */}
            {facilityMarkers.map((marker) => (
              <div
                key={marker.id}
                className={`absolute w-6 h-6 rounded-full border-2 border-white shadow-lg cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-110 ${getStatusColor(marker.status)}`}
                style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
                title={`Facility ${marker.id} - ${getStatusText(marker.status)}`}
              />
            ))}
          </div>
        </div>
      </Card>

      {/* Legend */}
      <div className="flex justify-center gap-8 mb-8">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-status-available rounded-full"></div>
          <span className="text-sm font-medium">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-status-booked rounded-full"></div>
          <span className="text-sm font-medium">Booked</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-status-closed rounded-full"></div>
          <span className="text-sm font-medium">Closed</span>
        </div>
      </div>

      {/* Time Slot Table */}
      <Card className="bg-card">
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 bg-sport-tab text-foreground font-medium rounded-tl-lg">
                    Court / Time
                  </th>
                  {timeSlots.map((time) => (
                    <th key={time} className="p-3 bg-sport-tab text-foreground font-medium text-center min-w-16">
                      <div className="text-xs">{time.split(' ')[0]}</div>
                      <div className="text-xs">{time.split(' ')[1]}</div>
                    </th>
                  ))}
                  <th className="p-3 bg-sport-tab text-foreground font-medium text-center rounded-tr-lg">
                    10:00<br/>PM
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border hover:bg-secondary/30 transition-colors">
                  <td className="p-3 font-medium text-foreground bg-sport-tab">
                    {activeTab} Court 1
                  </td>
                  {timeSlots.map((time, index) => (
                    <td key={time} className="p-3 text-center">
                      <div className={`w-8 h-8 mx-auto rounded flex items-center justify-center font-bold text-sm transition-colors cursor-pointer hover:scale-105 ${
                        index % 3 === 0 ? 'bg-status-available text-white' : 
                        index % 5 === 0 ? 'bg-status-booked text-white' : 
                        'bg-status-available text-white'
                      }`}>
                        A
                      </div>
                    </td>
                  ))}
                  <td className="p-3 text-center">
                    <div className="w-8 h-8 mx-auto rounded bg-status-available text-white flex items-center justify-center font-bold text-sm cursor-pointer hover:scale-105 transition-transform">
                      A
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SportsFacilityBooking;