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
}

const sampleGrants: GrantData[] = [
  {
    id: '1',
    title: 'Small Business Innovation Research Grant',
    organization: 'National Science Foundation',
    amount: '$150,000',
    deadline: 'March 15, 2024',
    category: 'Research',
    description: 'Funding for innovative research projects that have commercial potential and address important societal needs.'
  },
  {
    id: '2',
    title: 'Community Development Grant',
    organization: 'Department of Housing and Urban Development',
    amount: '$500,000',
    deadline: 'April 30, 2024',
    category: 'Community',
    description: 'Support for community development projects that improve housing, economic opportunities, and quality of life.'
  },
  {
    id: '3',
    title: 'Environmental Protection Grant',
    organization: 'Environmental Protection Agency',
    amount: '$75,000',
    deadline: 'May 1, 2024',
    category: 'Environment',
    description: 'Funding for projects that protect and improve environmental quality and public health.'
  },
  {
    id: '4',
    title: 'Education Technology Grant',
    organization: 'Department of Education',
    amount: '$200,000',
    deadline: 'June 15, 2024',
    category: 'Education',
    description: 'Support for innovative educational technology projects that enhance learning outcomes.'
  },
  {
    id: '5',
    title: 'Healthcare Innovation Grant',
    organization: 'National Institutes of Health',
    amount: '$300,000',
    deadline: 'July 1, 2024',
    category: 'Healthcare',
    description: 'Funding for healthcare research and innovation projects that improve patient outcomes.'
  }
];

export default function GrantsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', 'Research', 'Community', 'Environment', 'Education', 'Healthcare'];
  
  const filteredGrants = sampleGrants.filter(grant => {
    const matchesSearch = grant.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         grant.organization.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || grant.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleGrantPress = (grant: GrantData) => {
    console.log('Grant pressed:', grant.title);
    // Add navigation to grant details here
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-4 py-6 pt-12 border-b border-gray-200">
        <Text className="text-2xl font-bold text-gray-900 mb-2">
          Available Grants
        </Text>
        <Text className="text-gray-600">
          Find funding opportunities for your projects
        </Text>
      </View>

      {/* Search Bar */}
      <View className="bg-white px-4 py-3 border-b border-gray-200">
        <TextInput
          className="bg-gray-100 rounded-lg px-4 py-3 text-gray-900"
          placeholder="Search grants..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#9CA3AF"
        />
      </View>

      {/* Category Filter */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        className="bg-white border-b border-gray-200"
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            onPress={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full mr-3 ${
              selectedCategory === category 
                ? 'bg-blue-600' 
                : 'bg-gray-100'
            }`}
          >
            <Text className={`text-sm font-medium ${
              selectedCategory === category 
                ? 'text-white' 
                : 'text-gray-700'
            }`}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Grants List */}
      <ScrollView className="flex-1 pt-4">
        {filteredGrants.length > 0 ? (
          filteredGrants.map((grant) => (
            <Grant
              key={grant.id}
              {...grant}
              onPress={() => handleGrantPress(grant)}
            />
          ))
        ) : (
          <View className="flex-1 items-center justify-center px-4">
            <Text className="text-gray-500 text-center text-lg">
              No grants found matching your criteria
            </Text>
            <Text className="text-gray-400 text-center mt-2">
              Try adjusting your search or category filter
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
