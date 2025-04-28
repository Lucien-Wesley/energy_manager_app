import { StyleSheet, Pressable, View, Text } from 'react-native';
import { Notification } from '@/constants/MockData';
import Card from './card';
import { COLORS as colors} from '@/constants';
import { TriangleAlert as AlertTriangle, Info, CircleAlert as AlertCircle, CircleCheck as CheckCircle } from 'lucide-react-native';
import React from 'react';

interface NotificationCardProps {
  notification: Notification;
  onPress: (notification: Notification) => void;
  onMarkAsRead: (id: string) => void;
}

export default function NotificationCard({ notification, onPress, onMarkAsRead }: NotificationCardProps) {
  
  
  const getIconAndColor = () => {
    switch (notification.type) {
      case 'warning':
        return { icon: AlertTriangle, color: colors.warning };
      case 'error':
        return { icon: AlertCircle, color: colors.error };
      case 'info':
      default:
        return { icon: Info, color: colors.info };
    }
  };
  
  const { icon: IconComponent, color: iconColor } = getIconAndColor();
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <Card 
      style={styles.container}
      bg='white' 
      onPress={() => onPress(notification)}
    >
      <View style={styles.content} >
        <View 
          style={[styles.iconContainer, { backgroundColor: iconColor + '20' }]}
        >
          <IconComponent size={24} color={iconColor} strokeWidth={2} />
        </View>
        
        <View style={styles.details} >
          <View 
            style={styles.titleRow} 
            
          >
            <Text style={styles.title}>
              {notification.title}
            </Text>
            
            {!notification.isRead && (
              <View 
                style={styles.unreadIndicator} 
              />
            )}
          </View>
          
          <Text style={styles.message}>
            {notification.message}
          </Text>
          
          <Text style={styles.date}>
            {formatDate(notification.date)}
          </Text>
        </View>
        
        {!notification.isRead && (
          <Pressable
            style={styles.readButton}
            onPress={() => onMarkAsRead(notification.id)}
          >
            <CheckCircle size={20} color={colors.primary} strokeWidth={2} />
          </Pressable>
        )}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    padding: 5,
    borderRadius: 10,
  },
  content: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    flex: 1,
    fontFamily: 'semiBold',
  },
  unreadIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 10,
  },
  message: {
    marginBottom: 10,
    fontFamily: 'regular',
  },
  date: {
    marginTop: 2,
    fontFamily: 'regular',
  },
  readButton: {
    marginLeft: 10,
    padding: 4,
  },
});