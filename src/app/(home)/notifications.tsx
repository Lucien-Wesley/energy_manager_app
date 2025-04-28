import { COLORS } from "@/constants";
import WeatherComponent from "@/src/components/WeatherComponent";
import { View, Text as RText, StyleSheet, ScrollView } from "react-native";
import React, { useState } from 'react';
import Button from '@/src/components/button';
import { Text } from '@/src/components/themedText';
import { notifications as initialNotifications } from '@/constants/MockData';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS as colors } from '@/constants';
import NotificationCard from '@/src/components/notificationCard';
import { Bell, CircleCheck as CheckCircle } from 'lucide-react-native';

const NotificationScreen = () => {
  
  const [notifications, setNotifications] = useState(initialNotifications);
  
  // Mark notification as read
  const handleMarkAsRead = (id: string) => {
    setNotifications(
      notifications.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true } 
          : notification
      )
    );
  };
  
  // Mark all as read
  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map(notification => ({ ...notification, isRead: true }))
    );
  };
  
  // Handle notification press
  const handleNotificationPress = (notification: typeof notifications[0]) => {
    if (!notification.isRead) {
      handleMarkAsRead(notification.id);
    }
    // Additional handling can be added here
  };
  
  // Count unread notifications
  const unreadCount = notifications.filter(notification => !notification.isRead).length;
  
  // Group notifications by date
  const groupNotificationsByDate = () => {
    const groups: { [key: string]: typeof notifications } = {};
    
    notifications.forEach(notification => {
      const date = new Date(notification.date);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      let groupKey = date.toLocaleDateString();
      
      // Check if the notification is from today or yesterday
      if (date.toDateString() === today.toDateString()) {
        groupKey = 'Today';
      } else if (date.toDateString() === yesterday.toDateString()) {
        groupKey = 'Yesterday';
      }
      
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      
      groups[groupKey].push(notification);
    });
    
    return groups;
  };
  
  const groupedNotifications = groupNotificationsByDate();
  
  return (
  <View style={styles.container}>
    <WeatherComponent />
    <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.text}>Notifications</Text>
          {unreadCount > 0 && (
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText} size="xs" weight="bold" color="secondaryWhite">
                {unreadCount}
              </Text>
            </View>
          )}
        </View>
        
        {unreadCount > 0 && (
          <Button 
            title="Mark all as read" 
            variant="outline" 
            size="sm" 
            fullWidth={true}
            rightIcon={<CheckCircle size={16} color={colors.primary} />}
            onPress={handleMarkAllAsRead}
          />
        )}
      </View>
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {Object.entries(groupedNotifications).length > 0 ? (
          Object.entries(groupedNotifications).map(([date, notifications]) => (
            <View key={date} style={styles.dateGroup}>
              <Text weight="semibold" style={styles.dateHeader}>{date}</Text>
              
              {notifications.map(notification => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                  onPress={handleNotificationPress}
                  onMarkAsRead={handleMarkAsRead}
                />
              ))}
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Bell size={64} color={colors.gray2} />
            <Text weight="semibold" size="lg" style={styles.emptyText}>
              No notifications
            </Text>
            <Text color="gray2" style={styles.emptySubtext}>
              You're all caught up! Check back later for updates.
            </Text>
          </View>
        )}
      </ScrollView>
  </View>
  );
}

export default NotificationScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.secondaryWhite, padding: 0},
  text: {
    fontSize: 24,
    fontFamily: "bold",
    color: "#333",
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgeContainer: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  },
  badgeText: {
    color: 'white',
    fontFamily: 'regular',
  },
  scrollContent: {
    paddingHorizontal: 8,
    paddingBottom: 100,
  },
  dateGroup: {
    marginBottom: 12,
  },
  dateHeader: {
    marginBottom: 10,
    fontFamily: 'regular',
    fontSize: 12,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  emptyText: {
    marginTop: 12,
    marginBottom: 5,
    fontFamily: 'regular',
  },
  emptySubtext: {
    textAlign: 'center',
    maxWidth: 250,
    fontFamily: 'regular',
  }

});
