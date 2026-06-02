import { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  Modal, Pressable, TextInput,
  KeyboardAvoidingView, Platform, LogBox
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Checkbox from 'expo-checkbox';
import { MaterialIcons } from '@expo/vector-icons';
import EmojiPicker from 'react-native-emoji-chooser';

LogBox.ignoreLogs(['Warning:']);

const tarefasIniciais = [
  { id: 1, nome: 'Estudar React Native', emoji: '📚', categoria: 'Estudos', feita: false },
  { id: 2, nome: 'Fazer exercícios', emoji: '🏋️', categoria: 'Saúde', feita: false },
  { id: 3, nome: 'Comprar mantimentos', emoji: '🛒', categoria: 'Casa', feita: true },
];

export default function App() {

  // estados
  const [tarefas, setTarefas] = useState(tarefasIniciais);
  const [modalAberto, setModalAberto] = useState(false);
  const [nome, setNome] = useState('');
  const [emoji, setEmoji] = useState('😊');
  const [categoria, setCategoria] = useState('');
  const [mostrarEmojis, setMostrarEmojis] = useState(false);

  // filtragem
  const incompletas = tarefas.filter(t => t.feita === false);
  const realizadas = tarefas.filter(t => t.feita === true);

  // data
  const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const hoje = new Date();
  const dataHoje = `${hoje.getDate()} de ${meses[hoje.getMonth()]}, ${hoje.getFullYear()}`;

  // funções
  function marcarTarefa(id) {
    const novaLista = tarefas.map(function(tarefa) {
      if (tarefa.id === id) {
        return { ...tarefa, feita: !tarefa.feita };
      }
      return tarefa;
    });
    setTarefas(novaLista);
  }

  function adicionarTarefa() {
    if (nome.trim() === '') {
      return;
    }

    const novaTarefa = {
      id: Date.now(),
      nome: nome,
      emoji: emoji,
      categoria: categoria || 'Geral',
      feita: false,
    };

    setTarefas([...tarefas, novaTarefa]);
    setNome('');
    setEmoji('😊');
    setCategoria('');
    setMostrarEmojis(false);
    setModalAberto(false);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <Text style={styles.titulo}>LISTA TAREFA</Text>
      <Text style={styles.data}>{dataHoje}</Text>
      <Text style={styles.subtitulo}>
        {incompletas.length} incompletas, {realizadas.length} realizadas
      </Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.tituloSecao}>Incompletas</Text>
        {incompletas.map(tarefa => (
          <View key={tarefa.id} style={styles.linhaTarefa}>
            <Checkbox
              value={false}
              onValueChange={() => marcarTarefa(tarefa.id)}
              color="#7c83fd"
              style={styles.checkbox}
            />
            <View>
              <Text style={styles.nomeTarefa}>{tarefa.nome}</Text>
              <Text style={styles.categoriaTarefa}>{tarefa.emoji} {tarefa.categoria}</Text>
            </View>
          </View>
        ))}

        <Text style={[styles.tituloSecao, { marginTop: 28 }]}>Realizadas</Text>
        {realizadas.map(tarefa => (
          <View key={tarefa.id} style={styles.linhaTarefa}>
            <Checkbox
              value={true}
              onValueChange={() => marcarTarefa(tarefa.id)}
              color="#7c83fd"
              style={styles.checkbox}
            />
            <View>
              <Text style={[styles.nomeTarefa, styles.nomeRiscado]}>{tarefa.nome}</Text>
              <Text style={[styles.categoriaTarefa, { color: '#494967' }]}>
                {tarefa.emoji} {tarefa.categoria}
              </Text>
            </View>
          </View>
        ))}

        <View style={{ height: 100 }} />
      </ScrollView>

      <Pressable style={styles.fab} onPress={() => setModalAberto(true)}>
        <MaterialIcons name="add" size={32} color="#fff" />
      </Pressable>

      <Modal
        visible={modalAberto}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalAberto(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setModalAberto(false)}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Pressable style={styles.caixaModal} onPress={e => e.stopPropagation()}>

              <Text style={styles.tituloModal}>Tarefa Nova</Text>

              <TextInput
                style={styles.input}
                placeholder="Nome da tarefa"
                placeholderTextColor="#555570"
                value={nome}
                onChangeText={setNome}
              />

              <Pressable
                style={styles.botaoEmoji}
                onPress={() => setMostrarEmojis(!mostrarEmojis)}
              >
                <Text style={styles.textoBotaoEmoji}>{emoji}  Escolher emoji</Text>
              </Pressable>

              {mostrarEmojis && (
                <View style={{ height: 250, flexShrink: 1 }}>
                  <EmojiPicker
                    onSelect={(emojiEscolhido) => {
                      setEmoji(emojiEscolhido);
                      setMostrarEmojis(false);
                    }}
                  />
                </View>
              )}

              <TextInput
                style={styles.input}
                placeholder="Categoria"
                placeholderTextColor="#555570"
                value={categoria}
                onChangeText={setCategoria}
              />

              <Pressable style={styles.botaoAdicionar} onPress={adicionarTarefa}>
                <Text style={styles.textoBotaoAdicionar}>Adicionar</Text>
              </Pressable>

            </Pressable>
          </KeyboardAvoidingView>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d1f',
    paddingTop: 64,
    paddingHorizontal: 24,
  },
  titulo: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  data: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  subtitulo: {
    color: '#ffffff',
    fontSize: 14,
    marginTop: 6,
    marginBottom: 28,
  },
  tituloSecao: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 14,
  },
  linhaTarefa: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    gap: 14,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
  },
  nomeTarefa: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  nomeRiscado: {
    textDecorationLine: 'line-through',
    color: '#555570',
    fontWeight: '400',
  },
  categoriaTarefa: {
    color: '#6b6b8a',
    fontSize: 12,
    marginTop: 3,
  },
  fab: {
    position: 'absolute',
    bottom: 36,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#7c83fd',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  caixaModal: {
    backgroundColor: '#16163a',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
  },
  tituloModal: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#0d0d1f',
    color: '#fff',
    borderRadius: 10,
    padding: 14,
    fontSize: 15,
    marginBottom: 12,
  },
  botaoEmoji: {
    backgroundColor: '#0d0d1f',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
  },
  textoBotaoEmoji: {
    color: '#fff',
    fontSize: 15,
  },
  botaoAdicionar: {
    backgroundColor: '#7c83fd',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    flexShrink: 0,
  },
  textoBotaoAdicionar: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
