import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { colors, typo, space, radius, rs } from '../../theme'

const profissional = {
  nome: 'Dra. Ana Souza',
  iniciais: 'AS',
  status: 'Disponível para novos agendamentos',
}

const resumo = [
  { emoji: '📅', numero: '4',  label: 'Hoje' },
  { emoji: '⏳', numero: '2',  label: 'Pendentes' },
  { emoji: '✅', numero: '18', label: 'Este mês' },
]

const agendaHoje = [
  { hora: '10:00', emoji: '🧒', corFundo: '#FDE8E8', nome: 'João Pedro Silva, 7 anos', detalhe: 'Psicologia · TEA Nível 1', tipo: 'Videochamada', tipoCor: colors.blueDark, tipoFundo: colors.blueLight },
  { hora: '11:00', emoji: '🧒', corFundo: '#FDE8E8', nome: 'Beatriz Almeida, 5 anos',  detalhe: 'Psicologia · TDAH',        tipo: 'Presencial',   tipoCor: colors.success, tipoFundo: colors.successBg },
  { hora: '14:00', emoji: '🧒', corFundo: '#EEF7E4', nome: 'Lucas Ferreira, 9 anos',   detalhe: 'Psicologia · Ansiedade',   tipo: 'Videochamada', tipoCor: colors.blueDark, tipoFundo: colors.blueLight },
  { hora: '16:00', emoji: '👨‍👩‍👧', corFundo: '#FEF3C7', nome: 'Grupo quinzenal · 6 famílias', detalhe: 'Atendimento gratuito · Online', tipo: 'Grupo', tipoCor: colors.warning, tipoFundo: colors.warningBg },
]

const solicitacoes = [
  { emoji: '🧒', corFundo: '#FDE8E8', nome: 'Sofia Martins, 6 anos', detalhe: 'Qua 8 abr · 09h00 · Videochamada' },
  { emoji: '🧒', corFundo: '#FEF3C7', nome: 'Miguel Costa, 8 anos',  detalhe: 'Sex 10 abr · 15h00 · Presencial' },
]

const faturamento = [
  { label: 'Consultas realizadas', valor: '18 sessões',    destaque: false },
  { label: 'Valor total recebido', valor: 'R$ 3.240,00',  destaque: true  },
  { label: 'Grupos gratuitos',     valor: '4 grupos',     destaque: false },
  { label: 'Avaliação média',      valor: '★ 4,9 / 5,0', destaque: false },
]

