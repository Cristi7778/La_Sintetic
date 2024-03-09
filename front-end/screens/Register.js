import { SafeAreaView,Text, TextInput } from "react-native";
import RadioGroup from 'react-native-radio-buttons-group';
import { useMemo,useState} from "react";



export default function Register(){
    const radioButtons = useMemo(() => ([
        {
            id: '1', 
            label: 'I want to look for pitches to book',
            value: 'user'
        },
        {
            id: '2',
            label: 'I want to register my pitches for rental',
            value: 'manager'
        }
    ]), []);
    const [selectedId, setSelectedId] = useState();
    return (
        <SafeAreaView>
            <TextInput name="Username" placeholder="Your username"/>
            <TextInput name="Email" placeholder="Your email"/>
            <TextInput name="Phone number" placeholder="Your phone number"/>
            <TextInput name="Password" placeholder="Your password"/>
            <TextInput name="Confirm password" placeholder="Confirm your password"/>
            <RadioGroup 
            radioButtons={radioButtons} 
            onPress={setSelectedId}
            selectedId={selectedId}
            />
        </SafeAreaView>
    );
};