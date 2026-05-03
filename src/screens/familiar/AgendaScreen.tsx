import { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { colors, typo, space, radius, rs } from '../../theme'

const MESES = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']
const DIAS_SEMANA = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb']

function gerarDiasDoMes(ano: number, mes: number) {
  const primeiroDia = new Date(ano, mes, 1).getDay()
  const totalDias = new Date(ano, mes + 1, 0).getDate()
  const dias: (number | null)[] = Array(primeiroDia).fill(null)
  for (let i = 1; i <= totalDias; i++) dias.push(i)
  return dias
}

const CONSULTAS = [
  { id: 1, dia: 9,  hora: '10:00', profissional: 'Dra. Ana Souza',     especialidade: 'Psicologia',     modalidade: 'Online',     emoji: '🧠', cor: colors.blue },
  { id: 2, dia: 9,  hora: '14:00', profissional: 'Dr. Carlos Lima',    especialidade: 'Fonoaudiologia', modalidade: 'Presencial', emoji: '🗣️', cor: '#3D9970' },
  { id: 3, dia: 15, hora: '09:00', profissional: 'Dra. Mariana Costa', especialidade: 'T. Ocupacional', modalidade: 'Online',     emoji: '🤲', cor: colors.purple },
  { id: 4, dia: 22, hora: '11:00', profissional: 'Dr. Rafael Mendes',  especialidade: 'Fisioterapia',   modalidade: 'Presencial', emoji: '💪', cor: '#E8A838' },
]

export default function AgendaScreen() {
  const navigation = useNavigation()
  const insets = useSafeAreaInsets()
  const hoje = new Date()
  const [ano, setAno] = useState(hoje.getFullYear())
  const [mes, setMes] = useState(hoje.getMonth())
  const [diaSelecionado, setDiaSelecionado] = useState(hoje.getDate())

  const dias = gerarDiasDoMes(ano, mes)
  const consultasDoDia = CONSULTAS.filter(c => c.dia === diaSelecionado)
  const diasComConsulta = new Set(CONSULTAS.map(c => c.dia))

  const mesAnterior = () => {
    if (mes === 0) { setMes(11); setAno(a => a - 1) } else setMes(m => m - 1)
    setDiaSelecionado(1)
  }
  const proximoMes = () => {
    if (mes === 11) { setMes(0); setAno(a => a + 1) } else setMes(m => m + 1)
    setDiaSelecionado(1)
  }

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity onPress={() => (navigation as any).goBack()} style={styles.voltarBtn}>
          <Text style={styles.voltarTxt}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitulo}>Agenda</Text>
        <Text style={styles.headerSubtitulo}>Suas consultas agendadas</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Calendário compacto */}
        <View style={styles.calendarioCard}>

          {/* Nav mês */}
          <View style={styles.mesNav}>
            <TouchableOpacity onPress={mesAnterior} style={styles.mesBtn}>
              <Text style={styles.mesBtnTexto}>‹</Text>
            </TouchableOpacity>
            <Text style={styles.mesTitulo}>{MESES[mes]} {ano}</Text>
            <TouchableOpacity onPress={proximoMes} style={styles.mesBtn}>
              <Text style={styles.mesBtnTexto}>›</Text>
            </TouchableOpacity>
          </View>

          {/* Dias da semana */}
          <View style={styles.semanaRow}>
            {DIAS_SEMANA.map(d => (
              <Text key={d} style={styles.semanaTexto}>{d}</Text>
            ))}
          </View>

          {/* Grid compacto — altura fixa por célula */}
          <View style={styles.diasGrid}>
            {dias.map((dia, index) => {
              if (!dia) return <View key={`e-${index}`} style={styles.diaCell} />
              const isHoje = dia === hoje.getDate() && mes === hoje.getMonth() && ano === hoje.getFullYear()
              const isSel = dia === diaSelecionado
              const temConsulta = diasComConsulta.has(dia)

              return (
                <TouchableOpacity
                  key={`d-${dia}`}
                  style={[styles.diaCell, isSel && styles.diaCellSel, isHoje && !isSel && styles.diaCellHoje]}
                  onPress={() => setDiaSelecionado(dia)}
                >
                  <Text style={[styles.diaTxt, isSel && styles.diaTxtSel, isHoje && !isSel && styles.diaTxtHoje]}>
                    {dia}
                  </Text>
                  {temConsulta && <View style={[styles.dot, isSel && styles.dotBranco]} />}
                </TouchableOpacity>
              )
            })}
          </View>
        </View>

        {/* Consultas do dia */}
        <View style={styles.secaoHeader}>
          <Text style={styles.secaoTitulo}>
            {diaSelecionado === hoje.getDate() && mes === hoje.getMonth()
              ? 'Hoje' : `${diaSelecionado} de ${MESES[mes]}`}
          </Text>
          <Text style={styles.secaoQtd}>
            {consultasDoDia.length > 0
              ? `${consultasDoDia.length} consulta${consultasDoDia.length > 1 ? 's' : ''}`
              : 'Nenhuma consulta'}
          </Text>
        </View>

        {consultasDoDia.length === 0 ? (
          <View style={styles.vazioCard}>
            <Text style={styles.vazioEmoji}>📅</Text>
            <Text style={styles.vazioTxt}>Nenhuma consulta neste dia</Text>
            <Text style={styles.vazioSub}>Toque em um dia marcado para ver suas consultas</Text>
          </View>
        ) : (
          consultasDoDia.map(c => (
            <View key={c.id} style={styles.consultaCard}>
              <View style={[styles.consultaIcone, { backgroundColor: c.cor + '20' }]}>
                <Text style={styles.consultaEmoji}>{c.emoji}</Text>
              </View>
              <View style={styles.consultaInfo}>
                <Text style={styles.consultaNome}>{c.profissional}</Text>
                <Text style={styles.consultaEsp}>{c.especialidade}</Text>
                <View style={styles.metaRow}>
                  <View style={[styles.horaBadge, { backgroundColor: c.cor + '15' }]}>
                    <Text style={[styles.horaTexto, { color: c.cor }]}>🕐 {c.hora}</Text>
                  </View>
                  <View style={[styles.modalBadge, { backgroundColor: c.modalidade === 'Online' ? '#E8F5EE' : '#FEF6E4' }]}>
                    <Text style={[styles.modalTexto, { color: c.modalidade === 'Online' ? '#3D9970' : '#E8A838' }]}>
                      {c.modalidade === 'Online' ? '💻' : '📍'} {c.modalidade}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ))
        )}

        {/* Próximas */}
        <Text style={styles.secaoTitulo}>Próximas consultas</Text>
        {CONSULTAS.filter(c => c.dia > diaSelecionado).slice(0, 3).map(c => (
          <View key={`p-${c.id}`} style={[styles.consultaCard, { opacity: 0.9 }]}>
            <View style={styles.proximaDataCol}>
              <Text style={styles.proximaDia}>{c.dia}</Text>
              <Text style={styles.proximaMes}>{MESES[mes].slice(0, 3)}</Text>
            </View>
            <View style={styles.dividerV} />
            <View style={[styles.consultaIcone, { backgroundColor: c.cor + '20' }]}>
              <Text style={styles.consultaEmoji}>{c.emoji}</Text>
            </View>
            <View style={styles.consultaInfo}>
              <Text style={styles.consultaNome}>{c.profissional}</Text>
              <Text style={styles.consultaEsp}>{c.especialidade} · {c.hora}</Text>
              <View style={[styles.modalBadge, { backgroundColor: c.modalidade === 'Online' ? '#E8F5EE' : '#FEF6E4', alignSelf: 'flex-start' }]}>
                <Text style={[styles.modalTexto, { color: c.modalidade === 'Online' ? '#3D9970' : '#E8A838' }]}>
                  {c.modalidade === 'Online' ? '💻' : '📍'} {c.modalidade}
                </Text>
              </View>
            </View>
          </View>
        ))}

        {CONSULTAS.filter(c => c.dia > diaSelecionado).length === 0 && (
          <View style={styles.vazioCard}>
            <Text style={styles.vazioEmoji}>✨</Text>
            <Text style={styles.vazioTxt}>Nenhuma consulta futura</Text>
          </View>
        )}

      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgMain },

  header: {
    backgroundColor: colors.blue,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
  },
  voltarBtn: { width: 34, height: 34, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  voltarTxt: { fontSize: 20, color: '#FFF', fontWeight: '600' },
  headerTitulo: { fontSize: 24, fontWeight: '700', color: colors.bgCard, marginBottom: 4 },
  headerSubtitulo: { fontSize: 13, color: 'rgba(255,255,255,0.75)' },

  scrollContent: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 40, gap: 12 },


  calendarioCard: {
    backgroundColor: colors.bgCard, borderRadius: 20,
    borderWidth: 1, borderColor: colors.border,
    paddingHorizontal: 12, paddingVertical: 10, gap: 6,
  },
  mesNav: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 },
  mesBtn: { width: 30, height: 30, borderRadius: 8, backgroundColor: colors.bgMain, alignItems: 'center', justifyContent: 'center' },
  mesBtnTexto: { fontSize: 20, color: colors.blue, fontWeight: '600' },
  mesTitulo: { fontSize: 14, fontWeight: '700', color: colors.textPrimary },

  semanaRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 2 },
  semanaTexto: { fontSize: 11, fontWeight: '600', color: colors.textMuted, width: `${100/7}%` as any, textAlign: 'center' },

  
  diasGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  diaCell: {
    width: `${100/7}%` as any,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  diaCellSel: { backgroundColor: colors.blue, borderRadius: 8 },
  diaCellHoje: { backgroundColor: colors.blueLight, borderRadius: 8 },
  diaTxt: { fontSize: 12, fontWeight: '500', color: colors.textPrimary },
  diaTxtSel: { color: colors.bgCard, fontWeight: '700' },
  diaTxtHoje: { color: colors.blue, fontWeight: '700' },
  dot: { width: 4, height: 4, borderRadius: 2, backgroundColor: colors.blue },
  dotBranco: { backgroundColor: colors.bgCard },

  // ── Seção ───────────────────────────────────────────────
  secaoHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
  secaoTitulo: { fontSize: 15, fontWeight: '700', color: colors.textPrimary },
  secaoQtd: { fontSize: 12, color: colors.textSecondary },

  // ── Cards de consulta ───────────────────────────────────
  consultaCard: {
    backgroundColor: colors.bgCard, borderRadius: 16,
    borderWidth: 1, borderColor: colors.border,
    padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12,
  },
  consultaIcone: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  consultaEmoji: { fontSize: 20 },
  consultaInfo: { flex: 1, gap: 3 },
  consultaNome: { fontSize: 13, fontWeight: '700', color: colors.textPrimary },
  consultaEsp: { fontSize: 12, color: colors.textSecondary },
  metaRow: { flexDirection: 'row', gap: 6, marginTop: 2 },
  horaBadge: { borderRadius: 6, paddingHorizontal: 7, paddingVertical: 2 },
  horaTexto: { fontSize: 11, fontWeight: '600' },
  modalBadge: { borderRadius: 6, paddingHorizontal: 7, paddingVertical: 2 },
  modalTexto: { fontSize: 11, fontWeight: '600' },

  // ── Próximas ────────────────────────────────────────────
  proximaDataCol: { alignItems: 'center', width: 32 },
  proximaDia: { fontSize: 16, fontWeight: '700', color: colors.blue },
  proximaMes: { fontSize: 11, color: colors.textMuted, fontWeight: '600' },
  dividerV: { width: 1, alignSelf: 'stretch', backgroundColor: '#F0F2F5' },

  // ── Vazio ───────────────────────────────────────────────
  vazioCard: {
    backgroundColor: colors.bgCard, borderRadius: 16,
    borderWidth: 1, borderColor: colors.border,
    padding: 24, alignItems: 'center', gap: 6,
  },
  vazioEmoji: { fontSize: 32 },
  vazioTxt: { fontSize: 13, fontWeight: '600', color: colors.textPrimary },
  vazioSub: { fontSize: 12, color: colors.textMuted, textAlign: 'center' },
})