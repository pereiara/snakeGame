

import React, { Component } from 'react';
import {Alert,Button,FlatList,SafeAreaView,StyleSheet,Text, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    botoes:{
        width: wp('24%'),
        height: hp('7%'),
        margin: 5,
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    bigBlue: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 30,
    },
    red: {
        color: 'red',
    },
    itemEmpty: {
        backgroundColor: "skyblue"
    },
    componente: {
        alignItems: "center",
        backgroundColor: "black",
        width: wp('2,5%'),
        height:wp('2,5%'),
        margin: 1,
        padding: 1,
    },
    text: {
        color: "#333333"
    }
});


var textElem = React.createElement(Text, [], ['Hello world!']);
var textEle = React.createElement(Text, [], ['ops!12']);
const tamMatriz = 25;
let numeroQuadrosInicio=4;
let numeroQuadroAlimento=0;
let criado=true;
let quadro=0, x=0,y=13;
let direcao="direita";
//var quadros=[{q: 0}];//outro modo e declarar
let quadros=[325];
let contador=0,tamanhoSnake=6;
let fixo=0;
let encontrouAlimento=false;
let dadosIntervaloDeTempo;
let andou=true;
let mostrouMsg=true;
let dados=[{ id: 0,empty: true},
    { id: 1,empty: true},
    { id: 2,empty: true},
    { id: 3,empty: false},];
//todas as variáveis devem ser conhecidas
let numero=0, cont=0;
let nomeUsu;


let Page2 = (

    class Snake extends Component {

    constructor(props) {
        super(props);
        reset();
        this.state = {
           timeNow: this.getPontuacao(),
           data: [
                { id: 0,empty: true},
                { id: 1,empty: true},
                { id: 2,empty: true},
                { id: 3,empty: false},
            ],
        };

        numeroQuadroAlimento=createAlimento();


    }



    render() {
        nomeUsu=this.props.navigation.getParam('nome');
        return (
            <View style={{justifyContent: "center",alignItems: "center",}}>
    <View>
        <Text>Pontuação: {this.getPontuacao()} </Text>
        </View>


        <View style={{flexWrap:'wrap',flexDirection: 'row', backgroundColor: 'skyblue',borderColor: 'black',borderWidth: 1,}} >
    <SafeAreaView>
        <FlatList
        data={createSnake(this.props.navigation)}
        keyExtractor={item => item.id}
        numColumns={tamMatriz}
        renderItem={({ item }) => {
            if (item.empty) {
                return <View style={[styles.componente, styles.itemEmpty]} />;
            }else
                return (
                    <View style={styles.componente}/>
        );
        }}
        />
        </SafeAreaView>
        </View>

        <View style={{}}>
    <Text>Comandos</Text>
        </View>

        <View style={{justifyContent: "center",alignItems: "center",}}>
    <View style={styles.botoes}>
            <Button
        title=" up   button"
        onPress={this.direcaoCima}
        />

        </View>

        <View style={styles.fixToText}>
            <View style={styles.botoes}>
            <Button
        title="Left  button"
        onPress={this.direcaoEsquerda}
        />

        </View>

        <View style={styles.botoes}>
            <Button
        title="Right button"
        onPress={this.direcaoDireita}
        />
        </View>

        </View>

        <View style={styles.botoes}>
            <Button
        title="down  button"
        onPress={this.direcaoBaixo}
        />
        </View>

        </View>

        </View>
    );
    }

    componentDidMount(){
           dadosIntervaloDeTempo=setInterval(() => {
                   this.setState({
                       timeNow: this.getPontuacao()
                   });//alert("olá");
           }, 400);
    }
    getPontuacao() {
        // i=i+1;
        //return i;
        //return 'oiii'+contador;

        andou=true;
        return contador;
        //if(i==1)
        //  return this.r();

    }
    direcaoDireita(){
        if(andou) {
            if (direcao != "esquerda"){
                direcao = "direita";
            }
            andou=false;
        }
    }

    direcaoEsquerda(){
        if(andou) {
            if (direcao != "direita") {
                direcao = "esquerda";
            }
            andou=false;
        }
    }

    direcaoCima(){
        if(andou) {
            if (direcao != "baixo"){
                direcao = "cima";
            }
            andou=false;
        }
    }
    direcaoBaixo(){
        if(andou) {
            if (direcao != "cima") {
                direcao = "baixo";
            }
            andou=false;
        }
    }

}

);

