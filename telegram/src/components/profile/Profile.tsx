import React, { useState } from 'react';
import { useChat } from '../../context/ChatContext';
import { ArrowLeft, User as UserIcon, Camera } from 'lucide-react';

interface ProfileProps {
  onBack: () => void;
}

const Profile: React.FC<ProfileProps> = ({ onBack }) => {
  const { currentUser, updateProfile } = useChat();
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(currentUser.name);
  
  const handleSave = () => {
    updateProfile({
      ...currentUser,
      name
    });
    setEditMode(false);
  };
  
  return (
    <div className="h-full bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-3xl mx-auto">
          <div className="p-4 flex items-center">
            <button 
              onClick={onBack}
              className="mr-2 p-2 rounded-full hover:bg-gray-100 md:hidden"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Profile</h1>
          </div>
        </div>
      </div>
      
      <div className="max-w-3xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Profile header with avatar */}
          <div className="bg-[#2AABEE] h-32 relative">
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
              <div className="relative">
                {currentUser.avatar ? (
                  <img 
                    src={currentUser.avatar} 
                    alt={currentUser.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-white"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-white">
                    <UserIcon size={48} className="text-gray-500" />
                  </div>
                )}
                <button className="absolute bottom-2 right-2 p-2 bg-[#2AABEE] rounded-full text-white shadow-md hover:bg-[#1D9CD9] transition-colors">
                  <Camera size={18} />
                </button>
              </div>
            </div>
          </div>
          
          {/* Profile info */}
          <div className="pt-20 pb-6 px-6">
            {editMode ? (
              <div className="space-y-4">
                <div>
                  <label htmlFor="name\" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2AABEE] focus:border-transparent"
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-[#2AABEE] text-white rounded-md hover:bg-[#1D9CD9] transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setName(currentUser.name);
                      setEditMode(false);
                    }}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900">{currentUser.name}</h2>
                  <p className="text-sm text-gray-500">Online</p>
                </div>
                <button
                  onClick={() => setEditMode(true)}
                  className="w-full px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Settings/info sections */}
        <div className="mt-4 bg-white rounded-lg shadow-sm divide-y">
          <div className="p-4">
            <h3 className="font-medium text-gray-900">Username</h3>
            <p className="text-gray-500">@{currentUser.name.toLowerCase().replace(/\s+/g, '_')}</p>
          </div>
          <div className="p-4">
            <h3 className="font-medium text-gray-900">Bio</h3>
            <p className="text-gray-500">No bio yet</p>
          </div>
          <div className="p-4">
            <h3 className="font-medium text-gray-900 mb-1">Notifications</h3>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Message notifications</span>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input 
                  type="checkbox" 
                  id="toggle" 
                  defaultChecked 
                  className="sr-only peer"
                />
                <label
                  htmlFor="toggle"
                  className="block h-6 rounded-full overflow-hidden bg-gray-300 cursor-pointer peer-checked:bg-[#2AABEE]"
                >
                  <span className="absolute inset-y-0 left-0 w-6 h-6 bg-white rounded-full shadow transform transition-transform duration-300 ease-in-out peer-checked:translate-x-4"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;