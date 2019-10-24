import React, { Component } from 'react';
import {Alert,Button,FlatList,SafeAreaView,StyleSheet,Text, View } from 'react-native';

const styles = StyleSheet.create({
    botoes:{
        width: 100,
        height: 50,
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
        backgroundColor: "transparent"
    },
    componente: {
        alignItems: "center",
        backgroundColor: "black",
        width: 10,
        height: 10,
        margin: 1,
    },
    text: {
        color: "#333333"
    }
});


var textElem = React.createElement(Text, [], ['Hello world!']);
var textEle = React.createElement(Text, [], ['ops!12']);
const tamMatriz = 25;
var numeroQuadrosInicio=4;
var numeroQuadroAlimento=0;
var criado=true;
var quadro=0, x=0,y=13;
var direcao="direita";
//var quadros=[{q: 0}];//outro modo e declarar
var quadros=[325];
var contador=0,tamanhoSnake=6;
var encontrouAlimento=false;
var dadosIntervaloDeTempo;
var andou=true;
export default class HelloWorldApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      timeNow: this.timeNow(),
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
    return (
    <View style={{justifyContent: "center",alignItems: "center"}}>
        <View>
        <Text style={{fontSize: 20}}>Pontuação: {this.state.timeNow} </Text>
        </View>


        <View style={{flexWrap:'wrap',flexDirection: 'row',width: 300, height: 300, backgroundColor: 'skyblue'}} >
              <SafeAreaView>
              <FlatList
              data={createSnake(this.state.data)}
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
        <Text style={{fontSize: 20}}>Comandos</Text>
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
        timeNow: this.timeNow(),
      });
    }, 1000);
  }
  timeNow() {
   // i=i+1;
    //return i;
      //return 'oiii'+contador;
      andou=true;
      return contador;
    if(i==1)
    return this.r();

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

function  createSnake(data) {
    while (criado) {
        data.push({
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
    var cont=0;
    for (cont = 0; cont < 625; cont++) {
        data[cont].empty=true;
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
        data[quadros[cont]].empty=false;
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
    data[numeroQuadroAlimento].empty = false;
    verificaSeBateu(quadros);

    return data;

}

function createAlimento() {
    numero=0;
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

function verificaSeBateu(array) {
    var i = 0, j = 0;

    for (i = 0; i < array.length; i++) {
        var cont = 0;
        for (j = 0; j < array.length; j++) {
            if (array[i] == array[j]) {
                cont++;
            }
            if (cont == 2) {
                clearInterval(dadosIntervaloDeTempo);
                alert("Game over!\nSua pontuação: "+contador);
                direcao="stop";
            }
        }
    }
}

