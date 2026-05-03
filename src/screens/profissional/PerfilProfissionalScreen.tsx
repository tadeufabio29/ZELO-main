import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { colors, typo, space, radius, rs } from '../../theme'

type Props = {
  navigation: NativeStackNavigationProp<any>
}

const profissional = {
  emoji: '🧠',
  nome: 'Dra. Ana Souza',
  registro: 'CRP 05/12345',
  experiencia: '8 anos de experiência',
  especialidades: ['TEA', 'TDAH', 'Ansiedade infantil'],
  avaliacao: 4.9,
  totalAvaliacoes: 134,
  bio: 'Psicóloga clínica especializada em neurodesenvolvimento infantil. Atendo crianças com TEA, TDAH e transtornos de ansiedade com abordagem humanizada e baseada em evidências.',
  consultasRealizadas: 312,
  pacientesAtivos: 18,
}

export default function PerfilProfissionalScreen({ navigation }: Props) {
  // ✅ CORREÇÃO 1: insets dinâmicos em vez de paddingTop fixo
  const insets = useSafeAreaInsets()

  return (
    <View style={styles.container}>

      {/* Header roxo */}
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <View style={styles.profRow}>
          <View style={styles.profIcone}>
            <Text style={styles.profEmoji}>{profissional.emoji}</Text>
          </View>
          <View style={styles.profInfo}>
            <Text style={styles.profNome}>{profissional.nome}</Text>
            <Text style={styles.profRegistro}>
              {profissional.registro} · {profissional.experiencia}
            </Text>
            <View style={styles.tagsRow}>
              {profissional.especialidades.map((tag) => (
                <View key={tag} style={styles.tag}>
                  <Text style={styles.tagTexto}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Estatísticas */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumero}>{profissional.avaliacao}</Text>
            <Text style={styles.statLabel}>Avaliação</Text>
            <Text style={styles.statSub}>★★★★★</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumero}>{profissional.consultasRealizadas}</Text>
            <Text style={styles.statLabel}>Consultas</Text>
            <Text style={styles.statSub}>realizadas</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumero}>{profissional.pacientesAtivos}</Text>
            <Text style={styles.statLabel}>Pacientes</Text>
            <Text style={styles.statSub}>ativos</Text>
          </View>
        </View>

        {/* Bio */}
        <View style={styles.card}>
          <Text style={styles.cardTitulo}>SOBRE MIM</Text>
          <Text style={styles.bioTexto}>{profissional.bio}</Text>
        </View>

        {/* Ações */}
        <View style={styles.card}>
          <Text style={styles.cardTitulo}>CONFIGURAÇÕES</Text>
          {[
            { emoji: '✏️', label: 'Editar perfil' },
            { emoji: '🕐', label: 'Gerenciar disponibilidade' },
            { emoji: '💰', label: 'Configurar valores' },
            { emoji: '📦', label: 'Gerenciar pacotes gratuitos' },
          ].map((item, i) => (
            <TouchableOpacity key={i} style={styles.acaoItem}>
              <Text style={styles.acaoEmoji}>{item.emoji}</Text>
              <Text style={styles.acaoLabel}>{item.label}</Text>
              <Text style={styles.acaoSeta}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgMain },

  // Header — paddingTop removido daqui, aplicado inline com insets
  header: {
    backgroundColor: colors.purpleDark,
    paddingHorizontal: 20,
    paddingBottom: 24,
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
  },
  profRow: { flexDirection: 'row', gap: 14, alignItems: 'flex-start' },
  profIcone: {
    width: 72, height: 72, borderRadius: 16,
    backgroundColor: colors.bgCard, alignItems: 'center', justifyContent: 'center',
  },
  profEmoji: { fontSize: 36 },
  profInfo: { flex: 1, gap: 4 },
  profNome: { fontSize: 20, fontWeight: '700', color: colors.bgCard },
  profRegistro: { fontSize: 12, color: 'rgba(255,255,255,0.8)' },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 4 },
  tag: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4,
  },
  tagTexto: { fontSize: 12, fontWeight: '600', color: colors.bgCard }, // ✅ era 11

  scrollContent: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 40, gap: 12 },

  // Stats
  statsRow: { flexDirection: 'row', gap: 10 },
  statCard: {
    flex: 1, backgroundColor: colors.bgCard, borderRadius: 14,
    borderWidth: 1, borderColor: colors.border,
    padding: 14, alignItems: 'center', gap: 2,
  },
  statNumero: { fontSize: 22, fontWeight: '700', color: colors.purpleDark },
  statLabel: { fontSize: 12, fontWeight: '600', color: colors.textPrimary }, // ✅ era 11
  statSub: { fontSize: 12, color: '#F5A623' },                      // ✅ era 10

  // Card
  card: {
    backgroundColor: colors.bgCard, borderRadius: 16,
    borderWidth: 1, borderColor: colors.border, padding: 16, gap: 12,
  },
  cardTitulo: { fontSize: 12, fontWeight: '700', color: colors.textMuted, letterSpacing: 0.5 }, // ✅ era 11
  bioTexto: { fontSize: 13, color: colors.textSecondary, lineHeight: 20 },

  // Ações
  acaoItem: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F0F2F5',
  },
  acaoEmoji: { fontSize: 18 },
  acaoLabel: { flex: 1, fontSize: 14, color: colors.textPrimary, fontWeight: '500' },
  acaoSeta: { fontSize: 20, color: colors.textMuted },
})