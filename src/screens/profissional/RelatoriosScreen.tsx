import React, { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  LayoutChangeEvent,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { colors, typo, space, radius, rs } from '../../theme'

// ─── MOCK DATA ────────────────────────────────────────────────────────────────

const MESES = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun']
const consultasPorMes = [8, 12, 10, 15, 11, 18]
const faturamentoPorMes = [1440, 2160, 1800, 2700, 1980, 3240]

const sessoes = [
  { paciente: 'João Pedro Silva', idade: 7, tipo: 'Psicologia', data: '31 mar', horario: '10:00', modalidade: 'Videochamada', valor: 180 },
  { paciente: 'Beatriz Almeida', idade: 5, tipo: 'Psicologia', data: '31 mar', horario: '11:00', modalidade: 'Presencial', valor: 290 },
  { paciente: 'Lucas Ferreira', idade: 9, tipo: 'Psicologia', data: '30 mar', horario: '14:00', modalidade: 'Videochamada', valor: 180 },
  { paciente: 'Sofia Martins', idade: 6, tipo: 'Psicologia', data: '29 mar', horario: '09:00', modalidade: 'Presencial', valor: 290 },
  { paciente: 'Miguel Costa', idade: 8, tipo: 'Psicologia', data: '28 mar', horario: '15:00', modalidade: 'Videochamada', valor: 180 },
]

// ─── COMPONENTES INTERNOS ─────────────────────────────────────────────────────

function CardResumo({ label, valor, sub, cor, emoji }: {
  label: string; valor: string; sub: string; cor: string; emoji: string
}) {
  return (
    
    <View style={styles.cardResumo}>
      <View style={[styles.cardIcone, { backgroundColor: cor + '20' }]}>
        <Text style={{ fontSize: 18 }}>{emoji}</Text>
      </View>
      <Text style={styles.cardValor}>{valor}</Text>
      <Text style={styles.cardLabel}>{label}</Text>
      <Text style={styles.cardSub}>{sub}</Text>
    </View>
  )
}

function GraficoBarras({ dados, labels, cor }: {
  dados: number[]; labels: string[]; cor: string
}) {
  
  const [containerWidth, setContainerWidth] = useState(0)

  const handleLayout = (e: LayoutChangeEvent) => {
    setContainerWidth(e.nativeEvent.layout.width)
  }

  const maxVal = Math.max(...dados)
  const barWidth = containerWidth > 0
    ? (containerWidth / dados.length) - 8
    : 0

  return (
    <View style={styles.graficoBarras} onLayout={handleLayout}>
      {dados.map((val, i) => {
        const altura = Math.max((val / maxVal) * 90, 4)
        return (
          <View key={i} style={styles.barraWrapper}>
            <Text style={styles.barraTopo}>{val}</Text>
            <View style={styles.barraFundo}>
              <View style={[styles.barra, { height: altura, width: barWidth, backgroundColor: cor }]} />
            </View>
            <Text style={styles.barraLabel}>{labels[i]}</Text>
          </View>
        )
      })}
    </View>
  )
}

function TagModalidade({ tipo }: { tipo: string }) {
  const isVideo = tipo === 'Videochamada'
  return (
    <View style={[styles.tag, { backgroundColor: isVideo ? '#EDE9F7' : '#E8F5E9' }]}>
      <Text style={[styles.tagText, { color: isVideo ? '#7C5CBF' : '#388E3C' }]}>
        {tipo}
      </Text>
    </View>
  )
}

// ─── TELA PRINCIPAL ───────────────────────────────────────────────────────────

export default function RelatoriosScreen() {
  const navigation = useNavigation()
  const [periodoAtivo, setPeriodoAtivo] = useState('Mês')
  const periodos = ['Semana', 'Mês', 'Trimestre', 'Ano']

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => (navigation as any).goBack()} style={styles.voltarBtn}>
            <Text style={styles.voltarTxt}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitulo}>Relatórios</Text>
          <Text style={styles.headerSub}>Março 2026</Text>
        </View>

        {/* Filtro de período */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtroContainer}>
          {periodos.map((p) => (
            <TouchableOpacity
              key={p}
              onPress={() => setPeriodoAtivo(p)}
              style={[styles.filtroBotao, periodoAtivo === p && styles.filtroBotaoAtivo]}
            >
              <Text style={[styles.filtroTexto, periodoAtivo === p && styles.filtroTextoAtivo]}>
                {p}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Cards resumo 2x2 */}
        <View style={styles.cardsGrid}>
          <CardResumo label="Consultas" valor="18" sub="este mês" cor="#7C5CBF" emoji="📋" />
          <CardResumo label="Faturamento" valor="R$ 3.240" sub="este mês" cor="#4DA6FF" emoji="💰" />
          <CardResumo label="Avaliação" valor="4,9" sub="média geral" cor="#F5A623" emoji="⭐" />
          <CardResumo label="Grupos" valor="4" sub="ativos" cor="#6FCF97" emoji="👥" />
        </View>

        {/* Gráfico consultas */}
        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>Consultas realizadas</Text>
          <Text style={styles.secaoSub}>Últimos 6 meses</Text>
          <GraficoBarras dados={consultasPorMes} labels={MESES} cor="#7C5CBF" />
        </View>

        {/* Gráfico faturamento */}
        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>Faturamento</Text>
          <Text style={styles.secaoSub}>Últimos 6 meses · R$</Text>
          <GraficoBarras dados={faturamentoPorMes} labels={MESES} cor="#4DA6FF" />
        </View>

        {/* Sessões recentes */}
        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>Sessões recentes</Text>
          <Text style={styles.secaoSub}>Histórico de atendimentos</Text>
          {sessoes.map((s, i) => (
            <View key={i} style={styles.sessaoCard}>
              <View style={styles.sessaoAvatar}>
                <Text style={styles.sessaoAvatarText}>
                  {s.paciente.split(' ')[0][0]}{s.paciente.split(' ')[1][0]}
                </Text>
              </View>
              <View style={styles.sessaoInfo}>
                <Text style={styles.sessaoNome}>{s.paciente}, {s.idade} anos</Text>
                <Text style={styles.sessaoDetalhe}>{s.tipo} · {s.data} · {s.horario}</Text>
              </View>
              <View style={styles.sessaoDireita}>
                <TagModalidade tipo={s.modalidade} />
                <Text style={styles.sessaoValor}>R$ {s.valor}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Faturamento detalhado */}
        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>Faturamento — março 2026</Text>
          {[
            { label: 'Consultas realizadas', valor: '18 sessões', destaque: false },
            { label: 'Valor total recebido', valor: 'R$ 3.240,00', destaque: true },
            { label: 'Grupos gratuitos', valor: '4 grupos', destaque: false },
            { label: 'Avaliação média', valor: '4,9 / 5,0', destaque: false },
          ].map((item, i) => (
            <View key={i} style={styles.faturamentoLinha}>
              <Text style={styles.faturamentoLabel}>{item.label}</Text>
              <Text style={[styles.faturamentoValor, item.destaque && { color: '#7C5CBF', fontWeight: '700' }]}>
                {item.valor}
              </Text>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

// ─── ESTILOS ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F7F5FC' },
  scroll: { flex: 1 },
  content: { paddingBottom: 40 },

  header: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 8 },
  voltarBtn: { width: 34, height: 34, borderRadius: 10, backgroundColor: '#EDE9F7', alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  voltarTxt: { fontSize: 20, color: '#7C5CBF', fontWeight: '600' },
  headerTitulo: { fontSize: 24, fontWeight: '700', color: colors.textPrimary },
  headerSub: { fontSize: 13, color: '#888', marginTop: 2 },

  filtroContainer: { paddingHorizontal: 20, paddingBottom: 16, gap: 8, flexDirection: 'row' },
  filtroBotao: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#EDE9F7' },
  filtroBotaoAtivo: { backgroundColor: '#7C5CBF' },
  filtroTexto: { fontSize: 13, color: '#7C5CBF', fontWeight: '500' },
  filtroTextoAtivo: { color: '#fff' },

  // ✅ CORREÇÃO 1: width: '48%' — sem Dimensions
  cardsGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, gap: 12, marginBottom: 4 },
  cardResumo: {
    width: '48%',
    backgroundColor: '#fff', borderRadius: 16, padding: 16,
    shadowColor: '#7C5CBF', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08, shadowRadius: 8, elevation: 3,
  },
  cardIcone: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  cardValor: { fontSize: 20, fontWeight: '700', color: colors.textPrimary },
  cardLabel: { fontSize: 12, color: '#555', marginTop: 2 },
  cardSub: { fontSize: 12, color: '#AAA', marginTop: 1 },   // ✅ era 11

  secao: {
    marginHorizontal: 16, marginTop: 16,
    backgroundColor: '#fff', borderRadius: 16, padding: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 4, elevation: 1,
  },
  secaoTitulo: { fontSize: 15, fontWeight: '700', color: colors.textPrimary },
  secaoSub: { fontSize: 12, color: '#999', marginTop: 2, marginBottom: 16 },

  // ✅ CORREÇÃO 2: barWidth via onLayout — sem Dimensions
  graficoBarras: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', height: 130 },
  barraWrapper: { alignItems: 'center', flex: 1 },
  barraTopo: { fontSize: 12, color: '#888', marginBottom: 3 },  // ✅ era 9
  barraFundo: { height: 100, justifyContent: 'flex-end', alignItems: 'center', width: '100%' },
  barra: { borderRadius: 6, minHeight: 4 },
  barraLabel: { fontSize: 12, color: '#888', marginTop: 5 },    // ✅ era 10

  sessaoCard: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#F0EDF9', gap: 10,
  },
  sessaoAvatar: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: '#EDE9F7', justifyContent: 'center', alignItems: 'center',
  },
  sessaoAvatarText: { fontSize: 12, fontWeight: '700', color: '#7C5CBF' },
  sessaoInfo: { flex: 1 },
  sessaoNome: { fontSize: 13, fontWeight: '600', color: colors.textPrimary },
  sessaoDetalhe: { fontSize: 12, color: '#999', marginTop: 2 }, // ✅ era 11
  sessaoDireita: { alignItems: 'flex-end', gap: 4 },
  sessaoValor: { fontSize: 12, fontWeight: '700', color: '#7C5CBF' },

  tag: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  tagText: { fontSize: 12, fontWeight: '600' },                  // ✅ era 10

  faturamentoLinha: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#F5F3FB',
  },
  faturamentoLabel: { fontSize: 13, color: '#666' },
  faturamentoValor: { fontSize: 13, color: '#333', fontWeight: '600' },
})