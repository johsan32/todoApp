import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  FlatList,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import prompt from 'react-native-prompt-android';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';


export default function TodosScreen() {
  const navigation = useNavigation();
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);

  const saveTodos = async saveTodo => {
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(saveTodo));
    } catch (error) {
      console.warn('err', error);
    }
  };

  const addTodo = () => {
    if (todo) {
      const updateTodo = [...todos, {id: Date.now(), title: todo}];
      setTodos(updateTodo);
      saveTodos(updateTodo);
      setTodo('');
    }
  };
  const deleteTodo = id => {
    const deleteItem = todos?.filter(item => item.id !== id);
    setTodos(deleteItem);
    saveTodos(deleteItem);
    Toast.show({
      type: 'error',
      text1: 'Kayıt silindi...',
      position:"bottom"
    });
  };
  const deleteData = async () => {
    Alert.alert(
      'Kayıtları Sil',
      'Tüm kayıtlarınız silinecektir. Onaylıyor musunuz?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Ok',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('todos');
              // Burada başarılı bir şekilde silindiğine dair bir bildirim veya başka bir işlem yapabilirsiniz.
              console.log('Veriler silindi.');
              navigation.push('Todos');
              Toast.show({
                type: 'error',
                text1: 'Tüm kayıtları sildiniz...',
                position:"bottom"
              });
            } catch (err) {
              console.warn(err);
            }
          },
          style: 'default',
        },
      ],
    );
  };
  const updateTodos = id => {
    const findTodo = todos?.find(item => item.id === id);
    if (!findTodo) {
      return;
    }
    prompt(
      'Düzenle',
      '',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'default',
        },
        {
          text: 'OK',
          onPress: updateText => {
            if (updateText) {
              const updateTodo = todos.map(item =>
                item.id === id ? {...item, title: updateText} : item,
              );
              setTodos(updateTodo);
              saveTodos(updateTodo);
              Toast.show({
                type: 'info',
                text1: 'Bilgileri güncellediniz.',
                position:"bottom"
              });
            }
          },
        },
      ],
      {
        type: 'plain-text',
        cancelable: true,
        PromptStyleAndroid: 'default',
        defaultValue: findTodo.title,
        placeholder: 'placeholder',
      },
    );
    //ios platformu için
    Alert.prompt(
      'Düzenle',
      'Update',
      updateText => {
        if (updateText) {
          const updateTodo = todos.map(item =>
            item.id === id ? {...item, title: updateText} : item,
          );
          setTodos(updateTodo);
          saveTodos(updateTodo);
        }
      },
      'plain-text',
      findTodo.title,
    );

  };
  const loadData = async () => {
    try {
      const storageData = await AsyncStorage.getItem('todos');
      if (storageData) {
        setTodos(JSON.parse(storageData));
      }
    } catch (err) {
      console.warn(err);
    }
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.textHeader}>Todo App</Text>
        <TouchableOpacity onPress={deleteData}>
          {todos?.length === 0 ? (
            <Icon name="trash-o" size={30} color="gray" />
          ) : (
            <View style={{marginEnd: 10}}>
              <Icon name="bitbucket" size={30} color="#900" />
              <Text style={styles.iconText}>{todos.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Todo ekle"
          value={todo}
          onChangeText={title => setTodo(title)}
        />
        <View style={styles.iconContainer}>
          {!todo ? (
            <Icon name="plus" size={30} color="gray" style={styles.iconPlus} />
          ) : (
            <TouchableOpacity style={styles.btnAdd} onPress={addTodo}>
              <Text style={styles.textBtn}>Add</Text>
            </TouchableOpacity>
          )}
          {/* <Icon name="plus-square-o" size={30} color="gray" /> */}
          {/* <Text style={styles.textBtn}>Add</Text> */}
        </View>
      </View>

      <FlatList
        data={todos}
        keyExtractor={item => item.id?.toString()}
        renderItem={({item}) => (
          <View style={styles.listLine}>
            <Text style={styles.textTitle}>{item?.title}</Text>
            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={styles.btnDelete}
                onPress={() => deleteTodo(item?.id)}>
                <Icon
                  name="trash-o"
                  size={30}
                  color="red"
                  style={styles.iconPlus}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnDelete}
                onPress={() => updateTodos(item?.id)}>
                <Icon
                  name="pencil-square-o"
                  size={30}
                  color="green"
                  style={styles.iconPlus}
                />
              </TouchableOpacity>
            </View>
                
          </View>
          
        )}

      />
      <View>
      <Toast/>  
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, paddingHorizontal: 20, backgroundColor: '#f0ffff'},
  textHeader: {
    fontSize: 20,
    fontWeight: '800',
    marginVertical: 20,
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
  inputContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  listLine: {
    fontFamily: 'Poppins-Bold',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderBottomWidth: 0.5,
    borderBottomColor:"gray",

  },
  textTitle: {
    fontSize: 20, 
    fontFamily: 'Poppins-Regular', 
    marginBottom: 15,
    textTransform:"capitalize"
  },
  textDesc: {
    fontSize: 14
  },

  iconContainer: {
    width: 70,
  },
  iconText: {
    position: 'absolute',
    top: -10,
    right: -15,
    fontSize: 20,
    zIndex: 55,
    backgroundColor: 'gray',
    paddingHorizontal: 5,
    borderRadius: 100,
    color: 'white',
  },
  iconPlus: {
    paddingVertical: 10,
    borderRadius: 10,
    justifyContent: 'center',
    textAlign: 'center',
  },
  btnAdd: {
    fontFamily: 'Poppins-Italic',
    fontWeight: '800',
    borderRadius: 10,
    backgroundColor: 'blue',
    paddingVertical: 10,
  },
  textInput: {
    color: '#000',
    borderWidth: 1,
    flex: 1,
    borderRadius: 10,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    paddingHorizontal: 10,
  },
  textBtn: {color: 'white', textAlign: 'center', fontFamily: 'Poppins-Regular'},
  btnContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnInput: {
    paddingHorizontal: 20,
    marginLeft: 20,
    backgroundColor: 'blue',
    paddingVertical: 10,
  },
  btnDelete: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 10,
    tintColor: 'red',
  },
});
