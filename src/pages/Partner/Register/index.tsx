import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import CheckBox from '@react-native-community/checkbox';
import {mask} from '../../../functions/Mask';

import {PartnerRegister} from '../../../functions/PartnerRegister';

import {cnpj} from 'cpf-cnpj-validator';

import styles from './styles';

const Register: React.FC = () => {
  const navigation = useNavigation();
  const [isSelected, setSelection] = useState(false);
  const [razsocial, setRazsocial] = useState('');
  const [nomefant, setNomefant] = useState('');
  const [ccnpj, setCcnpj] = useState<string>('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [celular, setCelular] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [complemento, setComplemento] = useState('');
  const [numero, setNumero] = useState('');
  const [bairr, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [senha, setSenha] = useState('');
  const [csenha, setCsenha] = useState('');
  const [isCnpjValido, setIsCnpjValido] = useState(false);
  const [comprimentoCnpj, setComprimentoCnpj] = useState(14);

  function validacnpj(e: string) {
    if (!cnpj.isValid(e)) {
      Alert.alert('Por favor digite um CNPJ valido.');
      setIsCnpjValido(false);
      setComprimentoCnpj(14);
      setCcnpj(" ");
    }
    var e = mask.Cnpj(ccnpj);
    setComprimentoCnpj(18)
    setCcnpj(e);
    setIsCnpjValido(true);
  }

  function mTel(tel: string, e: string) {
    var t = '';
    if (e === 'tel') {
      t = '';
      t = mask.tel(tel);
      setTelefone(t);
    } else if (e === 'cel') {
      t = '';
      t = mask.tel(tel);
      setCelular(t);
    }
  }

  const CEP = async () => {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    if (response.data.erro)
      Alert.alert('CEP não encontrado!');
    const {bairro, logradouro, localidade, uf} = response.data;
    setBairro(bairro);
    setEndereco(logradouro);
    setCidade(localidade);
    setEstado(uf);
  };

  function checkPass() {
    if (csenha !== '' && senha !== csenha) {
      Alert.alert('Senhas não coincidem!');
      setSenha('');
      setCsenha('');
    }
    if (senha.length < 8) {
      Alert.alert('Minimo de 8 caracteres');
    }
  }

  function handleSubmit() {
    if (
      razsocial === '' ||
      nomefant === '' ||
      ccnpj === '' ||
      email === '' ||
      telefone === '' ||
      celular === '' ||
      cep === '' ||
      senha === '' ||
      cidade === ''
    ) {
      Alert.alert('Por favor preecha todos os campos');
    } else if (!isSelected) {
      Alert.alert('É necessario aceitar os termos para continuar');
    } else {
      if (isCnpjValido) {
        PartnerRegister(
          razsocial,
          nomefant,
          ccnpj,
          email,
          telefone,
          celular,
          cep,
          endereco,
          complemento,
          numero,
          bairr,
          cidade,
          estado,
          senha,
        );
        setTimeout(() => {
          navigation.navigate('Sempre Mais Barato');
        }, 2000);
      }
    }
  }

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.label}>Razão Social</Text>
          <TextInput
            placeholder="Razão social"
            style={styles.input}
            value={razsocial}
            onChangeText={setRazsocial}
          />

          <Text style={styles.label}>Nome fantasia</Text>
          <TextInput
            placeholder="Nome fantasia"
            value={nomefant}
            onChangeText={setNomefant}
            style={styles.input}
          />

          <Text style={styles.label}>CNPJ</Text>
          <TextInput
            placeholder="00.000.000/0001-00"
            style={styles.input}
            keyboardType="numeric"
            value={ccnpj}
            onChangeText={setCcnpj}
            maxLength={comprimentoCnpj}
            onBlur={() => validacnpj(ccnpj)}
          />

          <Text style={styles.label}>E-mail</Text>
          <TextInput
            placeholder="E-mail"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Telefone</Text>
          <TextInput
            placeholder="Telefone"
            style={styles.input}
            secureTextEntry={true}
            keyboardType="phone-pad"
            value={telefone}
            onChangeText={setTelefone}
            onBlur={() => mTel(telefone, 'tel')}
          />

          <Text style={styles.label}>Celular</Text>
          <TextInput
            placeholder="Celular"
            style={styles.input}
            secureTextEntry={true}
            keyboardType="phone-pad"
            value={celular}
            onChangeText={setCelular}
            onBlur={() => mTel(celular, 'cel')}
          />

          <Text style={styles.label}>CEP</Text>
          <TextInput
            placeholder="CEP"
            style={styles.input}
            keyboardType="numeric"
            onBlur={CEP}
            value={cep}
            onChangeText={setCep}
            maxLength={8}
          />

          <Text style={styles.label}>Endereço</Text>
          <TextInput
            placeholder="Endereço"
            style={styles.input}
            value={endereco}
            onChangeText={setEndereco}
            editable={false}
          />

          <Text style={styles.label}>Número</Text>
          <TextInput
            placeholder="Número"
            style={styles.input}
            value={numero}
            onChangeText={setNumero}
          />

          <Text style={styles.label}>Complemento</Text>
          <TextInput
            placeholder="Complemento"
            style={styles.input}
            value={complemento}
            onChangeText={setComplemento}
          />

          <Text style={styles.label}>Bairro</Text>
          <TextInput
            placeholder="Bairro"
            style={styles.input}
            value={bairr}
            onChangeText={setBairro}
            editable={false}
          />

          <Text style={styles.label}>Cidade</Text>
          <TextInput
            placeholder="Cidade"
            style={styles.input}
            value={cidade}
            onChangeText={setCidade}
            editable={false}
          />

          <Text style={styles.label}>Estado</Text>
          <TextInput
            placeholder="Estado"
            style={styles.input}
            value={estado}
            onChangeText={setEstado}
            editable={false}
          />

          <Text style={styles.label}>Senha</Text>
          <TextInput
            placeholder="Senha"
            style={styles.input}
            secureTextEntry={true}
            value={senha}
            onChangeText={setSenha}
            onBlur={checkPass}
          />

          <Text style={{marginLeft: '5%', fontWeight: 'bold'}}>A senha precisar ter no minimo 8 caracteres.</Text>

          <Text style={styles.label}>Confirmar senha</Text>
          <TextInput
            placeholder="Confirmar senha"
            style={styles.input}
            secureTextEntry={true}
            value={csenha}
            onChangeText={setCsenha}
            onBlur={checkPass}
          />
          <View style={styles.checkboxContainer}>
            <CheckBox
              disabled={false}
              value={isSelected}
              onValueChange={(newValue) => setSelection(newValue)}
              style={styles.checkbox}
            />
            <Text style={styles.labelTermos}>Aceitar termos.</Text>
          </View>

          <TouchableOpacity style={styles.botao} onPress={handleSubmit}>
            <Text style={styles.botaotext}>Finalizar cadastro</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default Register;
