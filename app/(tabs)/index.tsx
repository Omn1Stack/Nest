import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  ImageBackground,
  StatusBar,
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
  Search,
  Bell,
} from "lucide-react";

export default function HomeScreen() {
  const [scrollY] = useState(new Animated.Value(0));
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(20)); // Reduced initial offset
  const [rotateAnim] = useState(new Animated.Value(0));
  const [buttonAnim] = useState(new Animated.Value(0));

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
    // Only animate the welcome banner section
    // This animation won't affect other components
    Animated.sequence([
      // Fade in the welcome banner immediately
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      // Then start the slide animation
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      // Button animation starts after the text animations complete
      Animated.timing(buttonAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Header animation on scroll - more dramatic
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [1, 0.92],
    extrapolate: "clamp",
  });

  const headerScale = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.95],
    extrapolate: "clamp",
  });

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -5],
    extrapolate: "clamp",
  });

  // Rotation animation for icons
  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  // Quick action buttons - enhanced with gradients
  const QuickActionButton = ({ icon, label, color, secondColor }) => (
    <TouchableOpacity className="items-center mx-2 p-2">
      <View
        className={`w-14 h-14 rounded-full items-center justify-center mb-2 shadow-lg`}
        style={{
          backgroundColor: color,
          shadowColor: color,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: 6,
          borderWidth: 2,
          borderColor: secondColor,
        }}
      >
        {icon}
      </View>
      <Text
        className="text-gray-800 font-medium text-xs"
        style={{
          textShadowColor: "rgba(0,0,0,0.1)",
          textShadowOffset: { width: 1, height: 1 },
          textShadowRadius: 2,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  // Event card component - enhanced with gradients
  const EventCard = ({ title, images, date }) => (
    <TouchableOpacity
      className="mr-4 w-48 overflow-hidden rounded-2xl shadow-xl"
      style={{
        shadowColor: "#6366f1",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 8,
      }}
    >
      <View
        className="h-36 rounded-t-2xl flex items-center justify-center"
        style={{
          backgroundColor: "#818cf8",
          backgroundImage: "linear-gradient(135deg, #818cf8 0%, #6366f1 100%)",
        }}
      >
        <Animated.View
          style={{
            transform: [{ scale: headerScale }],
          }}
        >
          <Image size={36} color="#ffffff" />
        </Animated.View>
      </View>
      <View className="p-3 bg-white rounded-b-2xl border-t border-indigo-100">
        <Text className="font-bold text-gray-800 text-base">{title}</Text>
        <View className="flex-row justify-between items-center mt-1">
          <Text className="text-xs text-indigo-600 font-medium">
            {images} photos
          </Text>
          <Text className="text-xs text-gray-500">{date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  // AI Feature Card - Improved layout
  const AIFeatureCard = ({ icon, title, description, color }) => (
    <TouchableOpacity
      className="flex-1 bg-white p-3 rounded-xl shadow-md flex-row items-center mx-1"
      style={{
        shadowColor: color,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      }}
    >
      <View
        className={`w-10 h-10 bg-${color}-500 rounded-full items-center justify-center mr-2`}
      >
        {icon}
      </View>
      <View className="flex-1">
        <Text className="font-bold text-gray-800 text-sm">{title}</Text>
        <Text className="text-xs text-gray-500">{description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1" style={{ backgroundColor: "#f0f4fd" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Animated Header */}
      <Animated.View
        style={{
          opacity: headerOpacity,
          transform: [{ scale: headerScale }, { translateY: headerTranslateY }],
        }}
        className="pt-12 pb-3 px-6 bg-white border-b border-indigo-100"
      >
        <View className="flex-row justify-between items-center">
          <Text
            className="text-3xl font-bold"
            style={{
              color: "#4f46e5",
              textShadowColor: "rgba(79, 70, 229, 0.2)",
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 3,
            }}
          >
            Nest
          </Text>
          <View className="flex-row">
            <TouchableOpacity className="p-2 bg-indigo-50 rounded-full mr-3">
              <Bell size={20} color="#4f46e5" />
            </TouchableOpacity>
            <TouchableOpacity className="p-2 bg-indigo-500 rounded-full shadow-md shadow-indigo-300">
              <Camera size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <View className="flex-row bg-gray-100 rounded-full mt-3 px-4 py-2 items-center">
          <Search size={16} color="#6b7280" />
          <Text className="ml-2 text-gray-400 text-sm">
            Search photos, collections...
          </Text>
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
        contentContainerStyle={{ paddingBottom: 80, paddingTop: 4 }}
      >
        {/* Welcome Banner in its own isolated container */}
        <View style={{ marginBottom: 16 }}>
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
              zIndex: 1, // Ensure it doesn't affect layout of other elements
              position: "relative", // Reinforce isolation
            }}
            className="mx-6 mt-5 rounded-3xl shadow-xl overflow-hidden"
          >
            <ImageBackground
              source={{
                uri: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000",
              }}
              className="p-5"
              imageStyle={{ opacity: 0.15 }}
              style={{ backgroundColor: "#4338ca" }}
            >
              <Animated.View
                style={{
                  transform: [{ rotate: spin }],
                  position: "absolute",
                  right: 20,
                  top: 20,
                  opacity: 0.6,
                }}
              >
                <Image size={50} color="#ffffff" />
              </Animated.View>

              <Text className="text-xl font-bold text-white">
                Welcome to Nest
              </Text>
              <Text className="text-indigo-100 mt-1 text-base">
                Your memories, beautifully organized
              </Text>

              {/* Button appears after text animations */}
              <Animated.View
                style={{
                  opacity: buttonAnim,
                  transform: [
                    {
                      translateY: Animated.multiply(
                        buttonAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [20, 0],
                        }),
                        -1
                      ),
                    },
                  ],
                }}
              >
                <TouchableOpacity
                  className="bg-white py-2 px-6 rounded-full mt-4 self-start shadow-lg"
                  style={{
                    shadowColor: "#000000",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.2,
                    shadowRadius: 5,
                  }}
                >
                  <Text
                    className="font-bold text-sm"
                    style={{ color: "#4338ca" }}
                  >
                    Upload Photos
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            </ImageBackground>
          </Animated.View>
        </View>

        {/* Clear separator between banner and quick actions */}
        <View style={{ height: 8 }} />

        {/* Quick Actions - now clearly separated from welcome banner */}

        {/* Quick Actions - now clearly separated from welcome banner */}
        <View className="mb-6">
          <Text className="mx-6 text-lg font-bold text-gray-800 mb-3">
            Quick Actions
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="pl-6"
            contentContainerStyle={{ paddingRight: 24 }}
          >
            <QuickActionButton
              icon={<Camera size={24} color="white" />}
              label="New Event"
              color="#3b82f6"
              secondColor="#1d4ed8"
            />
            <QuickActionButton
              icon={<Share2 size={24} color="white" />}
              label="Share"
              color="#10b981"
              secondColor="#059669"
            />
            <QuickActionButton
              icon={<Users size={24} color="white" />}
              label="Groups"
              color="#8b5cf6"
              secondColor="#6d28d9"
            />
            <QuickActionButton
              icon={<Grid size={24} color="white" />}
              label="AI Collage"
              color="#ec4899"
              secondColor="#db2777"
            />
            <QuickActionButton
              icon={<Heart size={24} color="white" />}
              label="Favorites"
              color="#ef4444"
              secondColor="#dc2626"
            />
          </ScrollView>
        </View>

        {/* Featured Collections */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center mx-6 mb-3">
            <Text className="text-lg font-bold text-gray-800">
              Featured Collections
            </Text>
            <TouchableOpacity className="bg-indigo-100 px-3 py-1 rounded-full">
              <Text className="text-indigo-600 font-bold text-xs">See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="pl-6"
            contentContainerStyle={{ paddingRight: 24 }}
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

        {/* AI Features - Improved container */}
        <View className="mx-6 mb-6 rounded-3xl shadow-lg overflow-hidden">
          <View
            className="p-4"
            style={{
              backgroundColor: "#f5f3ff",
              backgroundImage:
                "linear-gradient(135deg, #f5f3ff 0%, #ede9fe 50%, #ddd6fe 100%)",
            }}
          >
            <Text className="text-lg font-bold text-gray-800 mb-1">
              AI Magic
            </Text>
            <Text className="text-gray-600 mb-3 text-sm">
              Let AI organize and enhance your photos
            </Text>

            <View className="flex-row justify-between space-x-2">
              <AIFeatureCard
                icon={<Image size={18} color="white" />}
                title="Face Search"
                description="Find people in photos"
                color="indigo"
              />

              <AIFeatureCard
                icon={<Grid size={18} color="white" />}
                title="Smart Collage"
                description="Auto-create layouts"
                color="indigo"
              />
            </View>
          </View>
        </View>

        {/* Recent Uploads - Grid Layout */}
        <View className="mx-6 mb-6">
          <Text className="text-lg font-bold text-gray-800 mb-3">
            Recent Uploads
          </Text>
          <View className="flex-row flex-wrap justify-between">
            {recentUploads.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                className={`bg-white rounded-2xl mb-3 items-center justify-center shadow-lg ${
                  index % 2 === 0 ? "w-5/12" : "w-5/12"
                }`}
                style={{
                  backgroundColor: item.id % 2 === 0 ? "#ede9fe" : "#e0f2fe",
                  shadowColor: item.id % 2 === 0 ? "#8b5cf6" : "#3b82f6",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.15,
                  shadowRadius: 6,
                  elevation: 5,
                  height: 120, // Fixed height for all cards
                  marginRight: index % 2 === 0 ? 6 : 0,
                  marginLeft: index % 2 !== 0 ? 6 : 0,
                }}
              >
                <Image
                  size={28}
                  color={item.id % 2 === 0 ? "#8b5cf6" : "#3b82f6"}
                />
                <Text className="mt-2 font-bold text-gray-800 text-sm">
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
