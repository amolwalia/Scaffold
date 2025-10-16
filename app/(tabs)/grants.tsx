import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Grant from '../../components/grant';

interface GrantData {
  id: string;
  title: string;
  organization: string;
  amount: string;
  deadline: string;
  category: string;
  description: string;
  eligible?: boolean;
}

const sampleGrants: GrantData[] = [
  {
    id: '1',
    title: 'StrongerBC Future Skills Grant',
    organization: 'WorkBC',
    amount: 'Up to $3,500',
    deadline: '7/14 - 8/20',
    category: 'Education',
    description: 'Funding for skills training and professional development programs.',
    eligible: true
  },
  {
    id: '2',
    title: 'Youth Work in Trades (WRK) Scholarship',
    organization: 'WorkBC',
    amount: 'Up to $1,000',
    deadline: '9/2 - 11/14',
    category: 'Education',
    description: 'Scholarship for youth pursuing trades education and apprenticeship programs.',
    eligible: true
  },
  {
    id: '3',
    title: 'LNG Canada Trades Training Fund',
    organization: 'BC Ca',
    amount: 'Up to $1,300',
    deadline: '2/28',
    category: 'Training',
    description: 'Training fund for LNG-related trades and skills development.',
    eligible: true
  },
  {
    id: '4',
    title: 'Masonry Institute of BC Training Fund',
    organization: 'Masonry Institute',
    amount: 'Up to $1,950',
    deadline: '3m before training starts',
    category: 'Training',
    description: 'Training fund for masonry and construction skills development.',
    eligible: true
  },
  {
    id: '5',
    title: 'Soroptimist - Live your dream awards',
    organization: 'Soroptimist',
    amount: 'Up to $10,000',
    deadline: '8/1 - 11/14',
    category: 'Awards',
    description: 'Awards for women pursuing education and career goals.',
    eligible: false
  }
];

export default function GrantsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('All');
  
  const tabs = ['All', 'Suggested', 'My Grants'];
  
  const filteredGrants = sampleGrants.filter(grant => {
    const matchesSearch = grant.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         grant.organization.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedTab === 'Suggested') {
      return matchesSearch && grant.eligible;
    } else if (selectedTab === 'My Grants') {
      // For demo purposes, show all grants as "My Grants"
      return matchesSearch;
    } else {
      return matchesSearch;
    }
  });

  const handleGrantPress = (grant: GrantData) => {
    console.log('Grant pressed:', grant.title);
    // Add navigation to grant details here
  };

  const handleApplyPress = (grant: GrantData) => {
    console.log('Apply pressed for:', grant.title);
    // Add navigation to application form here
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="px-4 py-6 pt-12">
        <Text className="text-2xl font-bold text-gray-900">
          Explore Grants
        </Text>
      </View>

      {/* Main Navigation Tabs */}
      <View className="flex-row px-4 mb-4">
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setSelectedTab(tab)}
            className={`px-4 py-2 rounded-lg mr-3 ${
              selectedTab === tab 
                ? 'bg-purple-600' 
                : 'bg-gray-100'
            }`}
          >
            <Text className={`text-sm font-medium ${
              selectedTab === tab 
                ? 'text-white' 
                : 'text-gray-700'
            }`}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Search Bar */}
      <View className="px-4 mb-4">
        <View className="relative">
          <TextInput
            className="border border-purple-200 rounded-lg px-4 py-3 pr-10 text-gray-900"
            placeholder="Find Grants"
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
          />
          <View className="absolute right-3 top-3">
            <Ionicons name="search" size={20} color="#9CA3AF" />
          </View>
        </View>
      </View>

      {/* Suggested grants for you Section */}
      <View className="flex-row justify-between items-center px-4 mb-4">
        <Text className="text-lg font-bold text-gray-900">
          Suggested grants for you
        </Text>
        <TouchableOpacity>
          <Ionicons name="swap-vertical" size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>

      {/* Grants List */}
      <ScrollView className="flex-1 px-4">
        {filteredGrants.length > 0 ? (
          filteredGrants.map((grant) => (
            <Grant
              key={grant.id}
              {...grant}
              onPress={() => handleGrantPress(grant)}
              onApply={() => handleApplyPress(grant)}
            />
          ))
        ) : (
          <View className="flex-1 items-center justify-center py-8">
            <Text className="text-gray-500 text-center text-lg">
              No grants found matching your criteria
            </Text>
            <Text className="text-gray-400 text-center mt-2">
              Try adjusting your search or tab filter
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
