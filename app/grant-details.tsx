import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function GrantDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({
    eligibility1: true,
    eligibility2: false,
    eligibility3: false,
  });

  // Sample data - in production this would come from params or API
  const grantData = {
    id: params.id || '3',
    title: 'LNG Canada Trades Training Fund',
    organization: 'BC Ca',
    amount: 'Up to $1000',
    deadline: '09/01 - 09/14',
    eligible: true,
    description: 'The Trades Training Fund is an opportunity primarily for residents of Northwest BC. If the applicant has an employment attachment, the employer must have a business operating in Northwest BC, except for the two designated trades that are ...',
    fullDescription: 'The Trades Training Fund is an opportunity primarily for residents of Northwest BC. If the applicant has an employment attachment, the employer must have a business operating in Northwest BC, except for the two designated trades that are eligible for funding throughout BC. This fund supports individuals pursuing trades training and certification in various construction and industrial trades.',
  };

  const toggleCheckbox = (key: string) => {
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <View className="flex-1 bg-white">
      {/* Hides the default header */}
      <Stack.Screen options={{ headerShown: false }} />

      {/* Custom Header */}
      <View className="flex-row items-center justify-between px-4 py-6 pt-12">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="bookmark-outline" size={24} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1">
        {/* Grant Title */}
        <View className="px-4 mb-6">
          <Text className="text-2xl font-bold text-gray-900 mb-2">
            {grantData.title}
          </Text>
        </View>

        {/* Info Cards */}
        <View className="flex-row justify-between px-4 mb-6">
          {/* Eligibility Card */}
          <View className="bg-gray-100 rounded-2xl p-4 flex-1 mr-2 items-center">
            <View className="w-8 h-8 items-center justify-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 25 25" fill="none">
             <circle cx="12.5" cy="12.5" r="12.5" fill="#6FCEFD"/>
             <path d="M6.66304 12.5232L11.3315 16.4346L19.0437 8.10513" stroke="white" stroke-width="1.51351"/>
            </svg>
            </View>
            <Text className="text-gray-900 text-sm font-medium">You're</Text>
            <Text className="text-gray-900 text-sm font-medium">eligible</Text>
          </View>

          {/* Amount Card */}
          <View className="bg-gray-100 rounded-2xl p-4 flex-1 mx-1 items-center">
            <View className="w-8 h-8 items-center justify-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 25 25" fill="none">
              <path d="M11.5625 7.80878C10.3925 8.12878 9.6875 9.02753 9.6875 9.87503C9.6875 10.7225 10.3925 11.6213 11.5625 11.94V7.80878ZM13.4375 14.06V18.19C14.6075 17.8713 15.3125 16.9725 15.3125 16.125C15.3125 15.2775 14.6075 14.3788 13.4375 14.06Z" fill="#7CD23E"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M25 12.5C25 19.4037 19.4037 25 12.5 25C5.59625 25 0 19.4037 0 12.5C0 5.59625 5.59625 0 12.5 0C19.4037 0 25 5.59625 25 12.5ZM12.5 4.0625C12.7486 4.0625 12.9871 4.16127 13.1629 4.33709C13.3387 4.5129 13.4375 4.75136 13.4375 5V5.39625C15.475 5.76125 17.1875 7.2925 17.1875 9.375C17.1875 9.62364 17.0887 9.8621 16.9129 10.0379C16.7371 10.2137 16.4986 10.3125 16.25 10.3125C16.0014 10.3125 15.7629 10.2137 15.5871 10.0379C15.4113 9.8621 15.3125 9.62364 15.3125 9.375C15.3125 8.5275 14.6075 7.62875 13.4375 7.30875V11.6463C15.475 12.0113 17.1875 13.5425 17.1875 15.625C17.1875 17.7075 15.475 19.2388 13.4375 19.6038V20C13.4375 20.2486 13.3387 20.4871 13.1629 20.6629C12.9871 20.8387 12.7486 20.9375 12.5 20.9375C12.2514 20.9375 12.0129 20.8387 11.8371 20.6629C11.6613 20.4871 11.5625 20.2486 11.5625 20V19.6038C9.525 19.2388 7.8125 17.7075 7.8125 15.625C7.8125 15.3764 7.91127 15.1379 8.08709 14.9621C8.2629 14.7863 8.50136 14.6875 8.75 14.6875C8.99864 14.6875 9.2371 14.7863 9.41291 14.9621C9.58873 15.1379 9.6875 15.3764 9.6875 15.625C9.6875 16.4725 10.3925 17.3713 11.5625 17.69V13.3537C9.525 12.9887 7.8125 11.4575 7.8125 9.375C7.8125 7.2925 9.525 5.76125 11.5625 5.39625V5C11.5625 4.75136 11.6613 4.5129 11.8371 4.33709C12.0129 4.16127 12.2514 4.0625 12.5 4.0625Z" fill="#7CD23E"/>
            </svg>
            </View>
            <Text className="text-gray-900 text-sm font-medium text-center">{grantData.amount}</Text>
          </View>

          {/* Deadline Card */}
          <View className="bg-gray-100 rounded-2xl p-4 flex-1 ml-2 items-center">
            <View className=" w-8 h-8 items-center justify-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" fill="none">
             <path d="M11.25 18.75H13.75V11.25H11.25V18.75ZM12.5 8.75C12.8542 8.75 13.1512 8.63 13.3912 8.39C13.6312 8.15 13.7508 7.85333 13.75 7.5C13.7492 7.14666 13.6292 6.85 13.39 6.61C13.1508 6.37 12.8542 6.25 12.5 6.25C12.1458 6.25 11.8492 6.37 11.61 6.61C11.3708 6.85 11.2508 7.14666 11.25 7.5C11.2492 7.85333 11.3692 8.15041 11.61 8.39125C11.8508 8.63208 12.1475 8.75166 12.5 8.75ZM12.5 25C10.7708 25 9.14583 24.6717 7.625 24.015C6.10416 23.3583 4.78125 22.4679 3.65625 21.3437C2.53125 20.2196 1.64083 18.8967 0.985001 17.375C0.329168 15.8533 0.000834915 14.2283 1.58228e-06 12.5C-0.000831751 10.7717 0.327501 9.14666 0.985001 7.625C1.6425 6.10333 2.53292 4.78042 3.65625 3.65625C4.77958 2.53208 6.1025 1.64167 7.625 0.985C9.1475 0.328333 10.7725 0 12.5 0C14.2275 0 15.8525 0.328333 17.375 0.985C18.8975 1.64167 20.2204 2.53208 21.3437 3.65625C22.4671 4.78042 23.3579 6.10333 24.0162 7.625C24.6746 9.14666 25.0025 10.7717 25 12.5C24.9975 14.2283 24.6692 15.8533 24.015 17.375C23.3608 18.8967 22.4704 20.2196 21.3437 21.3437C20.2171 22.4679 18.8942 23.3587 17.375 24.0162C15.8558 24.6737 14.2308 25.0017 12.5 25Z" fill="#8E78FF"/>
             <path d="M11.25 18.75H13.75V11.25H11.25V18.75ZM12.5 8.75C12.8542 8.75 13.1512 8.63 13.3912 8.39C13.6312 8.15 13.7508 7.85333 13.75 7.5C13.7492 7.14666 13.6292 6.85 13.39 6.61C13.1508 6.37 12.8542 6.25 12.5 6.25C12.1458 6.25 11.8492 6.37 11.61 6.61C11.3708 6.85 11.2508 7.14666 11.25 7.5C11.2492 7.85333 11.3692 8.15041 11.61 8.39125C11.8508 8.63208 12.1475 8.75166 12.5 8.75ZM12.5 25C10.7708 25 9.14583 24.6717 7.625 24.015C6.10416 23.3583 4.78125 22.4679 3.65625 21.3437C2.53125 20.2196 1.64083 18.8967 0.985001 17.375C0.329168 15.8533 0.000834915 14.2283 1.58228e-06 12.5C-0.000831751 10.7717 0.327501 9.14666 0.985001 7.625C1.6425 6.10333 2.53292 4.78042 3.65625 3.65625C4.77958 2.53208 6.1025 1.64167 7.625 0.985C9.1475 0.328333 10.7725 0 12.5 0C14.2275 0 15.8525 0.328333 17.375 0.985C18.8975 1.64167 20.2204 2.53208 21.3437 3.65625C22.4671 4.78042 23.3579 6.10333 24.0162 7.625C24.6746 9.14666 25.0025 10.7717 25 12.5C24.9975 14.2283 24.6692 15.8533 24.015 17.375C23.3608 18.8967 22.4704 20.2196 21.3437 21.3437C20.2171 22.4679 18.8942 23.3587 17.375 24.0162C15.8558 24.6737 14.2308 25.0017 12.5 25Z" fill="black" fill-opacity="0.2"/>
           </svg>
            </View>
            <Text className="text-gray-900 text-sm font-medium text-center">{grantData.deadline}</Text>
          </View>
        </View>

        {/* Description Section */}
        <View className=" px-4 mb-6">
         <View className=" bg-purple-50 rounded-2xl p-4">
          <Text className=" text-gray-700 text-base leading-relaxed">
            {isDescriptionExpanded ? grantData.fullDescription : grantData.description}
          </Text>
          <TouchableOpacity 
            onPress={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
            className="mt-2"
          >
            <View className="flex-row items-center">
              <Text className="text-gray-500 text-sm mr-1">
                {isDescriptionExpanded ? 'Show less' : 'Show more'}
              </Text>
              <Ionicons 
                name={isDescriptionExpanded ? "chevron-up" : "chevron-down"} 
                size={16} 
                color="#6B7280" 
              />
            </View>
          </TouchableOpacity>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="px-10 mb-6">
          <TouchableOpacity className="bg-orange-400 rounded-3xl py-4 mb-3">
            <Text className="text-black text-center font-medium text-base">
              Apply
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-[#7CD23E] rounded-3xl py-4">
            <Text className="text-black text-center font-medium text-base">
              Generate my application
            </Text>
          </TouchableOpacity>
        </View>

        {/* Track Your Progress Section */}
        <View className="px-4 mb-8">
          <Text className="text-xl font-bold text-gray-900 mb-4">
            Track your progress
          </Text>

          {/* Step 1: Check Eligibility */}
          <View className="mb-6">
            <View className="flex-row items-center mb-3">
              <View className="bg-[#7CD23E] rounded-full w-6 h-6 items-center justify-center mr-3">
                <Ionicons name="checkmark" size={16} color="white" />
              </View>
              <Text className="text-[#7CD23E] font-bold text-base">
                Step 1 : Check Eligibility
              </Text>
            </View>

            <View className="bg-gray-50 rounded-xl p-4 ml-9">
              {/* Eligibility Item 1 */}
              <TouchableOpacity 
                className="flex-row items-start mb-4"
                onPress={() => toggleCheckbox('eligibility1')}
              >
                <View className={`w-5 h-5 border-2 rounded mr-3 mt-0.5 items-center justify-center ${
                  checkedItems.eligibility1 ? 'bg-black border-black' : 'border-gray-300'
                }`}>
                  {checkedItems.eligibility1 && (
                    <Ionicons name="checkmark" size={14} color="white" />
                  )}
                </View>
                <Text className="text-gray-900 text-sm flex-1">
                  Canadian Citizen, Permanent Resident or Protected Person entitled to study in Canada
                </Text>
              </TouchableOpacity>

              {/* Eligibility Item 2 */}
              <TouchableOpacity 
                className="flex-row items-start mb-4"
                onPress={() => toggleCheckbox('eligibility2')}
              >
                <View className={`w-5 h-5 border-2 rounded mr-3 mt-0.5 items-center justify-center ${
                  checkedItems.eligibility2 ? 'bg-black border-black' : 'border-gray-300'
                }`}>
                  {checkedItems.eligibility2 && (
                    <Ionicons name="checkmark" size={14} color="white" />
                  )}
                </View>
                <Text className="text-gray-900 text-sm flex-1">
                  B.C. resident
                </Text>
              </TouchableOpacity>

              {/* Eligibility Item 3 */}
              <TouchableOpacity 
                className="flex-row items-start"
                onPress={() => toggleCheckbox('eligibility3')}
              >
                <View className={`w-5 h-5 border-2 rounded mr-3 mt-0.5 items-center justify-center ${
                  checkedItems.eligibility3 ? 'bg-black border-black' : 'border-gray-300'
                }`}>
                  {checkedItems.eligibility3 && (
                    <Ionicons name="checkmark" size={14} color="white" />
                  )}
                </View>
                <Text className="text-gray-900 text-sm flex-1">
                  Graduated grade 12 or equivalent or 19 years of age or older
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Step 2: Gather Required Documents */}
          <View className="mb-6">
            <View className="flex-row items-center mb-3">
              <View className="bg-[#7CD23E] rounded-full w-6 h-6 items-center justify-center mr-3">
                <Ionicons name="checkmark" size={16} color="white" />
              </View>
              <Text className="text-[#7CD23E] font-bold text-base">
                Step 2 : Gather Required Documents
              </Text>
            </View>

            <View className="bg-gray-50 rounded-xl p-4 ml-9">
              <View className="flex-row items-start mb-4">
                <View className="w-5 h-5 border-2 border-gray-300 rounded mr-3 mt-0.5" />
                <Text className="text-gray-900 text-sm flex-1">
                  BC Services Card
                </Text>
              </View>

              <View className="flex-row items-start mb-4">
                <View className="w-5 h-5 border-2 border-gray-300 rounded mr-3 mt-0.5" />
                <Text className="text-gray-900 text-sm flex-1">
                  Program Proof of Enrolment
                </Text>
              </View>

              <View className="flex-row items-start">
                <View className="w-5 h-5 border-2 border-gray-300 rounded mr-3 mt-0.5" />
                <Text className="text-gray-900 text-sm flex-1">
                  Grade 12 Graduation Certificate
                </Text>
              </View>
            </View>
          </View>

          {/* Step 3: Submit Application */}
          <View className="mb-6">
            <View className="flex-row items-center mb-3">
              <View className="bg-gray-300 rounded-full w-6 h-6 items-center justify-center mr-3">
                <Ionicons name="checkmark" size={16} color="white" />
              </View>
              <Text className="text-gray-400 font-bold text-base">
                Step 3 : Submit application
              </Text>
            </View>

            <View className="bg-gray-50 rounded-xl p-4 ml-9">
              <View className="flex-row items-center justify-between">
                <Text className="text-gray-900 text-sm">Apply here</Text>
                <Ionicons name="open-outline" size={20} color="#6B7280" />
              </View>
            </View>
          </View>

          {/* Step 4: Record the Result */}
          <View>
            <View className="flex-row items-center mb-3">
              <View className="bg-[#6FCEFD] rounded-full w-6 h-6 items-center justify-center mr-3">
                <Ionicons name="checkmark" size={16} color="white" />
              </View>
              <Text className="text-gray-400 font-bold text-base">
                Step 4 : Record the result
              </Text>
            </View>

            <View className="px-7">
              <TouchableOpacity className="bg-[#6FCEFD] rounded-3xl py-4 mb-3">
                <Text className="text-black text-center font-medium text-base">
                  Accepted
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-[#E83B4D] rounded-3xl py-4">
                <Text className="text-black text-center font-medium text-base">
                  Declined
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

