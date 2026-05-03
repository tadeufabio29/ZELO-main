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

// ── Helpers ────────────────────────────────────────────────
const MESES = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']
const DIAS_SEMANA = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb']


function gerarDiasDoMes(ano: number, mes: number) {
  const primeiroDia = new Date(ano, mes, 1).getDay()
  const totalDias = new Date(ano, mes + 1, 0).getDate()
  const dias: (number | null)[] = Array(primeiroDia).fill(null)
  for (let i = 1; i <= totalDias; i++) dias.push(i)
  return dias
}

const consultasPorDia: Record<number, {
  hora: string; emoji: string; corFundo: string; nome: string
  detalhe: string; tipo: string; tipoCor: string; tipoFundo: string
}[]> = {
  26: [
    { hora: '09:00', emoji: '🧒', corFundo: colors.dangerBg, nome: 'Sofia Martins, 6 anos', detalhe: 'Psicologia · TEA Nível 1', tipo: 'Videochamada', tipoCor: '#2A7ABF', tipoFundo: colors.blueLight },
    { hora: '11:00', emoji: '🧒', corFundo: colors.warningBg, nome: 'Miguel Costa, 8 anos', detalhe: 'Psicologia · TDAH', tipo: 'Presencial', tipoCor: colors.success, tipoFundo: colors.successBg },
    { hora: '14:00', emoji: '🧒', corFundo: colors.successBg, nome: 'Lucas Ferreira, 9 anos', detalhe: 'Psicologia · Ansiedade', tipo: 'Videochamada', tipoCor: '#2A7ABF', tipoFundo: colors.blueLight },
    { hora: '16:00', emoji: '👨‍👩‍👧', corFundo: '#F0EBFF', nome: 'Grupo quinzenal · 6 famílias', detalhe: 'Atendimento gratuito · Online', tipo: 'Grupo', tipoCor: colors.purpleDark, tipoFundo: '#F0EBFF' },
  ],
  28: [
    { hora: '10:00', emoji: '🧒', corFundo: colors.dangerBg, nome: 'João Pedro Silva, 7 anos', detalhe: 'Psicologia · TEA Nível 1', tipo: 'Videochamada', tipoCor: '#2A7ABF', tipoFundo: colors.blueLight },
    { hora: '14:00', emoji: '🧒', corFundo: colors.warningBg, nome: 'Beatriz Almeida, 5 anos', detalhe: 'Psicologia · TDAH', tipo: 'Presencial', tipoCor: colors.success, tipoFundo: colors.successBg },
  ],
}

const diasComConsulta = Object.keys(consultasPorDia).map(Number)

