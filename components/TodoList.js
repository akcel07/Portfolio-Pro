import React , { useState } from "react";
import { StyleSheet, View, TextInput, Button, Text, FlatList, Switch } from 'react-native';

import todoData from '../Helpers/todoData';
import TodoItem from './TodoItem';


export default function TodoList(){
    const [todo, setTodo] = useState(todoData);
    const [count, setcount] = useState(todoData.filter((item)=>item.done).length);
    const [newTodoText, setNewTodoText] = useState("");
    const [filter, setFilter] = useState("all");

    const onToggleDone = (id,newValue)=>{
        setTodo(prev=>prev.map(t=> t.id===id? { ...t,done:newValue} : t));
        setcount(prev=> newValue ? prev+1 : prev -1);

    }
    const deleteTodo=(id)=>{
        const newTodos= todo.filter(item => item.id !== id)
        setTodo(newTodos);
        setcount(newTodos.filter(item => item.done).length)
    }
    const addNewTodo=()=>{
        if(newTodoText.trim()==="") return ;
        const newTodo={
            id:todo.length +1,
            content :newTodoText,
            done : false
        }
        setTodo(prev => [...prev, newTodo]); //cree un nv tab todo avec toute les anciennes val et newTodo
        setNewTodoText("");
    }
        const checkAll = () => {
            setTodo(prev => {
                const newTodos = prev.map(t => ({ ...t, done: true }));
                setcount(newTodos.filter(t => t.done).length);
                return newTodos;
            });
    };

    const checkNone = () => {
        setTodo(prev => {
            const newTodos = prev.map(t => ({ ...t, done: false }));
            setcount(newTodos.filter(t => t.done).length);
            return newTodos;
        });
    };

    const filtrer = todo.filter(t=>{
        if (filter==="all") return true ;
        if (filter == "done") return t.done;
        if (filter== "notDone") return !t.done;
    });

    

    return (
        <View>

   

          <TextInput
            onChangeText={setNewTodoText}
            placeholder='saisir ici un nouvel item'
            onSubmitEditing={addNewTodo}
            value={newTodoText}
      />
            <Button title="New" onPress={addNewTodo} />
            <Text> Le nombre de taches effectuées est : {count}</Text>
            <Button title="tout cocher" onPress={checkAll} />
            <Button title="tout décocher" onPress={checkNone} />

            <Button title="afficher Tout" onPress={()=>setFilter("all")} />
            <Button title="afficher les taches faites" onPress={()=>setFilter("done")} />
            <Button title="afficher les taches non faites" onPress={()=>setFilter("notDone")} />
            <FlatList
                style={{ paddingLeft: 10 }}
                data={filtrer}
                renderItem={({item}) => <TodoItem item={item} onToggleDone={onToggleDone} onDelete={deleteTodo}/>} />
        </View>
    );
}