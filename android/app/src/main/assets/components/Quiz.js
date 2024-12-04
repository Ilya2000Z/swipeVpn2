import { View, Button, Text } from 'react-native';
import {useState} from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { useFonts } from "expo-font";
import AnswerItem from './UI/AnswerItem.js'
import WorldSvg from '../svg/world.js'
import ContinueButton from './UI/ContinueButton'
import { ProgressBar } from 'react-native-progress';

const Quiz = () => {
  const [fontsLoaded] = useFonts({
    "Montserrat-700": require("../assets/fonts/Montserrat-Bold.ttf"),
  });
  	const items = [
                    { image: <WorldSvg/>,
                     name: 'Watching a video',
                     },
                     { image: <WorldSvg/>,
                       name: 'Social network',
                     },
                     { image: <WorldSvg/>,
                                          name: 'Watching a video',
                                          },
                                          { image: <WorldSvg color="red"/>,
                                            name: 'Social network',
                                          },
                    ];
                    const [progress, setProgress] = useState(0);

                    const increaseProgress = () => {
                      setProgress((prev) => Math.min(prev + 0.1, 1)); // Увеличиваем прогресс на 10%
                    };
	return(
		<View style={styles.container}>
			<View style={styles.wrapper}>
<ProgressBar progress={progress} width={300} />
    <Button title="Увеличить прогресс" onPress={increaseProgress}/>
				<Text style={styles.title}>What will you use {"\n"} a VPN for?</Text>
				            <FlatList
                                data={items}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => (
                                <View
                                 style = {styles.item}>
									<AnswerItem data={item}/>
								</View>
                                  )}
                            />
				<ContinueButton isActive={false}/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      position: 'relative',
      backgroundColor: '#000000',
    },
    wrapper: {
      paddingTop: 40,
      marginLeft: 19,
      marginRight: 19,
      height: '100%',
      paddingBottom: 100,
      justifyContent: 'spaceBetween',
    },
    item: {
        paddingBottom: 12,
        flex: 1,
    },
    title: {
        width: '100%',
        textAlign: 'center',
        fontFamily: 'Montserrat-600',
        color: '#fff',
        fontSize: 34,
        fontWeight: 700,
        lineHeight: 41.45,
        flex: 1
    },
  })
export default Quiz;