export default function AgendaProfissionalScreen() {
  const navigation = useNavigation()
  const insets = useSafeAreaInsets()

  
  const hoje = new Date()
  const [ano, setAno] = useState(hoje.getFullYear())
  const [mes, setMes] = useState(hoje.getMonth())
  const [diaSelecionado, setDiaSelecionado] = useState(hoje.getDate())

  const dias = gerarDiasDoMes(ano, mes)
  const consultas = consultasPorDia[diaSelecionado] ?? []

  const mesAnterior = () => {
    if (mes === 0) { setMes(11); setAno(a => a - 1) }
    else setMes(m => m - 1)
    setDiaSelecionado(1)
  }

  const proximoMes = () => {
    if (mes === 11) { setMes(0); setAno(a => a + 1) }
    else setMes(m => m + 1)
    setDiaSelecionado(1)
  }

  return (
    <View style={styles.container}>

      {/* Header roxo */}
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity onPress={() => (navigation as any).goBack()} style={styles.voltarBtn}>
          <Text style={styles.voltarTxt}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitulo}>Minha Agenda</Text>
        <Text style={styles.headerSubtitulo}>{MESES[mes]} {ano}</Text>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Calendário */}
        <View style={styles.calendarioCard}>

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

          {/* Grid de dias — igual ao familiar */}
          <View style={styles.diasGrid}>
            {dias.map((dia, index) => {
              if (!dia) return <View key={`empty-${index}`} style={styles.diaCell} />
              const isHoje = dia === hoje.getDate() && mes === hoje.getMonth() && ano === hoje.getFullYear()
              const isSelecionado = dia === diaSelecionado
              const temConsulta = diasComConsulta.includes(dia)

              return (
                <TouchableOpacity
                  key={`dia-${dia}`}
                  style={[
                    styles.diaCell,
                    isSelecionado && styles.diaCellSelecionado,
                    isHoje && !isSelecionado && styles.diaCellHoje,
                  ]}
                  onPress={() => setDiaSelecionado(dia)}
                >
                  <Text style={[
                    styles.diaCellTexto,
                    isSelecionado && styles.diaCellTextoSelecionado,
                    isHoje && !isSelecionado && styles.diaCellTextoHoje,
                  ]}>
                    {dia}
                  </Text>
                  {temConsulta && (
                    <View style={[styles.consultaDot, isSelecionado && styles.consultaDotBranco]} />
                  )}
                </TouchableOpacity>
              )
            })}
          </View>
        </View>

        {/* Lista de consultas do dia */}
        <View style={styles.secaoHeader}>
          <Text style={styles.secaoTitulo}>
            {diaSelecionado === hoje.getDate() && mes === hoje.getMonth()
              ? 'Hoje'
              : `${diaSelecionado} de ${MESES[mes]}`}
          </Text>
          <Text style={styles.secaoQtd}>
            {consultas.length > 0
              ? `${consultas.length} consulta${consultas.length > 1 ? 's' : ''}`
              : 'Nenhuma consulta'}
          </Text>
        </View>

        {consultas.length === 0 ? (
          <View style={styles.vazioCard}>
            <Text style={styles.vazioEmoji}>📭</Text>
            <Text style={styles.vazioTexto}>Nenhuma consulta neste dia</Text>
          </View>
        ) : (
          <View style={styles.consultasCard}>
            {consultas.map((item, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.consultaItem, i < consultas.length - 1 && styles.consultaItemBorder]}
              >
                <Text style={styles.consultaHora}>{item.hora}</Text>
                <View style={[styles.consultaIcone, { backgroundColor: item.corFundo }]}>
                  <Text style={styles.consultaEmoji}>{item.emoji}</Text>
                </View>
                <View style={styles.consultaInfo}>
                  <Text style={styles.consultaNome}>{item.nome}</Text>
                  <Text style={styles.consultaDetalhe}>{item.detalhe}</Text>
                </View>
                <View style={[styles.tipoBadge, { backgroundColor: item.tipoFundo }]}>
                  <Text style={[styles.tipoTexto, { color: item.tipoCor }]}>{item.tipo}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgMain },

  header: {
    backgroundColor: colors.purpleDark,
    paddingHorizontal: 20,
    paddingBottom: 24,
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
  },
  voltarBtn: { width: 34, height: 34, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  voltarTxt: { fontSize: 20, color: '#FFF', fontWeight: '600' },
  headerTitulo: { fontSize: 24, fontWeight: '700', color: colors.bgCard, marginBottom: 4 },
  headerSubtitulo: { fontSize: 13, color: 'rgba(255,255,255,0.75)' },

  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 32, gap: 12 },

  // Calendário — idêntico ao familiar
  calendarioCard: {
    backgroundColor: colors.bgCard, borderRadius: 20,
    borderWidth: 1, borderColor: colors.border,
    paddingHorizontal: 12, paddingVertical: 10, gap: 6,
  },
  mesNav: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 },
  mesBtn: { width: 30, height: 30, borderRadius: 8, backgroundColor: colors.bgMain, alignItems: 'center', justifyContent: 'center' },
  mesBtnTexto: { fontSize: 20, color: colors.purpleDark, fontWeight: '600' },
  mesTitulo: { fontSize: 14, fontWeight: '700', color: colors.textPrimary },

  semanaRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 2 },
  semanaTexto: { fontSize: 11, fontWeight: '600', color: colors.textMuted, width: `${100/7}%` as any, textAlign: 'center' },

  // ✅ Altura fixa 32px — sem aspectRatio que estica em tablet/web
  diasGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  diaCell: {
    width: `${100/7}%` as any,
    height: 32,
    alignItems: 'center', justifyContent: 'center', gap: 2,
  },
  diaCellSelecionado: { backgroundColor: colors.purpleDark, borderRadius: 8 },
  diaCellHoje: { backgroundColor: colors.purpleLight, borderRadius: 8 },
  diaCellTexto: { fontSize: 12, fontWeight: '500', color: colors.textPrimary },
  diaCellTextoSelecionado: { color: colors.bgCard, fontWeight: '700' },
  diaCellTextoHoje: { color: colors.purpleDark, fontWeight: '700' },
  consultaDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: colors.purpleDark },
  consultaDotBranco: { backgroundColor: colors.bgCard },

  secaoHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
  secaoTitulo: { fontSize: 15, fontWeight: '700', color: colors.textPrimary },
  secaoQtd: { fontSize: 12, color: colors.textSecondary },

  vazioCard: {
    backgroundColor: colors.bgCard, borderRadius: 16,
    borderWidth: 1, borderColor: colors.border,
    padding: 32, alignItems: 'center', gap: 10,
  },
  vazioEmoji: { fontSize: 32 },
  vazioTexto: { fontSize: 13, color: colors.textMuted },

  consultasCard: {
    backgroundColor: colors.bgCard, borderRadius: 16,
    borderWidth: 1, borderColor: colors.border, overflow: 'hidden',
  },
  consultaItem: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 14, paddingVertical: 12, gap: 10,
  },
  consultaItemBorder: { borderBottomWidth: 1, borderBottomColor: '#F0F2F5' },
  consultaHora: { fontSize: 12, fontWeight: '600', color: colors.textSecondary, width: 42 },
  consultaIcone: { width: 38, height: 38, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  consultaEmoji: { fontSize: 20 },
  consultaInfo: { flex: 1 },
  consultaNome: { fontSize: 12, fontWeight: '700', color: colors.textPrimary, marginBottom: 2 },
  consultaDetalhe: { fontSize: 12, color: colors.textSecondary },
  tipoBadge: { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 },
  tipoTexto: { fontSize: 12, fontWeight: '700' },
})