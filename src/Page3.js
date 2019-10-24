import React,{ Component } from 'react';
import { View, Button, Text } from 'react-native';
//let url='http://10.4.4.110:3000/atualizando';
let urlEnvia='';
let url='https://caed2011.glitch.me';
let name="ola";
let pontos=5;
let ns;

class Page3 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            msgCarregando: "Carregando...",
            carregou: false,
            rank: [
                {codigo:1, nome:"nome1 ",pontos:0},
                {codigo:2, nome:"nome2 ",pontos:0},
                {codigo:3, nome:"nome3 ",pontos:0},
                {codigo:4, nome:"nome4 ",pontos:0},
                {codigo:5, nome:"nome5 ",pontos:0}
            ],
        };


        name=props.navigation.getParam('nome');
        pontos=props.navigation.getParam('pontos',0);
        if(name.length==0){
            name='Anônimo';
        }
        //envia('quase lá',9);
        urlEnvia=montaUrl(name,pontos);

       // envia(name,pontos);
    }
    componentDidMount() {

       //alert("estou aqui");
        return fetch(urlEnvia)
            .then((response) => response.json())
            .then((reponseJson) => {
                this.setState({
                    carregou:true,
                    rank: reponseJson,
                    msgCarregando:"",
                })
            })
        .catch((err)=>{
            alert("talvez esteja sem conexão...");
            //alert("Problema de conexão");
           console.log(err);
        })

    }

    render() {

      //  name=this.props.navigation.getParam('nome');
        //pontos=this.props.navigation.getParam('pontos',0);
        //alert(this.state.carregou);
        if(this.state.carregou){
            ns=this.state.rank.map((val,codigo)=>{
                return <View key={codigo}>
                    <Text style={{fontSize: 17}}>{nomeComTraco(val.nome)}____________{val.pontos}</Text>
                </View>
            });
        }

        return (

            <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{fontSize: 17}}>{this.state.msgCarregando}</Text>
            <View>{ns}</View>
            <Text/>
            <Button
            title="Finish"
            onPress={() => this.props.navigation.navigate('Home') }
            />
            <Text/><Text/>
            <Text>Créditos</Text>
            <Text>@ Equipe: Carlos Rocha -> carloscaed2011@gmail.com</Text>
            <Text>Wilton Pereira -> wiltonp47@gmail.com </Text>
            </View>


            );
        }




}

async function getRank(url) {
    try {
        //outra forma

        const response = await fetch(url);
        const responseJson = await response.json();
        return responseJson;
        alert("antes:"+responseJson[4].nome);


    } catch (error) {
        console.error(error); /* eslint-disable-line no-console */
        alert("talvez esteja sem conexão..")
       // return error;
    }
}

function envia(nome,pontos) {
    fetch(urlEnvia+'?nome='+nome+'&pontos='+pontos, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        query: JSON.stringify({
            //não estava conseguindo enviar por aqui, por isso montei na url
            //caso funcione está montado abaixo
            //nome:nome,
            //pontos:pontos,
        }),
    });
}

function montaUrl(nome,pontos) {
    return url+'?nome='+nome+'&pontos='+pontos;
}

function nomeComTraco(n){
    let i=n.length;
    for (i;i<12;i++){
        n=n+"_";
    }
    return n;
}

Page3.navigationOptions = {
    title: 'Ranking',
}

export default Page3;