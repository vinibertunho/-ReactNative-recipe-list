import React, { useState, useRef } from 'react';
import Fontisto from '@expo/vector-icons/Fontisto';
import { StatusBar } from 'expo-status-bar';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    TextInput,
    Animated,
    Image,
} from 'react-native';

const receitas = [
    {
        id: 1,
        nome: 'Lasanha à Bolonhesa',
        descricao: 'Clássica italiana com carne',
        tempo: '45 min',
        imagem: 'https://www.receitasnestle.com.br/sites/default/files/styles/recipe_detail_desktop_new/public/srh_recipes/16f8aff19e2a7db960e01ccab3901bfe.jpg',
    },
    {
        id: 2,
        nome: 'Strogonoff de Frango',
        descricao: 'Cremoso com champignon',
        tempo: '30 min',
        imagem: 'https://guiadacozinha.com.br/wp-content/uploads/2017/03/receitadeestrogonofedefrangorapido.jpg',
    },
    {
        id: 3,
        nome: 'Feijoada',
        descricao: 'Tradicional brasileira',
        tempo: '120 min',
        imagem: 'https://phygital-files.mercafacil.com/tartufo-bucket/uploads/produto/feijoada_300g_47d6de85-2421-43ae-aa13-54386f80f9bd.jpg',
    },
    {
        id: 4,
        nome: 'Pizza Margherita',
        descricao: 'Molho, queijo e manjericão',
        tempo: '40 min',
        imagem: 'https://safrescobaldistatic.blob.core.windows.net/media/2022/11/PIZZA-MARGHERITA.jpg',
    },
    {
        id: 5,
        nome: 'Hambúrguer Artesanal',
        descricao: 'Suculento com queijo',
        tempo: '20 min',
        imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZW_BeTU55RbHN3Jog8gqCY6vnHp2g3lIu-A&s',
    },
    {
        id: 6,
        nome: 'Sushi',
        descricao: 'Arroz e peixe fresco',
        tempo: '60 min',
        imagem: 'https://www.diadepeixe.com.br/extranet/thumbnail/crop/1200x630/Receita/shutterstock_2105735288_1746448515362.jpg',
    },
    {
        id: 7,
        nome: 'Panqueca de Carne',
        descricao: 'Recheada com molho',
        tempo: '35 min',
        imagem: 'https://guiadacozinha.com.br/wp-content/uploads/2018/08/Panqueca-de-carne-com-repolho.jpg',
    },
    {
        id: 8,
        nome: 'Macarrão Alfredo',
        descricao: 'Molho cremoso de queijo',
        tempo: '25 min',
        imagem: 'https://sabores-new.s3.amazonaws.com/public/2024/11/fettuccine-alfredo-sazon-r.jpg',
    },
    {
        id: 9,
        nome: 'Frango Assado',
        descricao: 'Temperado no forno',
        tempo: '60 min',
        imagem: 'https://i0.wp.com/espetinhodesucesso.com/wp-content/uploads/2025/04/Como-fazer-frango-assado-no-forno.jpg',
    },
    {
        id: 10,
        nome: 'Salada Caesar',
        descricao: 'Com frango e croutons',
        tempo: '20 min',
        imagem: 'https://receitadaboa.com.br/wp-content/uploads/2024/04/bottom_view_caesar_salad_oval_plate_dark_red_table-23000869-1.jpg',
    },
    {
        id: 11,
        nome: 'Risoto de Camarão',
        descricao: 'Cremoso e sofisticado',
        tempo: '35 min',
        imagem: 'https://www.unileverfoodsolutions.com.br/dam/global-ufs/mcos/SLA/calcmenu/recipes/BR-recipes/general/risoto-de-camar%C3%A3o/main-header.jpg',
    },
    {
        id: 12,
        nome: 'Tacos',
        descricao: 'Clássico mexicano',
        tempo: '25 min',
        imagem: 'https://truffle-assets.tastemadecontent.net/63d992d6-vid60842-tacos-de-chilli-l-thumb.jpg',
    },
    {
        id: 13,
        nome: 'Bolo de Chocolate',
        descricao: 'Fofinho e delicioso',
        tempo: '45 min',
        imagem: 'https://s2-receitas.glbimg.com/j9WXDFp05XljuvekMlU2WR2VKfQ=/1280x0/filters:format(jpeg)/https://i.s3.glbimg.com/v1/AUTH_1f540e0b94d8437dbbc39d567a1dee68/internal_photos/bs/2022/1/N/aQD0fhQs2qW7qlFw0bTA/bolo-de-chocolate-facil.jpg',
    },
    {
        id: 14,
        nome: 'Pão de Queijo',
        descricao: 'Clássico mineiro',
        tempo: '25 min',
        imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGdt_gMXmSj7Hbr14GwbBq9q4qf91JimRH2w&s',
    },
    {
        id: 15,
        nome: 'Batata Frita',
        descricao: 'Crocante e dourada',
        tempo: '20 min',
        imagem: 'https://www.tendaatacado.com.br/dicas/wp-content/uploads/2022/06/como-fazer-batata-frita-topo.jpg',
    },
];

