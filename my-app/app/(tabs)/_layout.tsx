import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />

       <Tabs.Screen
              name="pet"
              options={{
                title: 'Pet',
                  tabBarIcon: ({ color }) => (
                      <FontAwesome name="paw" size={28} color={color} />
                    ),
              }}
            />
<Tabs.Screen
              name="AnimalsListsScreen"
              options={{
                title: 'Pet List',
                  tabBarIcon: ({ color }) => (
                      <FontAwesome5 name="cat" size={28} color={color} />
                    ),
              }}
            />
           <Tabs.Screen
              name="ConsultaListScreen"
              options={{
                title: 'ConsultaList',
                  tabBarIcon: ({ color }) => (
                      <FontAwesome name="calendar" size={28} color={color} />
                    ),
              }}
            />
            <Tabs.Screen
              name="TelaCreateScreen"
              options={{
                title: 'Tela Pet List',
                  tabBarIcon: ({ color }) => (
                      <FontAwesome5 name="crow" size={28} color={color} />
                    ),
              }}
            />
            <Tabs.Screen
              name="ConsultaTela"
              options={{
                title: 'Tela Consulta List',
                  tabBarIcon: ({ color }) => (
                      <FontAwesome5 name="newspaper" size={28} color={color} />
                    ),
              }}
            />
    </Tabs>
  );
}
