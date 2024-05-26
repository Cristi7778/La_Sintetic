import { TouchableWithoutFeedback,TextInput, View ,Modal,Text,StyleSheet, Button} from "react-native";
import {React,useMemo,  useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import {Dimensions} from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import ip from "../global/ip";

export default function RecommandationModal({setRecommandationModal,recommandationModal,distance}){
//{"distance": 6.9,"covered": false,"length": 42, "width": 21 }
const [width, setWidth] = useState('0');
const [length, setLength] = useState('0');
const [covered, setCovered] = useState('0');
const [predicted,setPredicted]=useState(false);
const [price,setPrice]=useState(0);
const radioButtons = useMemo(() => ([
    {
        id: '1', 
        label: 'The pitch is covered',
        value: 1,
    },
    {
        id: '0',
        label: 'The pitch is not covered',
        value: 0,
    }
]), []);
    return(
        <View>
            <Modal  transparent={true} visible={recommandationModal}>
                
                <View style={styles.modal}>
                <TouchableWithoutFeedback onPress={()=>{setRecommandationModal(false)}}>
                        <AntDesign name="closecircle" size={24} color="red" />
                </TouchableWithoutFeedback>
                <Text>
                    Enter the details of the pitch to get a recommandation
                </Text>
                <TextInput name="Width"  label='Enter the pitch width...' placeholder="Pitch width" onChangeText={(value)=>setWidth(value)}/>
                <TextInput name="Length" label='Enter the pitch length...' placeholder="Pitch length" onChangeText={(value)=>setLength(value)}/>
                    
                    <Text>
                         Distanta fata de centrul orasului:{distance}
                    </Text>
                <RadioGroup 
                    radioButtons={radioButtons} 
                    onPress={(value)=>{setCovered(value)}}
                    selectedId={covered}
                    
                />
                <Button color="blue" title="Get recommandation" onPress={async ()=>{
                    const body={"name":'name','distance':distance, 'covered':covered,'length':length,'width':width};
                    try{
                        const resp=await fetch(`${ip}:8000/api/v1/inference`, {method: "POST",body: JSON.stringify(body),headers: 
                        {"Content-Type": "application/json","accept": "application/json"}});
                        const text = await resp.text();
                        const jsonObject = JSON.parse(text);
                        setPrice(jsonObject.prediction);
                        setPredicted(true);
                    }
                    catch(error){
                        console.log(error);
                    }
                 }}/>
                 { (predicted) && 
                <Text>The recommanded price for this pitch is {price}</Text> 
                }
                </View>
            </Modal>
        </View>
    )
}
const styles=StyleSheet.create({
    modal:{
        height:Dimensions.get('window').height,
        width:Dimensions.get('window').width,
        backgroundColor:'#87d5e1',
    }
});