export default function App() {
    const [dark, setDark] = useState(false);
    const [busca, setBusca] = useState('');
    const [favoritos, setFavoritos] = useState([]);

    const anim = useRef(new Animated.Value(1)).current;

    function favoritar(id) {
        Animated.spring(anim, {
            toValue: 1.5,
            friction: 3,
            tension: 100,
            useNativeDriver: true,
        }).start(() => {
            Animated.spring(anim, {
                toValue: 1,
                friction: 3,
                useNativeDriver: true,
            }).start();
        });

        if (favoritos.includes(id)) {
            setFavoritos(favoritos.filter((f) => f !== id));
        } else {
            setFavoritos([...favoritos, id]);
        }
    }

    const lista = receitas.filter((r) => r.nome.toLowerCase().includes(busca.toLowerCase()));

    return (
        <SafeAreaView style={[styles.container, dark ? styles.darkBg : styles.lightBg]}>
            <StatusBar style={dark ? 'light' : 'dark'} />

            <View style={styles.header}>
                <Text style={styles.titulo}>Receitas</Text>

                <TouchableOpacity style={styles.botao} onPress={() => setDark(!dark)}>
                    <Text style={styles.botaoTxt}>{dark ? '🌙' : '☀️'}</Text>
                </TouchableOpacity>
            </View>

            <TextInput
                placeholder="Buscar..."
                placeholderTextColor={dark ? '#aaa' : '#666'}
                value={busca}
                onChangeText={setBusca}
                style={[
                    styles.input,
                    dark ? styles.cardDark : styles.cardLight,
                    { color: dark ? '#fff' : '#000' },
                ]}
            />

            <ScrollView style={{ padding: 20 }}>
                {lista.map((item) => {
                    const fav = favoritos.includes(item.id);

                    return (
                        <View
                            key={item.id}
                            style={[styles.card, dark ? styles.cardDark : styles.cardLight]}>
                            <Image source={{ uri: item.imagem }} style={styles.img} />

                            <View style={{ flex: 1, marginLeft: 10 }}>
                                <Text style={{ color: dark ? '#fff' : '#000', fontWeight: 'bold' }}>
                                    {item.nome}
                                </Text>
                                <Text style={{ color: dark ? '#aaa' : '#666' }}>
                                    {item.descricao}
                                </Text>
                            </View>

                            <View style={{ alignItems: 'flex-end' }}>
                                <Text style={{ color: '#FF7A00' }}>{item.tempo}</Text>

                                <TouchableOpacity onPress={() => favoritar(item.id)}>
                                    <Animated.View
                                        style={{
                                            transform: [{ scale: anim }],
                                        }}>
                                        <AntDesign
                                            name={fav ? 'heat' : 'hearto'}
                                            size={24}
                                            color={fav ? 'red' : 'black'}
                                        />
                                    </Animated.View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    );
                })}

                {lista.length === 0 && (
                    <Text style={{ textAlign: 'center', color: dark ? '#fff' : '#000' }}>
                        Nada encontrado
                    </Text>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },

    lightBg: { backgroundColor: '#fff' },
    darkBg: { backgroundColor: '#121212' },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },

    titulo: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FF7A00',
    },

    botao: {
        backgroundColor: '#FF7A00',
        padding: 10,
        borderRadius: 10,
    },

    botaoTxt: {
        color: '#fff',
    },

    input: {
        marginHorizontal: 20,
        marginBottom: 10,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#FF7A00',
    },

    card: {
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    cardLight: {
        backgroundColor: '#FFF3E6',
    },

    cardDark: {
        backgroundColor: '#1E1E1E',
    },

    img: {
        width: 70,
        height: 70,
        borderRadius: 10,
    },
});
