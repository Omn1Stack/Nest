import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
} from "react-native";
import {
  Camera,
  Upload,
  Share2,
  Users,
  Image,
  Calendar,
  Grid,
  Heart,
} from "lucide-react";

export default function HomeScreen() {
  const [scrollY] = useState(new Animated.Value(0));
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));

  // Sample featured collections
  const featuredCollections = [
    { id: 1, title: "Sarah's Wedding", images: 124, date: "Apr 2025" },
    { id: 2, title: "Family Reunion", images: 78, date: "Mar 2025" },
    { id: 3, title: "Summer Party", images: 96, date: "Feb 2025" },
  ];

  // Sample recent uploads
  const recentUploads = [
    { id: 1, event: "Beach Trip" },
    { id: 2, event: "Birthday Party" },
    { id: 3, event: "Baby Shower" },
    { id: 4, event: "Office Event" },
  ];

  useEffect(() => {
    // Animate content on mount
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Header animation on scroll
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.9],
    extrapolate: "clamp",
  });

  // Quick action buttons
  const QuickActionButton = ({ icon, label, color }) => (
    <TouchableOpacity className="items-center mx-2 p-3">
      <View
        className={`w-12 h-12 rounded-full ${color} items-center justify-center mb-2`}
      >
        {icon}
      </View>
      <Text className="text-gray-800 font-medium text-xs">{label}</Text>
    </TouchableOpacity>
  );

  // Event card component
  const EventCard = ({ title, images, date }) => (
    <TouchableOpacity className="mr-4 w-48 overflow-hidden rounded-xl">
      <View className="bg-gray-200 h-32 rounded-xl flex items-center justify-center">
        <Image size={32} color="#94a3b8" />
      </View>
      <View className="p-2">
        <Text className="font-semibold text-gray-800 mt-1">{title}</Text>
        <View className="flex-row justify-between items-center mt-1">
          <Text className="text-xs text-gray-500">{images} photos</Text>
          <Text className="text-xs text-gray-500">{date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-white">
      {/* Animated Header */}
      <Animated.View
        style={{ opacity: headerOpacity }}
        className="pt-12 pb-4 px-6 bg-white border-b border-gray-100 shadow-sm"
      >
        <View className="flex-row justify-between items-center">
          <Text className="text-3xl font-bold text-indigo-600">Nest</Text>
          <View className="flex-row">
            <TouchableOpacity className="p-2">
              <Camera size={24} color="#4f46e5" />
            </TouchableOpacity>
            <TouchableOpacity className="p-2 ml-2">
              <Upload size={24} color="#4f46e5" />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {/* Welcome Banner */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
          className="mx-6 my-6 p-6 bg-indigo-50 rounded-2xl shadow-sm"
        >
          <Text className="text-xl font-bold text-gray-800">
            Welcome to Nest
          </Text>
          <Text className="text-gray-600 mt-2">
            Your memories, beautifully organized
          </Text>
          <TouchableOpacity className="bg-indigo-600 py-3 px-6 rounded-full mt-4 self-start">
            <Text className="text-white font-semibold">Upload Photos</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Quick Actions */}
        <View className="mb-6">
          <Text className="mx-6 text-lg font-semibold text-gray-800 mb-4">
            Quick Actions
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="pl-6"
          >
            <QuickActionButton
              icon={<Camera size={24} color="white" />}
              label="New Event"
              color="bg-blue-500"
            />
            <QuickActionButton
              icon={<Share2 size={24} color="white" />}
              label="Share"
              color="bg-green-500"
            />
            <QuickActionButton
              icon={<Users size={24} color="white" />}
              label="Groups"
              color="bg-purple-500"
            />
            <QuickActionButton
              icon={<Grid size={24} color="white" />}
              label="AI Collage"
              color="bg-pink-500"
            />
            <QuickActionButton
              icon={<Heart size={24} color="white" />}
              label="Favorites"
              color="bg-red-400"
            />
          </ScrollView>
        </View>

        {/* Featured Collections */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center mx-6 mb-4">
            <Text className="text-lg font-semibold text-gray-800">
              Featured Collections
            </Text>
            <TouchableOpacity>
              <Text className="text-indigo-600 font-medium">See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="pl-6"
          >
            {featuredCollections.map((collection) => (
              <EventCard
                key={collection.id}
                title={collection.title}
                images={collection.images}
                date={collection.date}
              />
            ))}
          </ScrollView>
        </View>

        {/* AI Features */}
        <View className="mx-6 mb-6 p-4 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl">
          <Text className="text-lg font-semibold text-gray-800 mb-2">
            AI Magic
          </Text>
          <Text className="text-gray-600 mb-3">
            Let AI organize and enhance your photos
          </Text>

          <View className="flex-row justify-between">
            <TouchableOpacity className="bg-white p-3 rounded-lg flex-1 mr-2 flex-row items-center">
              <View className="w-8 h-8 bg-indigo-100 rounded-full items-center justify-center mr-2">
                <Image size={16} color="#4f46e5" />
              </View>
              <Text className="font-medium text-gray-700">Face Search</Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-white p-3 rounded-lg flex-1 ml-2 flex-row items-center">
              <View className="w-8 h-8 bg-indigo-100 rounded-full items-center justify-center mr-2">
                <Grid size={16} color="#4f46e5" />
              </View>
              <Text className="font-medium text-gray-700">Smart Collage</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Uploads */}
        <View className="mx-6 mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-4">
            Recent Uploads
          </Text>
          <View className="flex-row flex-wrap justify-between">
            {recentUploads.map((item) => (
              <TouchableOpacity
                key={item.id}
                className="bg-gray-100 w-40 h-40 rounded-lg mb-4 items-center justify-center"
              >
                <Image size={28} color="#94a3b8" />
                <Text className="mt-2 font-medium text-gray-700">
                  {item.event}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      
      
    </View>
  );
}


