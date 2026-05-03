import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import HomeProfissionalScreen from '../screens/profissional/HomeProfissionalScreen'
import AgendaProfissionalScreen from '../screens/profissional/AgendaProfissionalScreen'
import PerfilProfissionalScreen from '../screens/profissional/PerfilProfissionalScreen'
import RelatoriosScreen from '../screens/profissional/RelatoriosScreen'
import ConfiguracoesProfissionalScreen from '../screens/profissional/ConfiguracoesProfissionalScreen'

const Tab = createBottomTabNavigator()

function TabIcon({ emoji, color }: { emoji: string; color: string }) {
  return <Text style={{ fontSize: 20, opacity: color === '#7B4FA6' ? 1 : 0.5 }}>{emoji}</Text>
}

export default function ProfissionalNavigator() {
  const insets = useSafeAreaInsets()
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600', marginBottom: 2 },
        tabBarActiveTintColor: '#7B4FA6',
        tabBarInactiveTintColor: '#8A95A3',
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: '#E8ECF0',
          height: 56 + insets.bottom,
          paddingTop: 4,
          paddingBottom: insets.bottom || 10,
        },
      }}
    >
      <Tab.Screen
        name="HomeProfissional"
        component={HomeProfissionalScreen}
        options={{ tabBarLabel: 'Início', tabBarIcon: ({ color }) => <TabIcon emoji="🏠" color={color} /> }}
      />
      <Tab.Screen
        name="AgendaProfissional"
        component={AgendaProfissionalScreen}
        options={{ tabBarLabel: 'Agenda', tabBarIcon: ({ color }) => <TabIcon emoji="📅" color={color} /> }}
      />
      <Tab.Screen
        name="PerfilProfissional"
        component={PerfilProfissionalScreen}
        options={{ tabBarLabel: 'Perfil', tabBarIcon: ({ color }) => <TabIcon emoji="👩‍⚕️" color={color} /> }}
      />
      <Tab.Screen
        name="Relatorios"
        component={RelatoriosScreen}
        options={{ tabBarLabel: 'Relatórios', tabBarIcon: ({ color }) => <TabIcon emoji="📊" color={color} /> }}
      />
      <Tab.Screen
        name="ConfiguracoesProfissional"
        component={ConfiguracoesProfissionalScreen}
        options={{ tabBarLabel: 'Config.', tabBarIcon: ({ color }) => <TabIcon emoji="⚙️" color={color} /> }}
      />
    </Tab.Navigator>
  )
}