function  createSnake(navegaTela) {
    while (criado) {
        dados.push({
            id: numeroQuadrosInicio,
            empty: true
        });
        if(numeroQuadrosInicio>=624){
            criado=false;
            numeroQuadrosInicio=4;
        }
        numeroQuadrosInicio++;
    }


    //alert(data[1].empty)
    //numeroQuadros1++;

    //data[numeroQuadros2].empty=true;

    for (cont = 0; cont < 625; cont++) {
        dados[cont].empty=true;
    }
    //x é a coluna; y é linha

    //alert(direcao);

    if (direcao=="direita") {
        if(x==24){
            x=-1;
        }
        x++;
    }

    if (direcao=="esquerda") {
        if(x==0){
            x=25;
        }
        x--;
    }



    if (direcao=="cima") {
        if(y==0){
            y=25;
        }
        y--;
    }

    if (direcao=="baixo") {
        if(y==24){
            y=-1;
        }
        y++;
    }



    quadro=(y*tamMatriz)+x;
    //x++;
    //alert(quadros[1].q);

    quadros.push(quadro);

    for (cont=0;cont<quadros.length;cont++){
        dados[quadros[cont]].empty=false;
    }

    //removendo o item,
    if(contador>=tamanhoSnake) {
        quadros.splice(0,1);
        contador--;
    }
    contador++;
    //quadros[0].remove();

    // data[quadro].empty=false;

    //alimento
    encontrou(quadros,numeroQuadroAlimento);
    if(encontrouAlimento) {
        numeroQuadroAlimento = createAlimento();
    }
    dados[numeroQuadroAlimento].empty = false;
    verificaSeBateu(quadros, navegaTela);

    return dados;

}

function createAlimento() {

    numero = Math.floor(Math.random() * 625);
    encontrouAlimento=false;
    return numero;
}

function encontrou(array,n) {
    var i=0;
    for (i=0;i<array.length;i++) {
        if(array[i]==n){
            encontrouAlimento=true;
            tamanhoSnake++;
            //alert("ok");
        }
    }

}

function verificaSeBateu(array,navegaTela) {
    let i = 0, j = 0;

    for (i = 0; i < array.length; i++) {
        let cont = 0;
        for (j = 0; j < array.length; j++) {
            if (array[i] == array[j]) {
                cont++;
            }
            if (cont == 2) {
                //alert(cont);
                //direcao="stop";
                clearInterval(dadosIntervaloDeTempo);
                if(mostrouMsg){
                    alert("Game over!\nSua pontuação: "+contador);
                    mostrouMsg=false;
                }

                //contador=0;
                //reset(contador);
                navegaTela.navigate('finish',{nome: nomeUsu,pontos: contador});
                break;
                //reset(contador);
               // this.props.navigation.navigate('finish');
                //this.navigate('finish');
            }
        }
    }
}

function reset(){
     numeroQuadrosInicio=4;
     numeroQuadroAlimento=createAlimento();
     criado=true;
     quadro=0, x=0,y=13;
     direcao="direita";
     quadros=[325];
     contador=0,tamanhoSnake=5;
     encontrouAlimento=false;
     andou=true;
     mostrouMsg=true;
     dados=[{ id: 0,empty: true},
        { id: 1,empty: true},
        { id: 2,empty: true},
        { id: 3,empty: false},];
     numero=0, cont=0;
     //return n;
     //Page2 = (new Snake());
}

Page2.navigationOptions = {
    title: 'Snake',
}

export default Page2;