export default function HomeProfissionalScreen() {
  const insets = useSafeAreaInsets()

  return (
    <View style={styles.container}>

      <View style={[styles.header, { paddingTop: insets.top + space.md }]}>
        <View style={styles.headerTop}>
          <View style={{ flex: 1 }}>
            <Text style={styles.headerSub}>Bem-vinda de volta</Text>
            <Text style={styles.headerNome} numberOfLines={1}>{profissional.nome}</Text>
          </View>
          <View style={styles.avatar}>
            <Text style={styles.avatarTexto}>{profissional.iniciais}</Text>
          </View>
        </View>
        <View style={styles.statusBar}>
          <View style={styles.statusDot} />
          <Text style={styles.statusTexto} numberOfLines={1}>{profissional.status}</Text>
          <TouchableOpacity style={styles.alterarBtn}>
            <Text style={styles.alterarTexto}>Alterar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.secaoTitulo}>Resumo de hoje</Text>
        <View style={styles.resumoRow}>
          {resumo.map(item => (
            <View key={item.label} style={styles.resumoCard}>
              <Text style={styles.resumoEmoji}>{item.emoji}</Text>
              <Text style={styles.resumoNumero}>{item.numero}</Text>
              <Text style={styles.resumoLabel}>{item.label}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.secaoTitulo}>Agenda de hoje</Text>
        <View style={styles.listaCard}>
          {agendaHoje.map((item, i) => (
            <View key={i} style={[styles.agendaItem, i < agendaHoje.length - 1 && styles.separador]}>
              <Text style={styles.agendaHora}>{item.hora}</Text>
              <View style={[styles.agendaIcone, { backgroundColor: item.corFundo }]}>
                <Text style={styles.agendaEmoji}>{item.emoji}</Text>
              </View>
              <View style={styles.agendaInfo}>
                <Text style={styles.agendaNome} numberOfLines={1}>{item.nome}</Text>
                <Text style={styles.agendaDetalhe}>{item.detalhe}</Text>
              </View>
              <View style={[styles.tipoBadge, { backgroundColor: item.tipoFundo }]}>
                <Text style={[styles.tipoTexto, { color: item.tipoCor }]}>{item.tipo}</Text>
              </View>
            </View>
          ))}
        </View>

        <Text style={styles.secaoTitulo}>Solicitações pendentes</Text>
        <View style={styles.listaCard}>
          {solicitacoes.map((item, i) => (
            <View key={i} style={[styles.solicitacaoItem, i < solicitacoes.length - 1 && styles.separador]}>
              <View style={[styles.agendaIcone, { backgroundColor: item.corFundo }]}>
                <Text style={styles.agendaEmoji}>{item.emoji}</Text>
              </View>
              <View style={styles.agendaInfo}>
                <Text style={styles.agendaNome}>{item.nome}</Text>
                <Text style={styles.agendaDetalhe}>{item.detalhe}</Text>
              </View>
              <View style={styles.acoesRow}>
                <TouchableOpacity style={styles.recusarBtn}>
                  <Text style={styles.recusarTexto}>Recusar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.aceitarBtn}>
                  <Text style={styles.aceitarTexto}>Aceitar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        <Text style={styles.secaoTitulo}>Faturamento — março 2026</Text>
        <View style={styles.listaCard}>
          {faturamento.map((item, i) => (
            <View key={i} style={[styles.faturamentoItem, i < faturamento.length - 1 && styles.separador]}>
              <Text style={styles.faturamentoLabel}>{item.label}</Text>
              <Text style={[styles.faturamentoValor, item.destaque && styles.faturamentoDestaque]}>
                {item.valor}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgMain },

  header: {
    backgroundColor: colors.purpleDark,
    paddingHorizontal: space.lg,
    paddingBottom: space.lg,
    borderBottomLeftRadius: rs(20, 24, 28),
    borderBottomRightRadius: rs(20, 24, 28),
    gap: space.md,
  },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerSub: { fontSize: typo.xs, color: 'rgba(255,255,255,0.75)', marginBottom: 3 },
  headerNome: { fontSize: typo.xl, fontWeight: '700', color: colors.white },
  avatar: {
    width: rs(40, 44, 48),
    height: rs(40, 44, 48),
    borderRadius: radius.full,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: space.sm,
  },
  avatarTexto: { fontSize: typo.sm, fontWeight: '700', color: colors.white },
  statusBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: radius.md,
    paddingHorizontal: space.md,
    paddingVertical: space.sm,
    gap: space.sm,
  },
  statusDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#4ADE80', flexShrink: 0 },
  statusTexto: { flex: 1, fontSize: typo.xs, color: 'rgba(255,255,255,0.9)' },
  alterarBtn: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: radius.sm,
    paddingHorizontal: space.sm,
    paddingVertical: 4,
  },
  alterarTexto: { fontSize: typo.xs, fontWeight: '600', color: colors.white },

  scroll: { flex: 1 },
  scrollContent: { padding: space.lg, paddingBottom: rs(28, 32, 40), gap: space.sm },

  secaoTitulo: {
    fontSize: typo.xs,
    fontWeight: '700',
    color: colors.textSecondary,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginTop: space.sm,
  },

  resumoRow: { flexDirection: 'row', gap: space.sm },
  resumoCard: {
    flex: 1,
    backgroundColor: colors.bgCard,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: space.md,
    alignItems: 'center',
    gap: space.xs,
  },
  resumoEmoji: { fontSize: rs(20, 22, 24) },
  resumoNumero: { fontSize: rs(22, 24, 26), fontWeight: '700', color: colors.textPrimary },
  resumoLabel: { fontSize: typo.xs, color: colors.textSecondary, textAlign: 'center' },

  listaCard: {
    backgroundColor: colors.bgCard,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  separador: { borderBottomWidth: 1, borderBottomColor: '#F0F2F5' },

  agendaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: space.md,
    paddingVertical: space.sm,
    gap: space.sm,
  },
  agendaHora: {
    fontSize: typo.xs,
    fontWeight: '600',
    color: colors.textSecondary,
    width: rs(38, 42, 46),
    flexShrink: 0,
  },
  agendaIcone: {
    width: rs(34, 38, 42),
    height: rs(34, 38, 42),
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  agendaEmoji: { fontSize: rs(16, 18, 20) },
  agendaInfo: { flex: 1, minWidth: 0 },
  agendaNome: { fontSize: typo.xs, fontWeight: '700', color: colors.textPrimary, marginBottom: 2 },
  agendaDetalhe: { fontSize: typo.xs, color: colors.textSecondary },
  tipoBadge: { borderRadius: radius.sm, paddingHorizontal: space.sm, paddingVertical: 3, flexShrink: 0 },
  tipoTexto: { fontSize: typo.xs, fontWeight: '700' },

  solicitacaoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: space.md,
    paddingVertical: space.sm,
    gap: space.sm,
  },
  acoesRow: { flexDirection: 'row', gap: space.xs, flexShrink: 0 },
  recusarBtn: {
    borderRadius: radius.sm,
    paddingHorizontal: space.sm,
    paddingVertical: space.xs,
    backgroundColor: colors.warningBg,
  },
  recusarTexto: { fontSize: typo.xs, fontWeight: '600', color: colors.warning },
  aceitarBtn: {
    borderRadius: radius.sm,
    paddingHorizontal: space.sm,
    paddingVertical: space.xs,
    backgroundColor: colors.blue,
  },
  aceitarTexto: { fontSize: typo.xs, fontWeight: '600', color: colors.white },

  faturamentoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: space.md,
    paddingVertical: space.md,
  },
  faturamentoLabel: { fontSize: typo.sm, color: colors.textSecondary },
  faturamentoValor: { fontSize: typo.sm, fontWeight: '700', color: colors.textPrimary },
  faturamentoDestaque: { color: colors.success },
})
